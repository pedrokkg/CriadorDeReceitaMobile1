import { getDatabase, ref, set, get } from "firebase/database";
import { app } from "../firebase/firebase";

const db = getDatabase(app);

export async function getUser(uid) {
  const refUser = ref(db, "usuarios/" + uid);
  const snap = await get(refUser);
  return snap.exists() ? snap.val() : null;
}

export async function setUser(uid, dados) {
  const refUser = ref(db, "usuarios/" + uid);
  await set(refUser, dados);
}