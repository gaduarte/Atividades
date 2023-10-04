import { Avaliar } from "../pages/AvaliarPage";

export interface AvaliarState{
    avaliacoes: Avaliar[];
}

export enum ActionType{
    Loaded,
    Added,
    UpdatedLike,
    UpdatedDislike,
    Deleted
}

type AvaliarAdded = {type: ActionType.Added; payload: {avaliar: Avaliar}};
type AvaliarUpdatedLike = {type: ActionType.UpdatedLike; payload: {id: string}};
type AvaliarUpdatedDislike = {type: ActionType.UpdatedDislike; payload: {id: string}};
type AvaliarDeleted = {type: ActionType.Deleted; payload: {id: string}};
type AvaliarLoaded = {type: ActionType.Loaded; payload: {avaliacoes: Avaliar[]}};

type Action = AvaliarAdded | AvaliarUpdatedLike | AvaliarUpdatedDislike | AvaliarDeleted | AvaliarLoaded;

const reducer = (state: AvaliarState, action: Action): AvaliarState => {
    switch(action.type){
        case ActionType.Loaded: {
            return{avaliacoes: [...action.payload.avaliacoes]};
        }
        case ActionType.Added: {
            return{avaliacoes: [action.payload.avaliar, ...state.avaliacoes]};
        }
        case ActionType.UpdatedLike: {
            const { id } = action.payload;

            const avaliacao = state.avaliacoes.find((avaliar) => avaliar.id === id);
            if (!avaliacao) return state;

            const updatedAvaliacao = {
                ...avaliacao,
                like: avaliacao.like + 1,
                votoAtual: 'like' as 'like'
            };

            const updatedAvaliacoes = state.avaliacoes.map((avaliar) =>
                avaliar.id === id ? updatedAvaliacao : avaliar
            );

            return { ...state, avaliacoes: updatedAvaliacoes };
        }
        case ActionType.UpdatedDislike: {
            const {id} = action.payload;

            const avaliacao = state.avaliacoes.find((avaliar)=> avaliar.id === id);
            if(!avaliacao) return state;

            const updatedAvaliacao = {
                ...avaliacao,
                dislike: avaliacao.dislike + 1
            };

            const updatedAvaliacoes = state.avaliacoes.map((avaliar)=> 
            avaliar.id === id ? updatedAvaliacao: avaliar );

            return {...state, avaliacoes: updatedAvaliacoes};
          }
          
        case ActionType.Deleted: {
            return{avaliacoes: state.avaliacoes.filter((t)=> t.id !== action.payload.id)};
        }
        default: {
            console.debug("Action type inválido.");
            return state;
        }
    }
};

export {reducer as avaliarStateReducer};