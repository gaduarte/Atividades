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

export type Action = AvaliarAdded | AvaliarUpdatedLike | AvaliarUpdatedDislike | AvaliarDeleted | AvaliarLoaded;
