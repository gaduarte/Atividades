import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface LoginPageProps {
  next?: string;
}

export function LoginPage({ next = '/tasks' }: LoginPageProps) {
  const { signin} = useAuth();
  const navigate = useNavigate();

  const [formData, setFormDta] = useState({username: 'user1', password: '123'});

  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {username, password} = formData
    console.log(username, 'username')
    console.log(password, 'password')

    if (!username|| !password) {
      alert('Usuário e/ou senha incorretos!');
    } else {
      signin({ username, password });
      navigate(next);
    }
  }

  return (
    <main>
      <h1>Login Page</h1>
      <form onSubmit={handleLoginSubmit}>
        <input type="text" placeholder="username" ref={usernameInputRef} value={formData.username} onChange={(e)=> setFormDta({...formData, username: e.target.value})}/>
        <input type="password" placeholder="senha" ref={passwordInputRef} value={formData.password} onChange={(e)=>setFormDta({...formData, password: e.target.value})} />
        <button type="submit">Entrar</button>
      </form>
    </main>
  );
}
