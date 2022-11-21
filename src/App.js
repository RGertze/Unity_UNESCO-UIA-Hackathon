import './App.css';
import { Dashboard } from './components/dashboard/dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavigationBar } from './components/navbar/navbar';
import { Login } from './components/login/login';
import { useState } from 'react';
import { SignUp } from './components/sign-up/signup';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">

        <NavigationBar loggedIn={loggedIn} logout={() => setLoggedIn(false)} />

        <Routes>
          <Route path="/" element={<Login login={setLoggedIn} />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/home" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
