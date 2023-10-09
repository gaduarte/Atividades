import { useEffect } from 'react';
import { ulid } from 'ulidx';
import { AvaliarForm } from './components/AvaliarForm';
import { AvaliarList } from './components/AvaliarList';
import styles from './AvaliarPage.module.css'
import { ActionType} from '../../reducers/avaliar_reducer';
import { deleteAvaliacao, fetchAllAvaliacoes, postNewAvaliacao, updateLikesDislikes } from '../../services/api';
import { useAvaliacoes, useAvaliacaoDispatch} from '../../context/AvaliarContext';
import 'source-map-support/register';

export interface Avaliar {
    id: string
    created_at: Date
    name: string
    autor: string
    like: number
    dislike: number
    votoAtual: 'like' | 'dislike' | 'none'
}

export function AvaliarPage(){
   
    const state = useAvaliacoes();
    const dispatch = useAvaliacaoDispatch();

    if (state === undefined || dispatch === undefined) {
        throw new Error('AvaliacaoContext or AvaliacaoDispatchContext is undefined');
      }

    useEffect(()=>{
        const loadAvaliacoes = async ()=>{
            const avaliacoes = await fetchAllAvaliacoes();
            dispatch({type: ActionType.Loaded, payload: {avaliacoes}})
        }
        loadAvaliacoes()
    }, [])

    const handleAddAvaliacao = (text: string, autor: string) => {
        const new_avaliacao = {
            id: ulid(),
            created_at: new Date(),
            name: text,
            autor: autor,
            like: 0,
            dislike: 0,
            votoAtual: 'none' as 'none'
        }
        
        const postAvaliacao = async()=>{
            dispatch({
                type: ActionType.Added,
                payload: {avaliar: await postNewAvaliacao(new_avaliacao)}
            })
        }
        postAvaliacao();
    }

    const handleRemoveAvaliacao = async ({id}: Avaliar) => {
        await deleteAvaliacao(id);

        dispatch({type: ActionType.Deleted, payload: {id}})
    }

    const handleLikeAvaliacao = (avaliar: Avaliar) => {
        try {
          updateLikesDislikes(avaliar.id, 'like');
          dispatch({ type: ActionType.UpdatedLike, payload: { id: avaliar.id } });
        } catch (error) {
          console.error("Erro ao curtir a avaliação:", error);
        }
      };
      
      const handleDislikeAvaliacao =  (avaliar: Avaliar) => {
        try {
          updateLikesDislikes(avaliar.id, 'dislike');
          dispatch({ type: ActionType.UpdatedDislike, payload: { id: avaliar.id } });
        } catch (error) {
          console.error("Erro ao curtir a avaliação:", error);
        }
      }
       
    return(
        <div className={styles.container}>
            <div className={styles.root}>
                <AvaliarForm onAdd={handleAddAvaliacao} />
                <AvaliarList avaliacao={state.avaliacoes} onRemove={handleRemoveAvaliacao}
                onLike={handleLikeAvaliacao} onDislike={handleDislikeAvaliacao}
                />
            </div>
        </div>
    )
}