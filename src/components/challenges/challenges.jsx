import Axios from "axios";
import { useState } from "react";
import { Button, Form, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ElecPic from "../dash-board-metric/energy.png";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import Typography from '@mui/material/Typography';

import { tempUser } from "../../temp-data/users";
import { ChallengeCard } from "../post/post";

export const Challenge = (props) => {
    

    return (
        
        <div className="vert-flex justify-center" style={{ height: "60vh", alignItems: "center" }}>
            <Typography></Typography>
            <ChallengeCard />
            <ChallengeCard />
            <ChallengeCard />

        </div>
    );
}