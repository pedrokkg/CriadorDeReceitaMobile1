import Status from "/model/Status.js";
import Usuario from "/model/UsuarioDTO.js";
import ViewerError from "/viewer/ViewerError.js";

//------------------------------------------------------------------------//

export default class ViewerUsuario {

  #ctrl;
  
  constructor(ctrl) {
    this.#ctrl = ctrl;
    this.divNavegar  = this.obterElemento('divNavegar'); 
    this.divComandos = this.obterElemento('divComandos'); 
    this.divAviso    = this.obterElemento('divAviso'); 
    this.divDialogo  = this.obterElemento('divDialogo');

    this.btPrimeiro  = this.obterElemento('btPrimeiro');
    this.btAnterior  = this.obterElemento('btAnterior');
    this.btProximo   = this.obterElemento('btProximo');
    this.btUltimo    = this.obterElemento('btUltimo');

    this.btIncluir   = this.obterElemento('btIncluir');
    this.btExcluir   = this.obterElemento('btExcluir');
    this.btAlterar   = this.obterElemento('btAlterar');
    this.btSair      = this.obterElemento('btSair');

    this.btOk        = this.obterElemento('btOk');
    this.btCancelar  = this.obterElemento('btCancelar');

    this.tfId        = this.obterElemento('tfId');
    this.tfNome      = this.obterElemento('tfNome');
    this.tfEmail     = this.obterElemento('tfEmail');
    this.tfSenha     = this.obterElemento('tfSenha');
    
    this.btPrimeiro.onclick = fnBtPrimeiro; 
    this.btProximo.onclick = fnBtProximo; 
    this.btAnterior.onclick = fnBtAnterior; 
    this.btUltimo.onclick = fnBtUltimo; 

    this.btIncluir.onclick = fnBtIncluir; 
    this.btAlterar.onclick = fnBtAlterar; 
    this.btExcluir.onclick = fnBtExcluir; 

    this.btOk.onclick = fnBtOk; 
    this.btCancelar.onclick = fnBtCancelar; 
  }

//------------------------------------------------------------------------//

  obterElemento(idElemento) {
    let elemento = document.getElementById(idElemento);
    if(elemento == null) 
      throw new ViewerError("Não encontrei um elemento com id '" + idElemento + "'");
    elemento.viewer = this;
    return elemento;
  }

//------------------------------------------------------------------------//
  
  getCtrl() { 
    return this.#ctrl;
  }

//------------------------------------------------------------------------//
  
  async apresentar(pos, qtde, usuario) {    
    
    this.configurarNavegacao( pos <= 1 , pos == qtde );   

    if(usuario == null) {
      this.tfId.value    = "";
      this.tfNome.value  = "";
      this.tfEmail.value = "";
      this.tfSenha.value = "";
      this.divAviso.innerHTML = "Número de Usuários: 0";
    } else {
      this.tfId.value    = usuario.getId();
      this.tfNome.value  = usuario.getNome();
      this.tfEmail.value = usuario.getEmail();
      this.tfSenha.value = usuario.getSenha();
      this.divAviso.innerHTML = "Posição: " + pos + " | Número de Usuários: " + qtde;
    }
  }

//------------------------------------------------------------------------//

  configurarNavegacao(flagInicio, flagFim) {
    this.btPrimeiro.disabled = flagInicio;
    this.btUltimo.disabled   = flagFim;
    this.btProximo.disabled  = flagFim;
    this.btAnterior.disabled = flagInicio;
  }
  
//------------------------------------------------------------------------//
  
  statusEdicao(operacao) { 
    this.divNavegar.hidden = true;
    this.divComandos.hidden = true;
    this.divDialogo.hidden = false; 
    
    if(operacao != Status.EXCLUINDO) {
      this.tfNome.disabled = false;
      this.tfEmail.disabled = false;
      this.tfSenha.disabled = false;
      this.divAviso.innerHTML = "";      
    } else {
      this.divAviso.innerHTML = "Deseja excluir este registro?";      
    }
    if(operacao == Status.INCLUINDO) {
      this.tfId.disabled = false;
      this.tfId.value    = "";
      this.tfNome.value  = "";
      this.tfEmail.value = "";
      this.tfSenha.value = "";
    }
  }

//------------------------------------------------------------------------//
  
  statusApresentacao() { 
    this.divNavegar.hidden = false;
    this.divComandos.hidden = false;
    this.divDialogo.hidden = true; 
    this.tfId.disabled    = true;
    this.tfNome.disabled  = true;
    this.tfEmail.disabled = true;
    this.tfSenha.disabled = true;
  }
}

//------------------------------------------------------------------------//
// CALLBACKs para os Botões
//------------------------------------------------------------------------//

function fnBtPrimeiro() {
  this.viewer.getCtrl().apresentarPrimeiro();
}

function fnBtProximo() {
  this.viewer.getCtrl().apresentarProximo();
}

function fnBtAnterior() {
  this.viewer.getCtrl().apresentarAnterior();
}

function fnBtUltimo() {
  this.viewer.getCtrl().apresentarUltimo();
}

function fnBtIncluir() {
  this.viewer.getCtrl().iniciarIncluir();
}

function fnBtAlterar() {
  this.viewer.getCtrl().iniciarAlterar();
}

function fnBtExcluir() {
  this.viewer.getCtrl().iniciarExcluir();
}

function fnBtOk() {
  const id = this.viewer.tfId.value;
  const nome = this.viewer.tfNome.value;
  const email = this.viewer.tfEmail.value;
  const senha = this.viewer.tfSenha.value;
  
  this.viewer.getCtrl().efetivar(id, nome, email, senha); 
}

function fnBtCancelar() {
  this.viewer.getCtrl().cancelar(); 
}
