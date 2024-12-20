import Home from './components/Home';
import Signup from './components/forms/SignupForm';

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