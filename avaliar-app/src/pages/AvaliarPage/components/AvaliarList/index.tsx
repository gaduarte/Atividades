import { Avaliar } from "../..";
import { AvaliarListItems } from "../AvaliarListItems";

interface AvaliarListProps {
    avaliacao: Avaliar[]
    onRemove: (avaliar: Avaliar) => void
    onLike: (avaliar: Avaliar) => void
    onDislike: (avaliar: Avaliar) => void
}

const AvaliarList = ({avaliacao, onRemove, onLike, onDislike}: AvaliarListProps) => {
    return(
        <>
        <h4 className="cadastrados">Total Frases: {avaliacao.length}</h4>
        <ul>
            {avaliacao.map(avaliar => <AvaliarListItems onRemove={onRemove} onLike={onLike} onDislike={onDislike} key={avaliar.id} avaliar={avaliar} /> )}
        </ul>
        </>
    )
}

export {AvaliarList}