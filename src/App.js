import './App.css';
import { Dashboard } from './components/dashboard/dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavigationBar } from './components/navbar/navbar';
import { Login } from './components/login/login';
import { useEffect, useState } from 'react';
import { SignUp } from './components/sign-up/signup';
import { Achievements } from './components/achievements/achievements';
import { DashboardInput } from './components/DashboardInput/DashboardInput';
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { NotificationsComponent } from './components/notifications/notifications';
import { MLentry } from './components/MLentry/Mlentry';


const firebaseConfig = {
  apiKey: "AIzaSyAVW1vv06JC1mLfCKklUw1mIqNqRifm3ps",
  authDomain: "unesco-unity.firebaseapp.com",
  projectId: "unesco-unity",
  storageBucket: "unesco-unity.appspot.com",
  messagingSenderId: "307513823457",
  appId: "1:307513823457:web:f00d4d8571d51b29d167a0",
  measurementId: "G-5VPGG2M1J6"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        setUser(user);
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="App">

        {
          <NavigationBar loggedIn={loggedIn} logout={() => setLoggedIn(false)} showNotifications={() => setShowNotifications(true)} />
        }

        <NotificationsComponent show={showNotifications} hide={() => setShowNotifications(false)} />

        <Routes>
          <Route path="/" element={<Login login={setLoggedIn} />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/home" element={<DashboardInput />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/MLentry" element={<MLentry />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}


export default App;





