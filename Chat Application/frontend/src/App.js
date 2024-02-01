import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './Components/Screens/Home';
import Chat from './Components/Screens/Chat';
import ChatProvider from './Context/ChatProvider';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <ChatProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/chats' element={<Chat />} />
          </Routes>
        </ChatProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
