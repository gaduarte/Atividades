import React, { useState } from 'react';
import './css/App.css'
import CalcularMilheiroReal from './components/calculo-milhas';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [calculatedValues, setCalculatedValues] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

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

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function handleLogout() {
    setIsLoggedIn(false);
  }

  return (
    <div className={`App ${currentPage === 'home' ? 'home-page' : 'calculo-page'}`}>
      <div className="calculator-box">
        {isLoggedIn ? (
          <div>
            <h1>Simulador de Milheiro</h1>
            <button onClick={handleNextClick}>Next</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <h1>Please Log In</h1>
            <button onClick={handleLogin}>Login</button>
          </div>
        )}

        {isLoggedIn && currentPage === 'calculo' && (
          <CalcularMilheiroReal
            onCalculated={handleCalculated}
            onBackToHome={handleBackToHome}
          />
        )}

        {isLoggedIn && currentPage === 'home' && calculatedValues && (
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



