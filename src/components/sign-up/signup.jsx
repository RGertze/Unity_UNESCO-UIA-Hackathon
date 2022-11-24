import Axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import InputGroup from 'react-bootstrap/InputGroup';
import "./signup.css";

import ElecPic from "../dash-board-metric/energy.png";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

import { tempUser } from "../../temp-data/users";
import LightBulb from "./Group 109.png";
import MainImg from "./Group 180.png";
import Email from "./Group.png";
import User from "./image 1.png";
import Lock from "../login/Path 114.png";
import Google from "../login/Group 110.png";
import Apple from "../login/Path 115.png";
import AppLogo from "../../assets/appLogo.png";

export const SignUp = (props) => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const signUp = async () => {
        if (email === "") {
            alert("Enter User Name!");
            return;
        }
        if (email === "") {
            alert("Enter Email ID");
            return;
        }
        if (password === "") {
            alert("Enter Password");
            return;
        }
        if (confirmPassword !== password) {
            alert("Passwords do not match!");
            return;
        }

        //  When api is ready use this 
        // -----------------------------
        // 
        // let result = await Axios.post("yourUrlHere", { email: email, password: password });
        // if (result.status === 201) {
        //     navigate("/");
        // }

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                console.log(res.user)
                navigate("/");
            })
            .catch((err) => {
                alert(err.message)
                console.log(err.code)
                console.log(err.message)
            })
    }

    return (
        <div className="sign-up-page">
            <div className="sign-up-form-container">
                <div style={{
                }} className="sign-up-form  p-3">
                    <img className="login-bulb" src={AppLogo} alt="" />
                    <Form>
                        <Form.Group style={{ marginBottom: "20px" }} className="w-75 hor-center">
                            <InputGroup>
                                <InputGroup.Text style={{ backgroundColor: "white" }}>
                                    <img src={User} alt="" srcset="" />
                                </InputGroup.Text>
                                <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder={"Enter User Name"} />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group style={{ marginBottom: "20px" }} className="w-75 hor-center">
                            <InputGroup>
                                <InputGroup.Text style={{ backgroundColor: "white" }}>
                                    <img src={Email} alt="" srcset="" />
                                </InputGroup.Text>
                                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={"Enter Email ID"} />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group style={{ marginBottom: "20px" }} className="w-75 hor-center">
                            <InputGroup>
                                <InputGroup.Text style={{ backgroundColor: "white" }}>
                                    <img src={Lock} alt="" srcset="" />
                                </InputGroup.Text>
                                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={"Enter Password"} />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="w-75 hor-center">
                            <InputGroup>
                                <InputGroup.Text style={{ backgroundColor: "white" }}>
                                    <img src={Lock} alt="" srcset="" />
                                </InputGroup.Text>
                                <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder={"Confirm Password"} />
                            </InputGroup>
                        </Form.Group>
                    </Form>
                    <div className="hor-center hover sign-in-btn" onClick={() => signUp()}>Sign Up</div>


                    <hr className="hor-center" style={{ width: "50%" }} />

                    <h5>Already have an account? <b className="hover" onClick={() => navigate("/")}>Login</b></h5>
                </div>
                <div className="hor-center sign-up-other-sign-ups vert-flex">
                    <div className="hover vert-flex">
                        <img src={Google} width={30} height={35} alt="" onClick={() => { }} />
                        <p>Sign up with Google</p>
                    </div>
                    <div className="hover vert-flex">
                        <img src={Apple} width={30} height={35} alt="" />
                        <p>Sign up with Apple</p>
                    </div>
                </div>
            </div>
            <div className="sign-up-image">
                <img src={MainImg} alt="" />
            </div>
        </div>
    );
}