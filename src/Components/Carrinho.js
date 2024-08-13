import React, { useState, forwardRef } from 'react';
import '../static/css/carrinho.css';

const Carrinho = forwardRef(({ itens, onEditarQuantidade, onRemoverItem, onConcluirCompra, className }, ref) => {
  const [mostrarCheckout, setMostrarCheckout] = useState(false);
  const [nome, setNome] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('Cartão');
  const [opcaoEntrega, setOpcaoEntrega] = useState('retirada');
  const [endereco, setEndereco] = useState('');
  const [bairro, setBairro] = useState('');
  const [numero, setNumero] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [aviso, setAviso] = useState(''); // Estado para aviso

  const calcularTotal = () => {
    if (!Array.isArray(itens)) return '0.00';

    const total = itens.reduce((acc, item) => {
      const itemTotal = parseFloat(item.total) || 0;
      return acc + itemTotal;
    }, 0);

    return total.toFixed(2);
  };

  const exibirAviso = (mensagem) => {
    setAviso(mensagem);
    setTimeout(() => {
      setAviso('');
    }, 5000); // Limpa o aviso após 5 segundos
  };

  const handleConcluirCompra = () => {
    const total = calcularTotal();
    if (parseFloat(total) === 0) {
      exibirAviso('Adicione um produto ao carrinho antes de finalizar a compra.');
      return;
    }
    setMostrarCheckout(true);
  };

  const handleFinalizarCompra = (e) => {
    e.preventDefault();
    const total = calcularTotal();
    if (parseFloat(total) === 0) {
      exibirAviso('Adicione um produto ao carrinho antes de finalizar a compra.'); // Define o aviso
      return;
    }

    setAviso(''); // Limpa o aviso se o total não for zero
    const mensagem = gerarMensagemPedido(itens);
    const urlWhatsApp = `https://wa.me/5581999999999?text=${encodeURIComponent(mensagem)}`;
    window.open(urlWhatsApp, '_blank');
  };

  const gerarMensagemPedido = (itens) => {
    let mensagem = `Pedido \n\nCliente: ${nome}\nForma de Pagamento: ${formaPagamento}\n\nItens:\n`;
    itens.forEach((item) => {
      mensagem += `➡ ${item.quantidade}x ${item.nome}\n      ${item.descricao}\n\n`;
    });
    if (opcaoEntrega === 'entrega') {
      mensagem += `\nEndereço de Entrega:\nRua: ${endereco}\nBairro: ${bairro}\nNúmero: ${numero}\nCidade: ${cidade} - ${uf}\n`;
    }
    mensagem += `\nTotal: R$ ${calcularTotal()}\n`;
    mensagem += `\nObrigado pela preferência, se precisar de algo é só chamar! 😉`;

    return mensagem;
  };

  return (
    <div ref={ref} className={`carrinho ${className}`}>
      <div className="card">
        <div className="card-header">
          <h5>Carrinho de Compras</h5>
        </div>
        <div className="card-body">
          {itens.length === 0 ? (
            <p>Seu carrinho está vazio.</p>
          ) : (
            <ul className="list-group">
              {itens.map((item, index) => (
                <li key={index} className="list-group-item">
                  <div className="item-info">
                    <strong>{item.nome}</strong>
                    <div className="item-descricao">{item.descricao}</div>
                  </div>
                  <div className="item-actions">
                    <div className="item-quantidade">
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => onEditarQuantidade(index, Math.max(item.quantidade - 1, 1))}
                        disabled={item.quantidade <= 1}
                      >
                        -
                      </button>
                      <span className="quantidade">{item.quantidade}</span>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => onEditarQuantidade(index, item.quantidade + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button className="btn btn-sm btn-danger btn-remover" onClick={() => onRemoverItem(index)}>Remover</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="card-footer d-flex justify-content-between align-items-center">
          <span className="fw-bold">Total: R$ {calcularTotal()}</span>
          <button className="btn btn-success" onClick={handleConcluirCompra}>Finalizar Compra</button>
        </div>
      </div>

      {aviso && <div className="alert alert-warning">{aviso}</div>} {/* Exibe o aviso se definido */}

      {mostrarCheckout && parseFloat(calcularTotal()) > 0 && ( // Adiciona a condição para verificar se o total é maior que zero
        <div className="mt-3 p-3 border rounded">
          <h5>Finalizar Compra</h5>
          <form onSubmit={handleFinalizarCompra}>
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">Nome</label>
              <input
                type="text"
                id="nome"
                className="form-control"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formaPagamento" className="form-label">Forma de Pagamento</label>
              <select
                id="formaPagamento"
                className="form-select"
                value={formaPagamento}
                onChange={(e) => setFormaPagamento(e.target.value)}
              >
                <option value="Cartão">Cartão</option>
                <option value="Dinheiro">Dinheiro</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="opcaoEntrega" className="form-label">Opção de Entrega</label>
              <select
                id="opcaoEntrega"
                className="form-select"
                value={opcaoEntrega}
                onChange={(e) => setOpcaoEntrega(e.target.value)}
              >
                <option value="retirada">Retirada no Local</option>
                <option value="entrega">Entrega</option>
              </select>
            </div>
            {opcaoEntrega === 'entrega' && (
              <>
                <div className="mb-3">
                  <label htmlFor="endereco" className="form-label">Endereço</label>
                  <input
                    type="text"
                    id="endereco"
                    className="form-control"
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="bairro" className="form-label">Bairro</label>
                  <input
                    type="text"
                    id="bairro"
                    className="form-control"
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="numero" className="form-label">Número</label>
                  <input
                    type="text"
                    id="numero"
                    className="form-control"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="cidade" className="form-label">Cidade</label>
                  <input
                    type="text"
                    id="cidade"
                    className="form-control"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="uf" className="form-label">UF</label>
                  <input
                    type="text"
                    id="uf"
                    className="form-control"
                    value={uf}
                    onChange={(e) => setUf(e.target.value)}
                    required
                  />
                </div>
              </>
            )}
            <button type="submit" className="btn btn-success">Enviar Pedido</button>
          </form>
        </div>
      )}
    </div>
  );
});

export default Carrinho;
