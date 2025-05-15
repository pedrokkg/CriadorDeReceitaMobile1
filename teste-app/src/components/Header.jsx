import React from "react";
import { auth } from "../services/firebase";

export function Header({ user, abaAtual, setAbaAtual }) {
  const handleLogout = () => {
    auth.signOut();
    window.location.reload();
  };

  return (
    <header className="bg-white shadow-md px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
      {/* Título */}
      <h1 className="text-2xl font-bold text-green-700 mb-3 sm:mb-0">RECEITAS 🍲</h1>

      {/* Navegação */}
      <nav className="flex flex-wrap gap-3 items-center">
        <button
          onClick={() => setAbaAtual("publicas")}
          className={`px-4 py-2 rounded-full transition ${
            abaAtual === "publicas"
              ? "bg-blue-600 text-white"
              : "bg-blue-100 hover:bg-blue-200 text-blue-700 cursor-pointer"
          }`}
        >
          Home
        </button>
        <button
          onClick={() => setAbaAtual("minhas")}
          className={`px-4 py-2 rounded-full transition ${
            abaAtual === "minhas"
              ? "bg-blue-600 text-white"
              : "bg-blue-100 hover:bg-blue-200 text-blue-700 cursor-pointer"
          }`}
        >
          Minhas Receitas
        </button>
        <button
          onClick={() => setAbaAtual("criar")}
          className={`px-4 py-2 rounded-full transition ${
            abaAtual === "criar"
              ? "bg-green-600 text-white"
              : "bg-green-100 hover:bg-green-200 text-green-700 cursor-pointer"
          }`}
        >
          Criar Receita
        </button>
      </nav>

      {/* Perfil e sair */}
      <div className="flex items-center gap-4 mt-4 sm:mt-0">
        <img
          src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || "U"}`}
          alt="Foto de perfil"
          className="w-10 h-10 rounded-full border"
        />
        <span className="font-medium text-gray-800">{user?.displayName}</span>
        <button
          onClick={handleLogout}
          className="px-3 py-1 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition cursor-pointer"
        >
          Sair
        </button>
      </div>
    </header>
  );
}
