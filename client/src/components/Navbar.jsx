import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../assets/navbar.module.css";


const Navbar = () => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    axios.get('/api/getAll').then(res => setData(res.data));
  })

  return (
    <div className={styles.navbar}>
      <header className="App-header">
        <p>{!data ? "Loading..." : data.test}</p>
      </header>
    </div>
  );
}

export default Navbar;