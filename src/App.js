import { useState } from 'react';
import './App.css';
import SignIn from './pages/SignIn.js';
import Content from './pages/Content.js';

function App() {
  const [token, setToken] = useState();

  if (!token) {
    return <SignIn setToken={setToken}></SignIn>;
  }
  return <Content token={token}>Welcome!</Content>;
}

export default App;
