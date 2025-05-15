import { ref, set, get } from "firebase/database";
import { database } from "../firebase";

// Salva dados de usuário após cadastro/login
export async function salvarUsuario(uid, dadosUsuario) {
  await set(ref(database, `usuarios/${uid}`), dadosUsuario);
}

// Busca dados de um usuário específico
export async function buscarUsuario(uid) {
  const snapshot = await get(ref(database, `usuarios/${uid}`));
  return snapshot.exists() ? snapshot.val() : null;
}

