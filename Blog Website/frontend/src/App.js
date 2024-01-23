import './App.css';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Footer from './Components/Footer';
import Header from './Components/Header';
import Signup from './Components/Pages/Signup';
import Signin from './Components/Pages/Signin';
import Error from './Components/Pages/Error'
import Home from './Components/Pages/Home';
import SingleBlog from './Components/Pages/SingleBlog';

const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

const appRouter = createBrowserRouter([
  {
    path: '/signup',
    element:<Signup />,
    errorElement : <Error />
  },
  {
    path: '/signin',
    element:<Signin />,
    errorElement : <Error />
  },{
    path: '/',
    element: <AppLayout />,
    children:[
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/blog/:id',
        element: <SingleBlog />
      }
    ]
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
