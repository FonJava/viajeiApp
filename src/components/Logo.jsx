import styles from "./Logo.module.css";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <span className={styles.logo}>Viajei</span>
    </Link>
  );
}

export default Logo;
