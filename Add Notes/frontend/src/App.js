import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Components/Pages/Home';
import Signin from './Components/Pages/Signin';
import Signup from './Components/Pages/Signup';

const AppLayout = () => {
  return(
    <>
      <Header />
      <Outlet />
      <Footer/>
    </>
  )
}

const appRouter = createBrowserRouter([
  {
    path: '/',
    element:<AppLayout />,
    children:[
      {
        path: "/",
        element: <Home />
      }
    ]
  },
  {
    path: '/signin',
    element: <Signin />
  },
  {
    path :'/signup',
    element: <Signup />
  }
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={appRouter}/>
    </div>
  );
}

export default App;
