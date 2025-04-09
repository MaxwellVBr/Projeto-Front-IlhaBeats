import React, { useState, useEffect } from 'react'
import { useFetch } from '../../hook/useFetch';

const CadProdutos = ({ produto, onClose }) => {
    const url = import.meta.env.VITE_API + "produtos";

    const { data, httpConfig, loading, error } = useFetch(url);

    const [nome, setNome] = useState(produto? produto.nome : "");
    const [descricao, setDescricao] = useState(produto? produto.descricao : "");
    const [preco, setPreco] = useState(produto? produto.preco : "");

    const handleSubmit = (e) => {
        e.preventDefault();

        const produtoSelecionado  = {
            nome,
            descricao,
            preco
        }

        if (produto && produto.idProduto) {
            httpConfig(produtoSelecionado, "PUT", produto.idProduto);
          } else {
            httpConfig(produtoSelecionado, "POST");
          }

        setNome("");
        setDescricao("");
        setPreco("");
        
    }

  return (
    <div>
        <h1>{produto ? "Editar Produto" : "Cadastro de Produtos"}</h1>
        <form onSubmit={handleSubmit}>
            <label>
                Nome:
                <input type="text" value={nome} name="nome" onChange={(e) => setNome(e.target.value)}/>
            </label>
            <label>
                Descrição:
                <input type="text" value={descricao} name="descricao" onChange={(e) => setDescricao(e.target.value)} />
            </label>
            <label>
                Preço:
                <input type="Number" value={preco} name="preco" onChange={(e) => setPreco(e.target.value)}/>
            </label>
            <input type="submit" value={produto ? 'Atualizar' : 'Cadastrar'} />
        </form>
        {produto && 
        <button onClick={onClose}>Fechar</button> 
        }        
    </div>
  )
}

export default CadProdutos