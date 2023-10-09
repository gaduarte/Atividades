import { useRef, useState } from "react";
import { useAvaliacaoDispatch } from "../../../../context/AvaliarContext";
import { ActionType } from "../../../../reducers/avaliar_reducer";
import { ulid } from "ulidx";

interface AvaliarFormProps {
  onAdd: (text: string, autor: string) => void;
}

export function AvaliarForm({ onAdd }: AvaliarFormProps) {
  const [text, setText] = useState("");
  const [autor, setAutor] = useState("");
  const dispatch = useAvaliacaoDispatch();
  const descriptionInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (text && autor) {
        onAdd(text,autor);
      dispatch({
        type: ActionType.Added,
        payload: {
          avaliar: {
            id: ulid(),
            created_at: new Date(),
            name: text,
            autor: autor,
            like: 0,
            dislike: 0,
            votoAtual: "none",
          },
        },
      });

      setText("");
      setAutor("");
      event.currentTarget.reset();
      descriptionInputRef.current!.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      Insira uma Frase <br />
      <input
        type="text"
        ref={descriptionInputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Texto aqui..."
        required
      />
      <input
        type="text"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
        placeholder="Informe Autor"
        required
      />
      <input type="submit" value="Adicionar" />
    </form>
  );
}
