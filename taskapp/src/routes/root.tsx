import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function Root() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const {signout, isAuthenticated, user} = useAuth();

 const authBlock = useMemo(() => {
    return (
      isAuthenticated ?
        <p>{user!.username}
          <button onClick={() => { signout() }}>Sair</button>
        </p>
        : <p>Olá Visitante!</p>)
  }, [isAuthenticated])

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };


  return (
    <>
      <h1>Task App</h1>
      <p>{authBlock}</p>
      <div id="menu-icon" onClick={isSidebarOpen ? closeSidebar : openSidebar}>
        &#9776;
      </div>
      <div id="sidebar" className={isSidebarOpen ? "open" : ""}>
        <h2>Menu</h2>
        <nav>
          <ul>
            <li>
              <Link to={`/`}>Home</Link>
            </li>
            <li>
              <Link to={`tasks`}>Tasks</Link>
            </li>
            <li>
              <Link to={`login`}>Login</Link>
            </li>
          </ul>
          <span onClick={isSidebarOpen ? closeSidebar : openSidebar}>
            {isSidebarOpen ? "Fechar" : ""}
          </span>
        </nav>
      </div>
    </>
  );
}
