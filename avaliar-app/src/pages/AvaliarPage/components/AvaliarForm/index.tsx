import { useRef, useState } from "react";

interface AvaliarFormProps {
    onAdd: (text: string, autor: string) => void
}

export function AvaliarForm({onAdd}: AvaliarFormProps){
    const [text, setText] = useState("")
    const [autor, setAutor] = useState("")
    const descriptionInputRef = useRef<HTMLInputElement>(null)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        onAdd(text, autor)
        setText("")
        setAutor("")
        event.currentTarget.reset()
        descriptionInputRef.current!.focus()

    }

    return(
        <form onSubmit={handleSubmit}>
            Insira uma Frase <br />
            <input type="text" ref={descriptionInputRef} value={text} onChange={(e)=> setText(e.target.value)} placeholder="Texto aqui..."
            required
             />
             <input type="text" ref={descriptionInputRef} value={autor} onChange={(e)=> setAutor(e.target.value)} placeholder="Informe Autor"/>
             <input type="submit" value="Adicionar" />
        </form>
    )
}