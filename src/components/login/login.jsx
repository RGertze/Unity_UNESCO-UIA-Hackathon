import Axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import InputGroup from 'react-bootstrap/InputGroup';

import "./login.css";

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'


import ElecPic from "../dash-board-metric/elec.png";

import MainImg from "./Group 105.png";
import LightBulb from "./Group 109.png";
import User from "./image 1.png";
import Lock from "./Path 114.png";
import Google from "./Group 110.png";
import Apple from "./Path 115.png";

import { tempUser } from "../../temp-data/users";


export const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const login = async () => {
        if (email === "") {
            alert("enter an email");
            return;
        }
        if (password === "") {
            alert("enter a password");
            return;
        }

        // temp logic until api is available
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
            console.log(res.user);
            props.login(true);
            navigate("/home");
        })
        .catch((err) => {
            alert(err.message)
            console.log(err.code)
            console.log(err.message)
            return;
        })

        

        
    }

    return (
        <div className="login-page">

            <div className="login-image">
                <img src={MainImg} alt="" />

                <h4>"When the Sun is bright, say no to tube light"</h4>
            </div>

            <div className="login-form-container">
                <div style={{
                }} className="login-form  p-3">

                    <img className="login-bulb" src={LightBulb} alt="" />

                    <Form>
                        <Form.Group style={{ marginBottom: "20px" }} className="w-75 hor-center">
                            <InputGroup>
                                <InputGroup.Text style={{ backgroundColor: "white" }}>
                                    <img src={User} alt="" srcset="" />
                                </InputGroup.Text>
                                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={"email"} />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="w-75 hor-center">
                            <InputGroup>
                                <InputGroup.Text style={{ backgroundColor: "white" }}>
                                    <img src={Lock} alt="" srcset="" />
                                </InputGroup.Text>
                                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={"password"} />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="p-3">
                            <Button variant="success" onClick={() => login()}>Login</Button>
                        </Form.Group>
                    </Form>

                    <p className="hover">Forgot password?</p>

                    <div className="hor-center hover login-sign-in">Sign In</div>
                    <p>---Or---</p>
                    <h5>Continue with</h5>
                    <div className="hor-center login-other-logins vert-flex">
                        <div className="hover">
                            <img src={Google} width={42.5} height={50} alt="" />
                        </div>
                        <div className="hover">
                            <img src={Apple} width={42.5} height={50} alt="" />
                        </div>
                    </div>

                    <hr className="hor-center" style={{ width: "50%" }} />

                    <h5>New here? <b className="hover">Register</b></h5>
                </div>

                <p className="login-terms">By signing in you accept our Privacy Policy, Terms & Licensing Agreement</p>
            </div>

        </div>
    );
}