import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <img
          src="https://img.freepik.com/free-photo/portrait-handsome-man-smiling_23-2148868324.jpg"
          alt="viajante observando uma paisagem de montanhas"
          /*  */
        />
        <div>
          <h2>Sobre o Viajei.</h2>
          <p>
            O Viajei ajuda você a guardar cada lembrança da estrada em um só
            lugar. Registre cidades, países e as histórias que tornam cada
            viagem especial.
          </p>
          <p>
            Consulte suas descobertas no mapa e reviva o caminho percorrido
            sempre que quiser.
          </p>
        </div>
      </section>
    </main>
  );
}
