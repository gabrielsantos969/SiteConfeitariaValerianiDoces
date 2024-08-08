import React, { useState, useEffect, useRef } from "react";
import Banner from './Components/Banner.js';
import LojaCard from './Components/LojaCard.js';
import ItemLoja from "./Components/ItemLoja.js";
import Carrinho from './Components/Carrinho.js';
import produtos from './data/produtos.json'; // Importa o arquivo JSON
import './App.css';

function App() {
  const [carrinho, setCarrinho] = useState([]);
  const [carrinhoVisivel, setCarrinhoVisivel] = useState(false);
  const carrinhoRef = useRef(null); // Referência para o componente Carrinho

  const handleAdicionarAoCarrinho = (item) => {
    const preco = parseFloat(item.preco);
    if (isNaN(preco) || preco <= 0) {
      console.error('Preço inválido:', item.preco);
      return;
    }

    const itemComPreco = { ...item, preco, total: preco * (item.quantidade || 1) };
    setCarrinho([...carrinho, itemComPreco]);
    setCarrinhoVisivel(true);  // Abre o carrinho quando o item é adicionado
  };

  const handleEditarQuantidade = (index, quantidade) => {
    const novosItens = [...carrinho];
    if (quantidade <= 0) {
      novosItens.splice(index, 1);
    } else {
      novosItens[index].quantidade = quantidade;
      novosItens[index].total = quantidade * novosItens[index].preco;
    }
    setCarrinho(novosItens);
  };

  const handleRemoverItem = (index) => {
    const novosItens = carrinho.filter((_, i) => i !== index);
    setCarrinho(novosItens);
  };

  const handleConcluirCompra = () => {
    // Implementar a lógica para finalizar a compra
  };

  useEffect(() => {
    // Função para lidar com o clique fora do componente
    const handleClickOutside = (event) => {
      if (carrinhoRef.current && !carrinhoRef.current.contains(event.target)) {
        setCarrinhoVisivel(false);
      }
    };

    // Adiciona o listener de clique
    document.addEventListener('mousedown', handleClickOutside);

    // Remove o listener de clique quando o componente é desmontado
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="app-container">
      <button 
        className="btn-carrinho" 
        onClick={() => setCarrinhoVisivel(!carrinhoVisivel)}
        aria-label="Toggle Carrinho"
      >
        🛒
      </button>
      {carrinhoVisivel && (
        <div ref={carrinhoRef}>
          <Carrinho
            itens={carrinho}
            onEditarQuantidade={handleEditarQuantidade}
            onRemoverItem={handleRemoverItem}
            onConcluirCompra={handleConcluirCompra}
          />
        </div>
      )}
      <div className="main-content">
        <Banner />
        <LojaCard />
        <h1 style={{ textAlign: 'center' }}>Itens da Loja</h1>
        <hr></hr>
        <div className="item-loja-list">
          {produtos.map((produto, index) => (
            <ItemLoja key={index} produto={produto} adicionarAoCarrinho={handleAdicionarAoCarrinho} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
