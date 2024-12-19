import Home from './components/Home';
import Signup from './components/forms/Signup';

const routes = [
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/sign-up',
    element: <Signup/>
  }
]

export default routes;