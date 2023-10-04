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

      onDislike(updateAvaliacao);
  }

  const totalVotes = avaliar.like + avaliar.dislike;

  const progressWidth = totalVotes === 0 ? 0 : (avaliar.like / totalVotes) * 100;
  const progressBarColor = progressWidth > 50 ? "#4caf50" : "#f44336";

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
          <div
            className="total-progress"
            style={{
              width: `${progressWidth}%`,
              backgroundColor: progressBarColor,
            }}
          >
            {`${Math.round(progressWidth)}%`}
          </div>
        </div>
      </li>
    );
}


