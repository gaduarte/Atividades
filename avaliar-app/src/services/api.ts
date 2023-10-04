import { Avaliar } from "../pages/AvaliarPage";

const base_url = "http://localhost:3000/avaliacoes";

export async function fetchAllAvaliacoes(): Promise<Avaliar[]>{
    const response = await fetch(`${base_url}?_sort=created_at&_order=desc`);
    const data = await response.json();

    return data as Avaliar[];
}

export async function postNewAvaliacao(avaliar: Avaliar):Promise<Avaliar> {
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(avaliar),
    };
    const response = await fetch(base_url, init);
    const data = await response.json();

    return data as Avaliar;
}

export async function deleteAvaliacao(id: string): Promise<void>{
    const deleted_url = `${base_url}/${id}`;
    const init = {
        method: "DELETE",
    };
    const response = await fetch(deleted_url, init);
    const data = await response.json();

    return data as void;
}

export async function updateLikesDislikes(id: string, type: 'like' | 'dislike'): Promise<Avaliar> {
    try {
        const like_dislike_url = `${base_url}/${id}/${type}s`; 
        const init = {
            method: "PUT",
        };
        const response = await fetch(like_dislike_url, init);
        const data = await response.json();

        return data as Avaliar;
    } catch (error) {
        console.error(`Erro ao atualizar ${type}s:`, error); 
        throw error; 
    }
}





  