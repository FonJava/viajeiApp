import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav.jsx";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          Você viaja pelo mundo.
          <br />O Viajei guarda suas aventuras.
        </h1>
        <h2>
          Um mapa-múndi que registra seus passos em cada cidade que você visita.
          Nunca se esqueça das suas experiências e mostre aos seus amigos por
          onde você passou.
        </h2>
        <Link to="/login" className="cta">
          Começar a registrar
        </Link>
      </section>
    </main>
  );
}
