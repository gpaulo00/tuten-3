import { useState } from 'react';
import './App.css';
import SignIn from './pages/SignIn.js';

function App() {
  const [token, setToken] = useState();

  if (!token) {
    return <SignIn setToken={setToken}></SignIn>;
  }
  return (
    <div>Welcome!</div>
  );
}

export default App;
