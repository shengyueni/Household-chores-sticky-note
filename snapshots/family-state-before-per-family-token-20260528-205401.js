const { createClient } = require("@supabase/supabase-js");

const DEFAULT_SPACE_ID = process.env.DEFAULT_FAMILY_SPACE_ID || "default-home";
const TOKEN_HEADER = "x-family-space-token";

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

function unauthorized(message = "Unauthorized family space token.") {
  const error = new Error(message);
  error.statusCode = 401;
  return error;
}

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}

function safeJson(value, fallback) {
  if (value === null || value === undefined) return fallback;
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  }
  return value;
}

function readBody(req) {
  if (req.body && typeof req.body === "object") {
    return Promise.resolve(req.body);
  }

  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

function toIsoDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function completedAtFromTask(note) {
  if (note.completedAtMs) {
    const date = new Date(Number(note.completedAtMs));
    if (!Number.isNaN(date.getTime())) return date.toISOString();
  }
  return toIsoDate(note.completedAt);
}

function familySpaceFromRow(row, members) {
  const payload = safeJson(row.payload, {});
  return {
    ...payload,
    id: row.id,
    name: row.name,
    slogan: row.slogan || "",
    currentMemberId: row.current_member_id || "",
    protocolRoute: row.protocol_route || [],
    wishes: safeJson(row.wishes, []),
    members,
    version: row.version,
    cloudRevision: row.cloud_revision,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function memberFromRow(row) {
  const payload = safeJson(row.payload, {});
  return {
    ...payload,
    id: row.id,
    name: row.name,
    relation: row.relation || "",
    relationship: payload.relationship || row.relation || "",
    role: row.role || row.relation || "",
    avatarId: row.avatar_id || payload.avatarId || payload.avatar || "",
    avatar: row.avatar_id || payload.avatar || payload.avatarId || "",
    color: row.color || payload.color || "",
    wish: row.wish || payload.wish || "",
    sleepGuardProtected: !!row.sleep_guard_protected,
    sleep: payload.sleep === undefined ? !!row.sleep_guard_protected : !!payload.sleep,
    initialScore: row.initial_score || 0,
    sortOrder: row.sort_order || 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function noteFromRow(row) {
  const payload = safeJson(row.payload, {});
  return {
    ...payload,
    id: row.id,
    title: row.title,
    content: row.content || "",
    category: row.category || "",
    type: row.type || row.category || "",
    source: row.source || "",
    eta: row.eta || "",
    status: row.status || "pending",
    createdById: row.created_by_member_id || "",
    noticeBy: row.notice_by_member_id || row.created_by_member_id || "",
    assigneeId: row.assignee_member_id || "",
    claimedById: row.claimed_by_member_id || "",
    completedById: row.completed_by_member_id || "",
    owner: row.owner_member_id || row.assignee_member_id || "",
    route: row.route || [],
    morningQueue: !!row.morning_queue,
    memory: row.memory || "",
    xgrids: row.xgrids || "",
    proofName: row.proof_name || "",
    proofNote: row.proof_note || "",
    completedAt: payload.completedAt || row.completed_at || "",
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function memberToRow(member, familySpaceId, index) {
  return {
    id: member.id,
    family_space_id: familySpaceId,
    name: member.name || "家人",
    relation: member.relation || member.relationship || member.role || null,
    role: member.role || member.relation || member.relationship || null,
    avatar_id: member.avatarId || member.avatar || null,
    color: member.color || null,
    wish: member.wish || null,
    sleep_guard_protected: !!(member.sleepGuardProtected || member.sleep),
    initial_score: Number.isFinite(Number(member.initialScore))
      ? Number(member.initialScore)
      : 0,
    sort_order: Number.isFinite(Number(member.sortOrder))
      ? Number(member.sortOrder)
      : index,
    payload: member,
    deleted_at: null
  };
}

function existingMemberId(id, memberIds) {
  return id && memberIds.has(id) ? id : null;
}

function isMissingColumnError(error) {
  return error && (
    error.code === "42703" ||
    /column .* does not exist/i.test(error.message || "") ||
    /Could not find .* column/i.test(error.message || "")
  );
}

function tokenFromRequest(req) {
  const value = req.headers[TOKEN_HEADER];
  return Array.isArray(value) ? (value[0] || "").trim() : String(value || "").trim();
}

async function findFamilySpaceByToken(supabase, token) {
  if (!token) return null;
  for (const column of ["cloud_token", "access_token"]) {
    const { data, error } = await supabase
      .from("family_spaces")
      .select("*")
      .eq(column, token)
      .maybeSingle();

    if (error) {
      if (isMissingColumnError(error)) continue;
      throw error;
    }

    if (data) return data;
  }
  return null;
}

async function resolveFamilySpaceTarget(supabase, req, bodyFamilySpace = null) {
  const token = tokenFromRequest(req);
  const expected = process.env.FAMILY_SPACE_TOKEN;
  const tokenSpace = await findFamilySpaceByToken(supabase, token);

  if (tokenSpace) return { id: tokenSpace.id, token, existingSpace: tokenSpace };
  if (expected) {
    if (token === expected) return { id: DEFAULT_SPACE_ID, token, existingSpace: null };
    if (req.method === "PUT" && token && bodyFamilySpace && bodyFamilySpace.id) {
      return { id: bodyFamilySpace.id, token, existingSpace: null };
    }
    throw unauthorized();
  }
  if (req.method === "GET" && token) throw unauthorized();

  const fallbackId = bodyFamilySpace && bodyFamilySpace.id ? bodyFamilySpace.id : DEFAULT_SPACE_ID;
  return { id: fallbackId, token, existingSpace: null };
}

function noteToRow(note, familySpaceId, memberIds) {
  const createdById = existingMemberId(note.createdById || note.noticeBy, memberIds);
  const noticeById = existingMemberId(note.noticeBy || note.createdById, memberIds);
  const assigneeId = existingMemberId(note.assigneeId || note.owner, memberIds);
  const claimedById = existingMemberId(note.claimedById, memberIds);
  const completedById = existingMemberId(note.completedById, memberIds);
  const ownerId = existingMemberId(note.owner || note.assigneeId || note.claimedById, memberIds);

  return {
    id: note.id,
    family_space_id: familySpaceId,
    title: note.title || "未命名便利贴",
    content: note.content || null,
    category: note.category || note.type || null,
    type: note.type || note.category || null,
    source: note.source || null,
    eta: note.eta || null,
    status: note.status || "pending",
    created_by_member_id: createdById,
    notice_by_member_id: noticeById,
    assignee_member_id: assigneeId,
    claimed_by_member_id: claimedById,
    completed_by_member_id: completedById,
    owner_member_id: ownerId,
    route: Array.isArray(note.route) ? note.route : [],
    morning_queue: !!note.morningQueue,
    memory: note.memory || null,
    xgrids: note.xgrids || null,
    proof_name: note.proofName || null,
    proof_note: note.proofNote || null,
    completed_at: completedAtFromTask(note),
    payload: note,
    deleted_at: null
  };
}

async function deleteRowsNotInPayload(supabase, tableName, familySpaceId, keepIds) {
  const keep = new Set(keepIds.filter(Boolean));
  const { data: existingRows, error: selectError } = await supabase
    .from(tableName)
    .select("id")
    .eq("family_space_id", familySpaceId);

  if (selectError) throw selectError;

  const idsToDelete = (existingRows || [])
    .map((row) => row.id)
    .filter((id) => id && !keep.has(id));

  if (!idsToDelete.length) return;

  const { error: deleteError } = await supabase
    .from(tableName)
    .delete()
    .eq("family_space_id", familySpaceId)
    .in("id", idsToDelete);

  if (deleteError) throw deleteError;
}

async function upsertFamilySpaceRow(supabase, spaceRow, token) {
  const variants = token
    ? [
        { ...spaceRow, cloud_token: token },
        { ...spaceRow, access_token: token },
        spaceRow
      ]
    : [spaceRow];

  let lastError = null;
  for (const row of variants) {
    const { error } = await supabase
      .from("family_spaces")
      .upsert(row, { onConflict: "id" });

    if (!error) return;
    lastError = error;
    if (!isMissingColumnError(error)) throw error;
  }

  if (lastError) throw lastError;
}

async function handleGet(req, res) {
  const supabase = getSupabase();
  const target = await resolveFamilySpaceTarget(supabase, req);

  const { data: space, error: spaceError } = target.existingSpace
    ? { data: target.existingSpace, error: null }
    : await supabase
      .from("family_spaces")
      .select("*")
      .eq("id", target.id)
      .maybeSingle();

  if (spaceError) throw spaceError;
  if (!space) {
    return sendJson(res, 200, {
      familySpace: null,
      stickyNotes: [],
      cloudRevision: 0,
      serverUpdatedAt: null
    });
  }

  const [{ data: members, error: membersError }, { data: notes, error: notesError }] =
    await Promise.all([
      supabase
        .from("family_members")
        .select("*")
        .eq("family_space_id", target.id)
        .is("deleted_at", null)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true }),
      supabase
        .from("sticky_notes")
        .select("*")
        .eq("family_space_id", target.id)
        .is("deleted_at", null)
        .order("created_at", { ascending: true })
    ]);

  if (membersError) throw membersError;
  if (notesError) throw notesError;

  const frontMembers = (members || []).map(memberFromRow);

  return sendJson(res, 200, {
    familySpace: familySpaceFromRow(space, frontMembers),
    stickyNotes: (notes || []).map(noteFromRow),
    cloudRevision: space.cloud_revision || 0,
    serverUpdatedAt: space.updated_at || null
  });
}

async function handlePut(req, res) {
  const body = await readBody(req);
  const familySpace = body && body.familySpace;
  const rawStickyNotes = Array.isArray(body && body.stickyNotes)
    ? body.stickyNotes
    : Array.isArray(body && body.sticky_notes)
      ? body.sticky_notes
      : [];

  if (!familySpace || typeof familySpace !== "object") {
    return sendJson(res, 400, { ok: false, error: "Invalid request body: familySpace is required." });
  }

  if (familySpace.isDemo === true) {
    return sendJson(res, 200, { ok: true, skipped: "demo-family" });
  }

  const supabase = getSupabase();
  const target = await resolveFamilySpaceTarget(supabase, req, familySpace);
  const now = new Date().toISOString();

  const { data: current, error: currentError } = await supabase
    .from("family_spaces")
    .select("cloud_revision")
    .eq("id", target.id)
    .maybeSingle();

  if (currentError) throw currentError;

  const nextRevision = Number(current && current.cloud_revision ? current.cloud_revision : 0) + 1;
  const members = (Array.isArray(familySpace.members) ? familySpace.members : [])
    .filter((member) => member && member.id);
  const stickyNotes = rawStickyNotes.filter((note) => note && note.id);
  const memberIds = new Set(members.map((member) => member && member.id).filter(Boolean));

  const spaceRow = {
    id: target.id,
    name: familySpace.name || "我们的家庭空间",
    slogan: familySpace.slogan || null,
    current_member_id: null,
    protocol_route: Array.isArray(familySpace.protocolRoute) ? familySpace.protocolRoute : [],
    wishes: Array.isArray(familySpace.wishes) ? familySpace.wishes : [],
    version: Number.isFinite(Number(familySpace.version)) ? Number(familySpace.version) : 1,
    cloud_revision: nextRevision,
    payload: familySpace,
    updated_at: now
  };

  await upsertFamilySpaceRow(supabase, spaceRow, target.token);

  if (members.length) {
    const { error: memberUpsertError } = await supabase
      .from("family_members")
      .upsert(members.map((member, index) => memberToRow(member, target.id, index)), {
        onConflict: "id"
      });

    if (memberUpsertError) throw memberUpsertError;
  }

  const currentMemberId = familySpace.currentMemberId || familySpace.current_member_id || null;
  if (currentMemberId && memberIds.has(currentMemberId)) {
    const { error: currentMemberError } = await supabase
      .from("family_spaces")
      .update({ current_member_id: currentMemberId })
      .eq("id", target.id);

    if (currentMemberError) throw currentMemberError;
  }

  if (stickyNotes.length) {
    const { error: notesUpsertError } = await supabase
      .from("sticky_notes")
      .upsert(stickyNotes.map((note) => noteToRow(note, target.id, memberIds)), {
        onConflict: "id"
      });

    if (notesUpsertError) throw notesUpsertError;
  }

  await deleteRowsNotInPayload(
    supabase,
    "sticky_notes",
    target.id,
    stickyNotes.map((note) => note.id)
  );

  await deleteRowsNotInPayload(
    supabase,
    "family_members",
    target.id,
    members.map((member) => member.id)
  );

  const { data: saved, error: savedError } = await supabase
    .from("family_spaces")
    .select("cloud_revision, updated_at")
    .eq("id", target.id)
    .single();

  if (savedError) throw savedError;

  return sendJson(res, 200, {
    ok: true,
    cloudRevision: saved.cloud_revision,
    serverUpdatedAt: saved.updated_at
  });
}

module.exports = async function familyState(req, res) {
  try {
    if (req.method === "GET") {
      return await handleGet(req, res);
    }

    if (req.method === "PUT") {
      return await handlePut(req, res);
    }

    res.setHeader("Allow", "GET, PUT");
    return sendJson(res, 405, { ok: false, error: "Method not allowed." });
  } catch (error) {
    const status = error && error.statusCode
      ? error.statusCode
      : req.method === "PUT" && error instanceof SyntaxError
        ? 400
        : 500;
    return sendJson(res, status, {
      ok: false,
      error: error && error.message ? error.message : "Unexpected server error."
    });
  }
};
