// CSS
import "./Produtos.css";

//Imports REACT
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// HOOKs
import { useFetch } from "../../hook/useFetch";

// Pages
import CadProdutos from "./CadProdutos";

const Produtos = () => {
  const url = import.meta.env.VITE_API + "produtos";
  const { data, httpConfig, loading, error, setBuscarNome } = useFetch(url);

  const navigate = useNavigate();

  const [mostrarModal, setMostrarModal] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const [buscarProduto, setBuscarProduto] = useState("");

  // Controle de aparição do MODAL
  const editarProduto = (produto) => {
    setProdutoSelecionado(produto);
    setMostrarModal(true);
  };

  const fecharModal = () => {
    setMostrarModal(false);
  };

  // DELETAR Produto
  const deletarProduto = (idProduto) => {
    httpConfig(idProduto, "DELETE");
  };

  //Buscar Produtos por nome
  const handleSubmitBuscar = () => {
    setBuscarNome(buscarProduto);
    console.log(buscarProduto);
  };

  return (
    <div className="produtos-container">
      <div className="topo-produtos">
        <h2>Produtos</h2>
        <div className="busca-produto">
        <label>
          Pesquisar:
          <input
            type="text"
            value={buscarProduto}
            name="buscar"
            onChange={(e) => setBuscarProduto(e.target.value)}
          />
        </label>
        <button onClick={handleSubmitBuscar}>Pesquisar</button>
        </div>
        
      </div>
      <div className="lista-produtos">
      <button
        onClick={() => {
          navigate("/cadprodutos");
        }}
      >
        Novo Produto
      </button>
      {loading && <p>Carregando dados...</p>}
      {error && <p>{error}</p>}
      <ul className="produtos-lista">
        {data &&
          data.map((produtos) => (
            <li className="produto-item" key={produtos.idProduto}>
              <div className="info-produto">
                {produtos.idProduto} -{produtos.nome} -{produtos.descricao} - R$: {produtos.preco}
              </div>
              <div className="button-produto">
                <button onClick={() => editarProduto(produtos)}>Editar</button>
                <button
                  onClick={() => deletarProduto(produtos.idProduto)}
                  className="btn-delete"
                >
                  Deletar
                </button>
              </div>
            </li>
          ))}
      </ul>
      </div>

      {/* Exibir o form como children */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <CadProdutos produto={produtoSelecionado} onClose={fecharModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Produtos;
