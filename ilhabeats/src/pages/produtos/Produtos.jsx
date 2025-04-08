// CSS
import './Produtos.css';

//Imports REACT
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

// HOOKs
import { useFetch } from '../../hook/useFetch';

// Pages
import CadProdutos from './CadProdutos';


const Produtos = () => {

    const url = import.meta.env.VITE_API + "produtos";
    const { data, loading, error } = useFetch(url);

    const navigate = useNavigate();

    const [mostrarModal, setMostrarModal] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  
    // Controle de aparição do MODAL
    const editarProduto = (produto) => {
      setProdutoSelecionado(produto);
      setMostrarModal(true);
    };
  
    const fecharModal = () => {
      setMostrarModal(false);
    };

    // DELETAR Produto
    const deleteProduto = (idProduto) => {

    }
    
  return (
    <div className="produtos-container">
        <h2>Produtos</h2>
        <button onClick={() => {navigate('/cadprodutos')}}>Novo Produto</button>
        {loading && <p>Carregando dados...</p>}
        {error && <p>{error}</p>}
        <ul className="produtos-lista">
            {data && data.map(produtos => (
                <li className="produto-item" key={produtos.idProduto}>
                    {produtos.idProduto} - 
                    {produtos.nome} -
                    {produtos.descricao} - 
                    R$ {produtos.preco}
                    <button onClick={() => editarProduto(produtos)}>Editar</button>
                    <button className='btn-delete'>Deletar</button>
                </li>
            ))}
        </ul>

        {/* Exibir o form como children */}
        {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <CadProdutos produto={produtoSelecionado} onClose={fecharModal} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Produtos