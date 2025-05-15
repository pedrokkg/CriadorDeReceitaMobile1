import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { getDatabase, ref, set, get } from "firebase/database";
import { app } from "./firebase"; // inicializa seu Firebase

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Lista de e-mails que já são admins automaticamente
const EMAILS_ADMIN = ["guigoambus@gmail.com"];

// 🔐 LOGIN COM GOOGLE
export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  await garantirCadastro(user);
};

// 🔐 LOGIN COM EMAIL E SENHA
export const loginWithEmail = async (email, password) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  await garantirCadastro(result.user);
};

// 🔐 REGISTRO COM EMAIL E SENHA
export const registerWithEmail = async (email, password) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  await garantirCadastro(result.user, password);
};

// 🔐 LOGOUT
export const logout = () => signOut(auth);

// 🔄 ESCUTAR MUDANÇAS DE LOGIN
export const onAuthStateChanged = (callback) => {
  auth.onAuthStateChanged(callback);
};

// ✅ GARANTIR QUE USUÁRIO ESTÁ REGISTRADO NO BANCO
async function garantirCadastro(user, senha = "google") {
  const db = getDatabase();
  const refUser = ref(db, "usuarios/" + user.uid);

  const snapshot = await get(refUser);
  if (!snapshot.exists()) {
    const email = user.email || "";
    const nome = user.displayName || email.split("@")[0];
    const perfil = EMAILS_ADMIN.includes(email) ? "admin" : "normal";

    const dados = {
      uid: user.uid,
      nome: nome,
      email: email,
      perfil: perfil,
      authProvider: senha === "google" ? "google" : "email",
    };
    await set(refUser, dados);
  }
}

export { auth, EMAILS_ADMIN };
