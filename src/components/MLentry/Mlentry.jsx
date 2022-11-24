import Axios from "axios";
import { useState } from "react";
import { Button, Form, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ElecPic from "../dash-board-metric/energy.png";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

import { tempUser } from "../../temp-data/users";
import { Flower1 } from "react-bootstrap-icons";

export const MLentry = (props) => {

    const [f1, setf1] = useState("");
    const [f2, setf2] = useState("");
    const [f3, setf3] = useState("");

    const navigate = useNavigate();

    const proceed = () => {
        
        if (f1 === "") {
            alert("enter a orga");
            return;
        }

        if (f2 === "") {
            alert("enter a f2");
            return;
        }

        if (f3 === "") {
            alert("enter a f3");
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'?
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
          },
            body: JSON.stringify({
                 range: f1,
                 zto60: f2,
                kithna_door:f3
            })
        };
        fetch('https://c76c-103-177-203-246.in.ngrok.io/hellopost', requestOptions)
            .then(response => console.log(response.json()))
            .then(data => console.log(data));       
    }
    

    return (
        
        <div className="vert-flex justify-center" style={{ height: "60vh", alignItems: "center" }}>
            <Navbar />
            <div style={{
                width: "70%",
                height: "440px",
                display: "grid",
                gridTemplateColumns: "100% 1fr",
                alignItems: "center"
            }} className="rounded border p-3">
                <Form>
                    <h1 className="m-3">Machine Learning Entry</h1>
                    <Form.Group style={{ marginBottom: "20px" }} className="w-75 hor-center">
                        <Form.Label>f1:</Form.Label>
                        <Form.Control type="text" value={f1} onChange={(e) => setf1(e.target.value)} placeholder={"f1"} required/>
                    </Form.Group>
                    <Form.Group style={{ marginBottom: "20px" }} className="w-75 hor-center">
                        <Form.Label>f2:</Form.Label>
                        <Form.Control type="text" value={f2} onChange={(e) => setf2(e.target.value)} placeholder={"f2"} required/>
                    </Form.Group>
                    <Form.Group className="w-75 hor-center">
                        <Form.Label>f3:</Form.Label>
                        <Form.Control type="text" value={f3} onChange={(e) => setf3(e.target.value)} placeholder={"f3"} />
                    </Form.Group>

                    <Form.Group className="p-3">
                        <Button style={{ marginBottom: "20px" }} variant="success" onClick={() => proceed()}>Proceed</Button>
                    </Form.Group>
                </Form>

                
            </div>

        </div>
    );
}