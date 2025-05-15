import React, { useState } from "react";
import {
  loginWithGoogle,
  loginWithEmail,
  registerWithEmail,
} from "../services/auth";

export function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [modoCadastro, setModoCadastro] = useState(false);
  const [erro, setErro] = useState("");

  const validarEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validarSenhaForte = (senha) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(senha);

  const handleEmailLogin = async () => {
    setErro("");

    if (!validarEmail(email)) {
      setErro("Email inválido. Tente algo como exemplo@email.com");
      return;
    }

    if (modoCadastro) {
      if (!validarSenhaForte(senha)) {
        setErro(
          "Senha fraca. Use ao menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos."
        );
        return;
      }
      if (senha !== confirmarSenha) {
        setErro("As senhas não coincidem.");
        return;
      }
    }

    try {
      if (modoCadastro) {
        await registerWithEmail(email, senha);
      } else {
        await loginWithEmail(email, senha);
      }
      onLogin();
    } catch (err) {
      setErro("Erro: " + err.message);
    }
  };

  const handleGoogleLogin = async () => {
    setErro("");
    try {
      await loginWithGoogle();
      onLogin();
    } catch (err) {
      setErro("Erro no login com Google: " + err.message);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <h2 className="text-xl font-bold">
        {modoCadastro ? "Cadastro" : "Login"}
      </h2>
      {erro && <p className="text-red-600">{erro}</p>}
      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-64 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        className="border p-2 w-64 rounded"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      {modoCadastro && (
        <input
          type="password"
          placeholder="Confirmar senha"
          className="border p-2 w-64 rounded"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
        />
      )}
      <button
        onClick={handleEmailLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
      >
        {modoCadastro ? "Cadastrar" : "Entrar"}
      </button>
      <button
        onClick={handleGoogleLogin}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
      >
        Entrar com Google
      </button>
      <p
        onClick={() => {
          setModoCadastro(!modoCadastro);
          setErro("");
        }}
        className="text-sm text-blue-500 cursor-pointer"
      >
        {modoCadastro
          ? "Já tem uma conta? Faça login"
          : "Não tem conta? Cadastre-se"}
      </p>
    </div>
  );
}
