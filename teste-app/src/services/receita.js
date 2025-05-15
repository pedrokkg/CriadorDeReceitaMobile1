import { db } from "./firebase";
import { ref, push, get, remove, update, set } from "firebase/database";

export async function criarReceita(receita) {
  try {
    const receitasRef = ref(db, "receitas");
    const idReceita = push(receitasRef).key;

    // Salva a receita com o nome e os detalhes no banco de receitas
    await set(ref(db, `receitas/${idReceita}`), {
      ...receita,
      idReceita,
    });

    const usuarioRef = ref(db, `usuarios/${receita.uid}/receitas`);
    
    // Aqui você salva tanto o ID quanto o nome da receita no nó do usuário
    await push(usuarioRef, {
      idReceita,
      nomeReceita: receita.nomeReceita,  // Adiciona o nome da receita
    });

    console.log('Receita criada e associada ao usuário!');
  } catch (error) {
    console.error("Erro ao criar receita:", error);
    throw error;
  }
}


export async function buscarReceitas() {
  try {
    const receitasRef = ref(db, "receitas");
    const snapshot = await get(receitasRef);
    const data = snapshot.val() || {};
    return Object.entries(data).map(([id, receita]) => ({
      ...receita,
      idReceita: id,
    }));
  } catch (error) {
    console.error("Erro ao buscar receitas:", error);
    return [];
  }
}


export async function excluirReceita(idReceita) {
  const receitaRef = ref(db, `receitas/${idReceita}`);
  await remove(receitaRef);
}

export const atualizarReceita = async (idReceita, novosDados) => {
  await update(ref(db, `receitas/${idReceita}`), novosDados);
};