import './App.css';
import { Routes, Route, BrowserRouter, Router } from 'react-router-dom'
import Home from './Components/Screens/Home';
import Chat from './Components/Screens/Chat';
import ChatProvider from './Context/ChatProvider';


const Routing = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/chats' element={<Chat />} />
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
      <ChatProvider>
        <AppLayout />
      </ChatProvider>
    </div>
  );
}

export default App;
