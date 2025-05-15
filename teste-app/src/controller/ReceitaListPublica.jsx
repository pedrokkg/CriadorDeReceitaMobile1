import React, { useState, useEffect } from "react";
import { buscarReceitas } from "../services/receita";

export function ReceitaListPublica({ onSelectReceita }) {
  const [receitas, setReceitas] = useState([]);
  const [filtro, setFiltro] = useState(""); // Apenas um filtro para o nome e ingredientes

  useEffect(() => {
    const fetchData = async () => {
      const todas = await buscarReceitas();
      setReceitas(todas);
    };
    fetchData();
  }, []);

  const receitasFiltradas = receitas.filter((receita) => {
    // Busca pelo nome da receita
    const nome = receita?.nomeReceita?.toLowerCase() || "";
    const nomeMatch = nome.includes(filtro.toLowerCase()); // Busca por nome da receita

    // Busca pelos ingredientes
    const ingredientesNomes =
      receita.ingredientes?.map((ing) => ing.nome.toLowerCase()) || [];

    // Busca por nome da receita ou por ingredientes
    const ingredientesMatch =
      filtro.length === 0 ||
      ingredientesNomes.some((nomeIngrediente) =>
        nomeIngrediente.includes(filtro.toLowerCase()) // Busca parcial no nome do ingrediente
      );

    return nomeMatch || ingredientesMatch; // Filtra por nome ou ingrediente
  });

  return (
    <div>
      {/* Filtro de busca */}
      <div className="mb-4 max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Buscar receita..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {receitasFiltradas.length === 0 ? (
          <p className="text-center col-span-full text-gray-600">Nenhuma receita encontrada.</p>
        ) : (
          receitasFiltradas.map((receita) => (
            <div
              key={receita.idReceita}
              className="p-4 bg-white shadow-md rounded cursor-pointer hover:bg-gray-100"
              onClick={() => onSelectReceita(receita)}
            >
              <h3 className="text-lg font-bold">{receita.nomeReceita}</h3>
              <p className="text-sm text-gray-600">
                Ingredientes: {receita.ingredientes?.map((ing) => ing.nome).join(", ")}
              </p>

              {/* Exibir descrição apenas se houver */}
              {receita.descricao && (
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {receita.descricao}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
