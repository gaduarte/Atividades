import './App.css'
import { AvaliarPage } from './pages/AvaliarPage'

function App() {
  return (
    <div className="centered">
      <nav>
        <header className="title">App de Avaliação</header>
        </nav>
      <main>
        <AvaliarPage />
      </main>
      <footer>
        @Like/Dislike
      </footer>
    </div>
  );
}

export default App
