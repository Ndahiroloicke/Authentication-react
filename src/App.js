import React from 'react';
import Login from './login';
import Register from './register';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';

const routes = [
  {
    path:"/login",
    element: <Login/>,
  },
  {
    path:"/register",
    element:<Register/>
  }
]

const router = createBrowserRouter(routes)

const App = () => {
  return (
   <div>
    <RouterProvider router={router}/>
   </div>
  );
}

export default App;
