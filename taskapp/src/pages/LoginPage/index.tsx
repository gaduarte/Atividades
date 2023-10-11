import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface LoginPageProps {
  next?: string;
}

export function LoginPage({ next = '/tasks' }: LoginPageProps) {
  const { signin, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate(next);
  }

  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = usernameInputRef.current!.value;
    const password = passwordInputRef.current!.value;

    if (username !== 'user1' || password !== '123') {
      alert('Usuário e/ou senha incorretos!');
    } else {
      signin({ username });
      navigate(next);
    }
  }

  return (
    <main>
      <h1>Login Page</h1>
      <form onSubmit={handleLoginSubmit}>
        <input type="text" placeholder="username" ref={usernameInputRef} />
        <input type="password" placeholder="senha" ref={passwordInputRef} />
        <button type="submit">Entrar</button>
      </form>
    </main>
  );
}
