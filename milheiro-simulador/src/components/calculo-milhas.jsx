import React, { useState } from 'react';

export default function CalcularMilheiroReal({ onCalculated, onBackToHome }) {
  const [valorPadraoMilheiro, setValorPadraoMilheiro] = useState(70);
  const [desconto, setDesconto] = useState(40); 
  const [bonus, setBonus] = useState(200); 
  const [milhasComprar, setMilhasComprar] = useState(1000);
  const [milhasBonus, setMilhasBonus] = useState(2000); 
  const [valorTotalPago, setValorTotalPago] = useState(null); 
  const [milheiroReal, setMilheiroReal] = useState(null); 

  const calcularMilheiroReal = () => {
    const valorDescontado = (desconto / 100) * valorPadraoMilheiro;
    const valorTotal = valorPadraoMilheiro - valorDescontado;
    const milhasReais = milhasComprar + milhasBonus;
    const valorMilheiroReal = valorTotal / milhasReais;

    setValorTotalPago(valorTotal.toFixed(2));
    setMilheiroReal(valorMilheiroReal.toFixed(3));
  };

  return (
    <div>
      <h1>Simulador de Milheiro Real</h1>
      <fieldset>
        <legend>Configurações</legend>
        <div>
          <label>Valor Padrão do Milheiro (R$):</label>
          <input
            type="number"
            value={valorPadraoMilheiro}
            onChange={(e) => setValorPadraoMilheiro(e.target.value)}
          />
        </div>
        <div>
          <label>Desconto (%):</label>
          <input
            type="number"
            value={desconto}
            onChange={(e) => setDesconto(e.target.value)}
          />
        </div>
        <div>
          <label>Bônus (%):</label>
          <input
            type="number"
            value={bonus}
            onChange={(e) => setBonus(e.target.value)}
          />
        </div>
        <div>
          <label>Milhas a Comprar:</label>
          <input
            type="number"
            value={milhasComprar}
            onChange={(e) => setMilhasComprar(e.target.value)}
          />
        </div>
        <div>
          <label>Milhas de Bônus:</label>
          <input
            type="number"
            value={milhasBonus}
            onChange={(e) => setMilhasBonus(e.target.value)}
          />
        </div>
      </fieldset>
      <button onClick={calcularMilheiroReal}>Calcular Milheiro Real</button>
      {valorTotalPago !== null && (
        <p>Valor Total Pago: R$ {valorTotalPago}</p>
      )}
      {milheiroReal !== null && (
        <p>Milheiro Real: R$ {milheiroReal}</p>
      )}
    </div>
  );
}
