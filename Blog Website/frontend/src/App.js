import './App.css';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Footer from './Components/Footer';
import Header from './Components/Header';
import Signup from './Components/Pages/Signup';
import Signin from './Components/Pages/Signin';
import Error from './Components/Pages/Error'
import Home from './Components/Pages/Home';
import SingleBlog from './Components/Pages/SingleBlog';
import AuthContextProvider from './Context/AuthContext';
import WriteBlog from './Components/Pages/WriteBlog';
import OurBlogs from './Components/Pages/OurBlogs';

const AppLayout = () => {
  return (
    <AuthContextProvider>
      <Header />
      <Outlet />
      <Footer />
    </AuthContextProvider>
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
      },
      {
        path: '/writeBlog',
        element: <WriteBlog />
      },
      {
        path : '/ourBlogs',
        element: <OurBlogs />
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
