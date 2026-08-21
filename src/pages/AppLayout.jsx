import Map from "../components/Map.jsx";
import Sidebar from "../components/Sidebar.jsx";
import User from "../components/User.jsx";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.app}>
      <User />
      <Sidebar />
      <Map />
    </div>
  );
}

export default AppLayout;
