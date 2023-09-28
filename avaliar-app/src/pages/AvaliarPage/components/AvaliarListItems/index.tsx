import { Avaliar } from "../..";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown, faTrash } from "@fortawesome/free-solid-svg-icons";

interface AvaliarListItemsProps {
    avaliar: Avaliar
    onRemove: (avaliar: Avaliar) => void
    onLike: (avaliar: Avaliar) => void
    onDislike: (avaliar: Avaliar) => void
}

export function AvaliarListItems({avaliar, onRemove, onLike, onDislike}: AvaliarListItemsProps){
    const handleRemove = () => {onRemove(avaliar)}

    const handleLike = () => {
        const updateAvaliacao = {...avaliar, like: avaliar.like + 1}

        onLike(updateAvaliacao);
    }

    const handleDislike = () => {
        const updateAvaliacao = {...avaliar, dislike: avaliar.dislike + 1}

        onDislike(updateAvaliacao)
    }

    const calculaPorcentagem = (avaliacao: Avaliar) => {
        const totalVotes = avaliacao.like + avaliacao.dislike;
        const porcentagemLike = totalVotes === 0 ? 0 : (avaliacao.like / totalVotes);
        const porcentagemDislike = totalVotes === 0 ? 0 : (avaliacao.dislike / totalVotes);
    
        return {
          porcentagemLike,
          porcentagemDislike,
        }
      }

      const { porcentagemLike, porcentagemDislike } = calculaPorcentagem(avaliar)
      

      return (
        <li>
          <div>
            <p className="text-container">
              <span className="text">{avaliar.name}</span> --
              <span className="autor">{avaliar.autor}</span>
            </p>
            <button className="icon-button" onClick={handleLike}>
              <FontAwesomeIcon icon={faThumbsUp} />
            </button>
            <span>: {avaliar.like}</span>
            <button className="icon-button" onClick={handleDislike}>
              <FontAwesomeIcon icon={faThumbsDown} />
            </button>
            <span>: {avaliar.dislike}</span>
            <button className="icon-button" onClick={handleRemove}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
          <div className="progress-bar">
            <div className="like-progress" style={{ width: `${porcentagemLike}%` }}>
              {(porcentagemLike * 100).toFixed(2)}%
            </div>
            <div className="dislike-progress" style={{ width: `${porcentagemDislike}%` }}>
              {(porcentagemDislike * 100).toFixed(2)}%
            </div>
          </div>
        </li>
      );
      
}