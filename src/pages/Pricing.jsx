// Uses the same styles as Product
import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <div>
          <h2>
            Preço simples.
            <br />
            Apenas US$ 9/mês.
          </h2>
          <p>
            Tudo o que você precisa para organizar suas viagens por um preço
            direto e transparente.
          </p>
        </div>
        <img
          src="https://img.freepik.com/free-photo/traveling-concept-with-world-map_23-2149153259.jpg"
          alt="mapa-múndi e elementos de viagem"
        />
      </section>
    </main>
  );
}
