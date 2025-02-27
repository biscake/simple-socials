import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './assets/index.css';

import routes from "./routes.jsx";

axios.defaults.withCredentials = true;

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <div className='app-container'>
    <RouterProvider router={router} />
  </div>
  </React.StrictMode>,
)
