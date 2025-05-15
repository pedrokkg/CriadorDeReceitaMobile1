import React from "react";
import { auth } from "../services/firebase";

export default function PerfilUsuario() {
  const user = auth.currentUser;

  if (!user) return null;

  const foto = user?.photoURL && user.photoURL !== "" ? user.photoURL : "https://via.placeholder.com/150";


  return (
    <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded shadow mb-6">
      <img
        src={foto}
        alt="Foto de perfil"
        className="w-12 h-12 rounded-full border"
      />
      <div>
        <p className="text-lg font-semibold">Receitas de {user.displayName || "usuário"}!</p>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
    </div>
  );
}
