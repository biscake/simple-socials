import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [text, setText] = useState();
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.post('http://localhost:3000/api/users/logout')
      .then(res => {
        console.log(res);
        return navigate('/');
      })
      .catch(err => {
        console.log(err)
      });
  }

  useEffect(() => {
    axios.get('http://localhost:3000/api/posts')
      .then(res => setText('authorized'))
      .catch(err => setText('unauthorized'))
  }, [])

  return (
    <>
      <p>{text}</p>
      <button onClick={handleLogout}>log out</button>
    </>
  )
}

export default Home;