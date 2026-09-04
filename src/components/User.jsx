import styles from "./User.module.css";
import { useAuth } from "../contexts/FakeAuthContext.jsx";
import { useNavigate } from "react-router-dom";

function User() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    logout();
    navigate("/", { replace: true });
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Olá, {user.name}</span>
      <button onClick={handleClick}>Sair</button>
    </div>
  );
}

export default User;

/*
CHALLENGE

1) Adicione `AuthProvider` ao `App.jsx`
2) Na página `Login.jsx`, chame `login()` pelo contexto
3) Dentro de um efeito, verifique se `isAuthenticated === true`. Se sim, navegue para `/app`
4) Em `User.js`, leia e exiba o usuário conectado pelo contexto (`user`). Inclua este componente em `AppLayout.js`
5) Faça o botão de saída chamar `logout()` e navegar de volta para `/`
*/
