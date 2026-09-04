import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";

function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/pricing">Preços</NavLink>
        </li>
        <li>
          <NavLink to="/product">Produto</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Entrar
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
