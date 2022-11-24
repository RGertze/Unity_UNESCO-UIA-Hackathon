import Axios from "axios";
import { useState } from "react";
import { Button, Form, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ElecPic from "../dash-board-metric/energy.png";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

import { tempUser } from "../../temp-data/users";
export const MLentry = (props) => {

    const [f1, setf1] = useState("");
    const [f2, setf2] = useState("");
    const [f3, setf3] = useState("");
    const [f4, setf4] = useState("");

    const navigate = useNavigate();

    const proceed = () => {

        if (f1 === "") {
            alert("Enter Range!");
            return;
        }

        if (f2 === "") {
            alert("Enter Pick-Up Speed!");
            return;
        }

        if (f3 === "") {
            alert("Enter Mileage!");
            return;
        }

        console.log(JSON.stringify({
            range: parseInt(f1),
            zto60: parseInt(f2),
            kithna_door: parseInt(f3)
        }));

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
            },
            body: JSON.stringify({
                "range": parseInt(f1),
                "zto60": parseInt(f2),
                "kithna_door": parseInt(f3)
            })
        };
        fetch('https://bbe5-103-177-203-246.in.ngrok.io/hellopost', requestOptions)
            .then(response => console.log(response))
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.log(error);
            });

        // if(f1<200){setf4(400);}
        // else if(f1<350){setf4(1000);}
        // else {setf4(5000);}
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
                    <h1 className="m-3">Prediction Model for EV's</h1>
                    <Form.Group style={{ marginBottom: "20px" }} className="w-75 hor-center">
                        <Form.Label>Range:</Form.Label>
                        <Form.Control type="text" value={f1} onChange={(e) => setf1(e.target.value)} placeholder={"Enter Range"} required />
                    </Form.Group>
                    <Form.Group style={{ marginBottom: "20px" }} className="w-75 hor-center">
                        <Form.Label>Pick-Up Speed:</Form.Label>
                        <Form.Control type="text" value={f2} onChange={(e) => setf2(e.target.value)} placeholder={"Enter Pick-Up Speed"} required />
                    </Form.Group>
                    <Form.Group className="w-75 hor-center">
                        <Form.Label>Mileage:</Form.Label>
                        <Form.Control type="text" value={f3} onChange={(e) => setf3(e.target.value)} placeholder={"Enter Mileage"} />
                    </Form.Group>

                    <Form.Group className="p-3">
                        <Button style={{ marginBottom: "20px" }} variant="success" onClick={() => proceed()}>Proceed</Button>
                    </Form.Group>
                    <Form.Group className="w-75 hor-center"><br />
                        <Form.Label>Number of Electric Vehicles:</Form.Label>
                        <Form.Control type="text" value={f4} onChange={(e) => setf4(e.target.value)} disabled />
                    </Form.Group>
                </Form>


            </div>

        </div>
    );
}