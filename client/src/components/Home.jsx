import axios from "axios";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    axios.get('http://localhost:3000/api/posts', { withCredentials: true })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  })
  return (
    <p>Temp</p>
  )
}

export default Home;