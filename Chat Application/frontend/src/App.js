import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './Components/Screens/Home';


const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='chat' />
    </Routes>
  )
}

const AppLayout = () => {
  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  )
}

function App() {
  return (
    <div className="App">
      <AppLayout />
    </div>
  );
}

export default App;
