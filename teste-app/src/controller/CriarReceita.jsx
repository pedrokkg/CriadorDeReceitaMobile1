import React, { useState } from "react";
import { criarReceita } from "../services/receita";
import { auth } from "../services/firebase";
import { TrashIcon } from "@heroicons/react/24/outline";

export function CriarReceita() {
  const [nomeReceita, setNomeReceita] = useState("");
  const [ingredientes, setIngredientes] = useState([{ nome: "", quantidade: "" }]);
  const [passos, setPassos] = useState([{ numero: 1, acao: "" }]);
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Login inválido.");

      const idReceita = Date.now().toString();

      const receita = {
        nomeReceita,
        idReceita,
        user: user.displayName || user.email,
        uid: user.uid,
        ingredientes,
        passos,
        itens: ingredientes.map((ingrediente) => ({
          quantidade: ingrediente.quantidade,
          ingrediente: { nome: ingrediente.nome },
        })),
      };

      await criarReceita(receita);

      setNomeReceita("");
      setIngredientes([{ nome: "", quantidade: "" }]);
      setPassos([{ numero: 1, acao: "" }]);
      setMensagemSucesso("Receita criada com sucesso!");

      setTimeout(() => {
        setMensagemSucesso("");
      }, 3000); // some em 3 segundos
    } catch (err) {
      alert("Erro: " + err.message);
    }
  };

  const handleIngredienteChange = (index, field, value) => {
    const newIngredientes = [...ingredientes];
    newIngredientes[index][field] = value;
    setIngredientes(newIngredientes);
  };

  const handlePassoChange = (index, field, value) => {
    const newPassos = [...passos];
    newPassos[index][field] = value;
    setPassos(newPassos);
  };

  const addIngrediente = () => {
    setIngredientes([...ingredientes, { nome: "", quantidade: "" }]);
  };

  const addPasso = () => {
    setPassos([...passos, { numero: passos.length + 1, acao: "" }]);
  };

  const removerIngrediente = (index) => {
    const novos = ingredientes.filter((_, i) => i !== index);
    setIngredientes(novos);
  };

  const removerPasso = (index) => {
    const novos = passos.filter((_, i) => i !== index).map((p, i) => ({
      ...p,
      numero: i + 1, // reordenar os números
    }));
    setPassos(novos);
  };

  const limparFormulario = () => {
    setNomeReceita("");
    setIngredientes([{ nome: "", quantidade: "" }]);
    setPassos([{ numero: 1, acao: "" }]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-8">
      {mensagemSucesso && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-xl max-w-md mx-auto mt-4 text-center">
          {mensagemSucesso}
        </div>
      )}

      <h2 className="text-xl font-bold">Criar Receita</h2>

      {/* Nome da receita */}
      <input
        type="text"
        placeholder="Nome da receita"
        className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        value={nomeReceita}
        onChange={(e) => setNomeReceita(e.target.value)}
        required
      />

      {/* Ingredientes */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Ingredientes</h3>
        {ingredientes.map((ingrediente, index) => (
          <div key={index} className="flex space-x-2 items-center">
            <input
              type="text"
              placeholder="Nome do ingrediente"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={ingrediente.nome}
              onChange={(e) => handleIngredienteChange(index, "nome", e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Quantidade"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={ingrediente.quantidade}
              onChange={(e) => handleIngredienteChange(index, "quantidade", e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => removerIngrediente(index)}
              className="text-red-500 hover:text-red-700 p-1"
            >
              <TrashIcon className="h-5 w-5 cursor-pointer" />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addIngrediente}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2 cursor-pointer"
        >
          Adicionar Ingrediente
        </button>
      </div>

      {/* Passos */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Passos</h3>
        {passos.map((passo, index) => (
          <div key={index} className="flex space-x-2 items-center">
            <input
              type="number"
              className="w-12 p-2 py-2 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={passo.numero}
              onChange={(e) => handlePassoChange(index, "numero", e.target.value)}
              disabled
            />
            <input
              type="text"
              placeholder="Ação"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={passo.acao}
              onChange={(e) => handlePassoChange(index, "acao", e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => removerPasso(index)}
              className="text-red-500 hover:text-red-700 p-1"
            >
              <TrashIcon className="h-5 w-5 cursor-pointer" />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addPasso}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2 hover:cursor-pointer"
        >
          Adicionar Passo
        </button>
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 hover:cursor-pointer"
      >
        Criar Receita
      </button>

      <button
        type="button"
        onClick={limparFormulario}
        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 hover:cursor-pointer ml-2"
      >
        Limpar
      </button>
    </form>
  );
}
