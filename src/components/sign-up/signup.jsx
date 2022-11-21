import Axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import ElecPic from "../dash-board-metric/energy.png";

import { tempUser } from "../../temp-data/users";

export const SignUp = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const signUp = async () => {
        if (email === "") {
            alert("enter an email");
            return;
        }
        if (password === "") {
            alert("enter a password");
            return;
        }
        if (confirmPassword !== password) {
            alert("passwords do not match");
            return;
        }

        //  When api is ready use this 
        // -----------------------------
        // 
        // let result = await Axios.post("yourUrlHere", { email: email, password: password });
        // if (result.status === 201) {
        //     navigate("/");
        // }


        // temp check until api is available
        if (email === tempUser.email) {
            alert("user already exists!");
            return;
        }

        navigate("/");
    }

    return (
        <div className="vert-flex justify-center" style={{ height: "60vh", alignItems: "center" }}>

            <div style={{
                width: "70%",
                height: "440px",
                display: "grid",
                gridTemplateColumns: "60% 1fr",
                alignItems: "center"
            }} className="rounded border p-3">
                <Form>
                    <h1 className="m-3">Sign Up</h1>
                    <Form.Group style={{ marginBottom: "20px" }} className="w-75 hor-center">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={"email"} />
                    </Form.Group>
                    <Form.Group style={{ marginBottom: "20px" }} className="w-75 hor-center">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={"password"} />
                    </Form.Group>
                    <Form.Group className="w-75 hor-center">
                        <Form.Label>Confirm Password:</Form.Label>
                        <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder={"confirm password"} />
                    </Form.Group>

                    <Form.Group className="p-3">
                        <Button style={{ marginBottom: "20px" }} variant="success" onClick={() => signUp()}>Sign Up</Button>
                    </Form.Group>
                </Form>

                <div>
                    <img src={ElecPic} width="300px" alt="" />
                </div>
            </div>

        </div>
    );
}