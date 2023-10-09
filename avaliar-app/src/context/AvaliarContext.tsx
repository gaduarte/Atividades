import { createContext, useContext, useReducer, ReactNode } from "react";
import { AvaliarState } from "../reducers/avaliar_reducer";
import { ActionType } from "../reducers/avaliar_reducer";
import { Action } from "../reducers/avaliar_reducer";

export const AvaliacaoContext = createContext<AvaliarState | undefined>(undefined);
export const AvaliacaoDispatchContext = createContext<React.Dispatch<Action> | undefined>(undefined);

export function AvaliacaoProvider({children}: {children: ReactNode}){
    const [avaliacoes, dispatch] = useReducer(
        reducer,
        initialAvaliacao
    );

    return (
        <AvaliacaoContext.Provider value={avaliacoes}>
            <AvaliacaoDispatchContext.Provider value={dispatch}>{children}</AvaliacaoDispatchContext.Provider>
        </AvaliacaoContext.Provider>
    );
}

export function useAvaliacoes() {
    const context = useContext(AvaliacaoContext);
    if (context === undefined) {
      throw new Error("useAvaliacoes must be used within an AvaliacaoProvider");
    }
    return context;
  }
  
export function useAvaliacaoDispatch() {
    const context = useContext(AvaliacaoDispatchContext);
    if (context === undefined) {
      throw new Error(
        "useAvaliacaoDispatch must be used within an AvaliacaoProvider"
      );
    }
    return context;
  }

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

const initialAvaliacao: AvaliarState = {
    avaliacoes: [],
}