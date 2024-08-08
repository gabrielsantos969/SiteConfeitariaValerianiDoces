import React, { useEffect, useState } from 'react';
import '../static/css/lojaCard.css';

const LojaCard = () => {
  const [status, setStatus] = useState('');

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const time = hours * 100 + minutes; // Formato HHMM

    if (time >= 800 && time < 1700) {
      setStatus('aberto');
    } else {
      setStatus('fechado');
    }
  }, []);

  return (
    <div className="container my-5">
      <div className="card loja-card">
        {/* Ícone da Loja */}
        <div className="icone-loja">
          <img src="https://cdn.icon-icons.com/icons2/94/PNG/512/sweets_food_16799.png" className="img-fluid" alt="Ícone da Loja" />
        </div>

        {/* Informações da Loja */}
        <div className="loja-info">
          <a href="https://www.google.com/maps/place/Ladeira+da+Independ%C3%AAncia,+63+-+Nazar%C3%A9,+Salvador+-+BA,+40040-340" target="_blank" rel="noopener noreferrer" className="endereco-loja">
            Ladeira da Independência, 63 - Nazaré, Salvador - BA, 40040-340
          </a>
          <div id="status-loja" className={`status-loja status-${status}`}>
            <span className="status-bolinha"></span>
            <span className="status-texto">{status === 'aberto' ? 'Aberto agora' : 'Fechado agora'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LojaCard;
