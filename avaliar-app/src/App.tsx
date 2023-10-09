import './App.css'
import { AvaliacaoProvider } from './context/AvaliarContext';
import { AvaliarPage } from './pages/AvaliarPage'

function App() {
  return (
    <div className="centered">
      <nav>
        <header className="title">App de Avaliação</header>
        </nav>
      <main>
        <AvaliacaoProvider>
          <AvaliarPage />
        </AvaliacaoProvider>
        
      </main>
      <footer>
        @Like/Dislike
      </footer>
    </div>
  );
}

export default App
