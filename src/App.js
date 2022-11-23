import './App.css';
import { Dashboard } from './components/dashboard/dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavigationBar } from './components/navbar/navbar';
import { Login } from './components/login/login';
import { useState } from 'react';
import { SignUp } from './components/sign-up/signup';
import { initializeApp } from "firebase/app";
import { DashboardInput } from './components/dashboard-input/dashboard-input';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">

        <NavigationBar loggedIn={loggedIn} logout={() => setLoggedIn(false)} />

        <Routes>
          <Route path="/" element={<Login login={setLoggedIn} />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/home" element={<DashboardInput />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

const firebaseConfig = {
  apiKey: "AIzaSyAVW1vv06JC1mLfCKklUw1mIqNqRifm3ps",
  authDomain: "unesco-unity.firebaseapp.com",
  projectId: "unesco-unity",
  storageBucket: "unesco-unity.appspot.com",
  messagingSenderId: "307513823457",
  appId: "1:307513823457:web:f00d4d8571d51b29d167a0",
  measurementId: "G-5VPGG2M1J6"
};

export default App;
export const app = initializeApp(firebaseConfig);