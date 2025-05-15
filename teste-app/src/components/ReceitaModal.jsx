import React from "react";

export function ReceitaModal({ receita, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">{receita.nomeReceita}</h2>
        <p className="text-sm text-gray-600 mb-2">Criado por: {receita.user}</p>

        <h3 className="text-lg font-semibold mt-4 mb-2">Ingredientes:</h3>
        <ul className="list-disc list-inside">
          {receita.itens?.map((item, index) => (
            <li key={index}>
              {item.ingrediente.nome} - {item.quantidade}
            </li>
          ))}
        </ul>

        <h3 className="text-lg font-semibold mt-4 mb-2">Modo de Preparo:</h3>
        <ol className="list-decimal list-inside">
          {receita.passos?.map((passo, index) => (
            <li key={index}>{passo.acao}</li>
          ))}
        </ol>

        <button
          onClick={onClose}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
