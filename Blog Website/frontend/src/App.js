import './App.css';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Footer from './Components/Footer';
import Header from './Components/Header';
import Signup from './Components/Pages/Signup';
import Signin from './Components/Pages/Signin';
import Error from './Components/Pages/Error'

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
        path: '/'
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
