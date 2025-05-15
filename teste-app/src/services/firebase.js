import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDRLTGe_qW_MNfNqau1ocVPNLXlG2ywXD0",
  authDomain: "prjalessandro-lasalle-fb.firebaseapp.com",
  databaseURL: "https://prjalessandro-lasalle-fb-default-rtdb.firebaseio.com",
  projectId: "prjalessandro-lasalle-fb",
  storageBucket: "prjalessandro-lasalle-fb.firebasestorage.app",
  messagingSenderId: "140593484232",
  appId: "1:140593484232:web:13e1784391dd6f048770fd",
  measurementId: "G-6RNHPLH204"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export { app };