import React, { useState } from 'react';
import '../static/css/itemLoja.css';  // Adicione o caminho para o arquivo CSS se necessário

const ItemLoja = ({ produto, adicionarAoCarrinho }) => {
  const [quantidade, setQuantidade] = useState(1);
  const [expandirDescricao, setExpandirDescricao] = useState(false);

  const handleAdicionarAoCarrinho = () => {
    adicionarAoCarrinho({
      nome: produto.nome,
      preco: produto.preco,
      quantidade,
      total: quantidade * produto.preco,
      descricao: produto.descricao,
    });
  };

  return (
    <div className="item-loja-card card mb-3 p-3">
      <img src={produto.imagem} alt={produto.nome} className="img-fluid" style={{ maxWidth: '100px' }} />
      <div className="ms-3 item-loja-info">
        <h5>{produto.nome}</h5>
        <p>
          {expandirDescricao ? produto.descricao : `${produto.descricao.slice(0, 50)}...`}
          <span
            className="text-primary"
            style={{ cursor: 'pointer' }}
            onClick={() => setExpandirDescricao(!expandirDescricao)}
          >
            {expandirDescricao ? ' Ler menos' : ' Ler mais'}
          </span>
        </p>
        <div className="item-loja-actions">
          <div className="item-loja-quantidade">
            <button
              className="btn btn-secondary me-2"
              onClick={() => setQuantidade(Math.max(quantidade - 1, 1))}
              disabled={quantidade <= 1}
            >
              -
            </button>
            <input
              type="number"
              value={quantidade}
              onChange={(e) => setQuantidade(parseInt(e.target.value))}
              min="1"
              className="form-control me-2"
              style={{ width: '60px' }}
            />
            <button
              className="btn btn-secondary ms-2"
              onClick={() => setQuantidade(quantidade + 1)}
            >
              +
            </button>
          </div>
          <div className="item-adicionar">
            <span >Total: R$ {(quantidade * produto.preco).toFixed(2)}</span>
            <button className="btn btn-primary mt-2" onClick={handleAdicionarAoCarrinho}>
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemLoja;
