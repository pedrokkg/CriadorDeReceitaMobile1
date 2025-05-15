import { getDatabase, ref, get } from "firebase/database";
import { onAuthStateChanged } from "../firebase/auth"; // ajuste o caminho se necessário

let usuarioLogado = null;

onAuthStateChanged(async (user) => {
  if (user) {
    const db = getDatabase();
    const refUser = ref(db, "usuarios/" + user.uid);
    const snapshot = await get(refUser);

    if (snapshot.exists()) {
      usuarioLogado = snapshot.val();
    } else {
      usuarioLogado = null;
    }
  } else {
    usuarioLogado = null;
  }
});

export function getUserLogado() {
  return usuarioLogado;
}
