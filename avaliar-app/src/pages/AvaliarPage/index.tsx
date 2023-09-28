import { useState } from 'react';
import { ulid } from 'ulidx';
import { AvaliarForm } from './components/AvaliarForm';
import { AvaliarList } from './components/AvaliarList';
import styles from './AvaliarPage.module.css'

export interface Avaliar {
    id: string
    created_at: Date
    name: string
    autor: string
    like: number
    dislike: number
    votoAtual: 'like' | 'dislike'
}

export function AvaliarPage(){
    const [avaliacoes, setAvaliacao] = useState<Avaliar[]>([])


    const handleAddAvaliacao = (text: string, autor: string) => {
        const new_avaliacao = {
            id: ulid(),
            created_at: new Date(),
            name: text,
            autor: autor,
            like: 0,
            dislike: 0,
            votoAtual: 'none'
        }
        setAvaliacao([new_avaliacao, ...avaliacoes])
    }
    const handleRemoveAvaliacao = (avaliar: Avaliar) => {
        const filtradas = avaliacoes.filter(t => t.id !== avaliar.id)
        setAvaliacao(filtradas)
    }

    const handleLikeAvaliacao = (avaliar: Avaliar) => {
        const updatedAvaliacoes = avaliacoes.map(item => {
            if (item.id === avaliar.id) {
                    return{
                        ...item,
                        like: item.like + 1,
                        votoAtual: 'like'
                    }
                

            }
            return item;
        });

        setAvaliacao(updatedAvaliacoes);
    }

    const handleDislikeAvaliacao = (avaliar: Avaliar) => {
        const updatedAvaliacoes = avaliacoes.map(item => {
            if (item.id === avaliar.id) {
                return {
                    ...item,
                    dislike: item.dislike + 1 
                };
            }
            return item;
        });

        setAvaliacao(updatedAvaliacoes);
    }


    return(
        <div className={styles.container}>
            <div className={styles.root}>
                <AvaliarForm onAdd={handleAddAvaliacao} />
                <AvaliarList avaliacao={avaliacoes} onRemove={handleRemoveAvaliacao}
                onLike={handleLikeAvaliacao} onDislike={handleDislikeAvaliacao} />
            </div>
        </div>
    )
}