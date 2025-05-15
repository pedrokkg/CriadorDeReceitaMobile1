import React, { useState, useEffect } from "react";
import { buscarReceitas, atualizarReceita, excluirReceita } from "../services/receita";
import { auth } from "../services/firebase";
import PerfilUsuario from "../components/PerfilUsuario";

export function ReceitaListUsuario() {
  const [receitas, setReceitas] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [receitaEditando, setReceitaEditando] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const todas = await buscarReceitas();
      const user = auth.currentUser;
      const minhas = todas.filter((r) => r.uid === user.uid);
      setReceitas(minhas);
    };
    fetchData();
  }, []);

  const handleEditar = (receita) => {
    setEditandoId(receita.idReceita);
    setReceitaEditando({ ...receita });
  };

  const handleCancelar = () => {
    setEditandoId(null);
    setReceitaEditando(null);
  };

  const handleSalvar = async () => {
    const novosItens = receitaEditando.ingredientes.map(ing => ({
      ingrediente: {
        nome: ing.nome,
        quantidade: ing.quantidade
      }
    }));

    const receitaAtualizada = {
      ...receitaEditando,
      itens: novosItens
    };

    await atualizarReceita(receitaAtualizada.idReceita, receitaAtualizada);
    setEditandoId(null);
    setReceitaEditando(null);

    const todas = await buscarReceitas();
    const minhas = todas.filter((r) => r.uid === auth.currentUser.uid);
    setReceitas(minhas);
  };

  const handleExcluir = async (idReceita) => {
    if (confirm("Tem certeza que deseja excluir esta receita?")) {
      await excluirReceita(idReceita);
      setReceitas(receitas.filter((r) => r.idReceita !== idReceita));
    }
  };

  const handleChangeIngrediente = (index, field, value) => {
    const novosIngredientes = [...receitaEditando.ingredientes];
    novosIngredientes[index][field] = value;
    setReceitaEditando({ ...receitaEditando, ingredientes: novosIngredientes });
  };

  const handleChangePasso = (index, field, value) => {
    const novosPassos = [...receitaEditando.passos];
    novosPassos[index][field] = value;
    setReceitaEditando({ ...receitaEditando, passos: novosPassos });
  };

  const handleRemoverIngrediente = (index) => {
    const novos = [...receitaEditando.ingredientes];
    novos.splice(index, 1);
    setReceitaEditando({ ...receitaEditando, ingredientes: novos });
  };

  const handleRemoverPasso = (index) => {
    const novos = [...receitaEditando.passos];
    novos.splice(index, 1);
    setReceitaEditando({ ...receitaEditando, passos: novos });
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 space-y-4">
      <PerfilUsuario />
      <h2 className="text-xl font-bold">Minhas Receitas</h2>
      {receitas.map((receita) =>
        editandoId === receita.idReceita ? (
          <div key={receita.idReceita} className="p-4 border rounded shadow space-y-2 bg-yellow-50">
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={receitaEditando.nomeReceita}
              onChange={(e) =>
                setReceitaEditando({ ...receitaEditando, nomeReceita: e.target.value })
              }
            />

            <div>
              <h4 className="font-semibold">Ingredientes:</h4>
              {receitaEditando.ingredientes.map((ing, index) => (
                <div key={index} className="flex space-x-2 mb-1">
                  <input
                    type="text"
                    value={ing.nome}
                    onChange={(e) => handleChangeIngrediente(index, "nome", e.target.value)}
                    className="w-1/2 p-1 border rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={ing.quantidade}
                    onChange={(e) => handleChangeIngrediente(index, "quantidade", e.target.value)}
                    className="w-1/2 p-1 border rounded cursor-pointer"
                  />
                  <button
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleRemoverIngrediente(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div>
              <h4 className="font-semibold">Passos:</h4>
              {receitaEditando.passos.map((p, index) => (
                <div key={index} className="flex space-x-2 mb-1">
                  <input
                    type="number"
                    className="w-12 p-1 border rounded"
                    value={p.numero}
                    onChange={(e) => handleChangePasso(index, "numero", e.target.value)}
                  />
                  <input
                    type="text"
                    className="flex-1 p-1 border rounded"
                    value={p.acao}
                    onChange={(e) => handleChangePasso(index, "acao", e.target.value)}
                  />
                  <button
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleRemoverPasso(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="flex space-x-2">
              <button
                onClick={handleSalvar}
                className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer hover:bg-green-700"
              >
                Salvar
              </button>
              <button
                onClick={handleCancelar}
                className="px-4 py-2 bg-gray-400 text-white rounded cursor-pointer hover:bg-gray-500"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <div key={receita.idReceita} className="p-4 border rounded shadow bg-white">
            <h3 className="font-bold">{receita.nomeReceita}</h3>
            <p className="text-sm text-gray-600">
              Ingredientes: {receita.ingredientes?.map((i) => i.nome).join(", ")}
            </p>
            <div className="flex space-x-2 mt-2">
              <button
                className="bg-yellow-500 text-white px-4 py-1 rounded cursor-pointer hover:bg-yellow-600"
                onClick={() => handleEditar(receita)}
              >
                Editar
              </button>
              <button
                className="bg-red-600 text-white px-4 py-1 rounded cursor-pointer hover:bg-red-700"
                onClick={() => handleExcluir(receita.idReceita)}
              >
                Excluir
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}
