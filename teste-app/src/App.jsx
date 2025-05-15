import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Login } from "./controller/Login";
import { CriarReceita } from "./controller/CriarReceita";
import { ReceitaListPublica } from "./controller/ReceitaListPublica";
import { ReceitaListUsuario } from "./controller/ReceitaListUsuario";
import { ReceitaModal } from "./components/ReceitaModal";
import { auth } from "./services/firebase";

function App() {
  const [user, setUser] = useState(null);
  const [abaAtual, setAbaAtual] = useState("publicas");
  const [receitaSelecionada, setReceitaSelecionada] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((usuario) => {
      if (usuario) {
        setUser(usuario);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    setUser(auth.currentUser);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    
    <div className="min-h-screen bg-blue-100">
      <Header user={user} abaAtual={abaAtual} setAbaAtual={setAbaAtual} />


      <div className="mt-6">
        {abaAtual === "publicas" && <ReceitaListPublica onSelectReceita={setReceitaSelecionada} />} 
        {abaAtual === "minhas" && <ReceitaListUsuario onSelectReceita={setReceitaSelecionada} userId={user.uid} />} 
        {abaAtual === "criar" && <CriarReceita />} 
      </div>

      {receitaSelecionada && (
        <ReceitaModal receita={receitaSelecionada} onClose={() => setReceitaSelecionada(null)} />
      )}
    </div>
  );
}

export default App;
