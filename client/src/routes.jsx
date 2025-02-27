import Home from './components/Home';
import Welcome from './components/Welcome';

const routes = [
  {
    path: '/',
    element: <Welcome/>
  },
  {
    path: '/home',
    element: <Home/>
  }
]

export default routes;