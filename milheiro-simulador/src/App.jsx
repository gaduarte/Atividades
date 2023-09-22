import React, { useState } from 'react';
import './App.css';
import CalcularMilheiroReal from './components/calculo-milhas';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [calculatedValues, setCalculatedValues] = useState(null);

  function handleNextClick() {
    setCurrentPage('calculo');
  }

  function handleBackToHome() {
    setCurrentPage('home');
  }

  function handleCalculated(values) {
    setCalculatedValues(values);
    setCurrentPage('home'); 
  }

  return (
    <div className={`App ${currentPage === 'home' ? 'home-page' : 'calculo-page'}`}>
      <div className="calculator-box">
        {currentPage === 'home' && (
          <div>
            <h1>Simulador de Milheiro</h1>
            <button onClick={handleNextClick}>Next</button>
          </div>
        )}

        {currentPage === 'calculo' && (
          <CalcularMilheiroReal
            onCalculated={handleCalculated}
            onBackToHome={handleBackToHome}
          />
        )}

        {currentPage === 'home' && calculatedValues && (
          <div>
            <p>Valores calculados:</p>
            <p>Milhas: {calculatedValues.milhas}</p>
            <p>Milheiro: {calculatedValues.milheiro}</p>
          </div>
        )}
      </div>
    </div>
  );
}
