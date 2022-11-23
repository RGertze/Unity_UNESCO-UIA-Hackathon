import Axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

import ElecPic from "../dash-board-metric/elec.png";

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

        //  When api is ready use this 
        // -----------------------------
        // 
        // let result = await Axios.post("yourUrlHere", { email: email, password: password });
        // if (result.status === 201) {
        //     navigate("/home");
        // }

        // temp logic until api is available
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
            console.log(res.user)
        })
        .catch((err) => {
            alert(err.message)
            console.log(err.code)
            console.log(err.message)
        })

        // temp check until api is available
        if (email === tempUser.email) {
            alert("user already exists!");
            return;
        }

        props.login(true);

        navigate("/home");
    }

    return (
        <div className="vert-flex justify-center" style={{ height: "50vh", alignItems: "center" }}>

            <div style={{
                width: "70%",
                height: "400px",
                display: "grid",
                gridTemplateColumns: "60% 1fr",
                alignItems: "center"
            }} className="rounded border p-3">
                <Form>
                    <h1 className="m-3">Login</h1>
                    <Form.Group style={{ marginBottom: "20px" }} className="w-75 hor-center">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={"email"} />
                    </Form.Group>
                    <Form.Group className="w-75 hor-center">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={"password"} />
                    </Form.Group>

                    <Form.Group className="p-3">
                        <Button variant="success" onClick={() => login()}>Login</Button>
                    </Form.Group>
                </Form>

                <div>
                    <img src={ElecPic} alt="" />
                </div>
            </div>

        </div>
    );
}