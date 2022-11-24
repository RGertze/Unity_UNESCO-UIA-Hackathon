import Axios from "axios";
import { useState } from "react";
import { Button, Form, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ElecPic from "../dash-board-metric/energy.png";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

import { tempUser } from "../../temp-data/users";

export const DashboardInput = (props) => {

    const [organisation, setOrganisation] = useState("");
    const [consumerID, setConsumerID] = useState("");
    const [EmployeeID, setEmployeeID] = useState("");

    const navigate = useNavigate();

    const proceed = () => {
        
        if (organisation === "") {
            alert("Enter Organization!");
            return;
        }

        if (consumerID === "") {
            alert("Enter Consumer ID");
            return;
        }

        if (EmployeeID === "") {
            alert("Enter Employee ID");
            return;
        }

        navigate("/dashboard")        
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
                    <h1 className="m-3">User Organization</h1>
                    <Form.Group style={{ marginBottom: "20px" }} className="w-75 hor-center">
                        <Form.Label>Organization :</Form.Label>
                        <Form.Select  value={organisation} onChange={(e) => setOrganisation(e.target.value)} placeholder={"organisation"} >
                            <option>Select Organization</option> 
                            <option>Department of Energy</option>    
                            <option>Department of Agriculture</option>    
                            <option>Department of Industries</option>    
                        </ Form.Select>
                    </Form.Group>
                    <Form.Group style={{ marginBottom: "20px" }} className="w-75 hor-center">
                        <Form.Label>Consumer ID:</Form.Label>
                        <Form.Control type="text" value={consumerID} onChange={(e) => setConsumerID(e.target.value)} placeholder={"Enter Consumer ID"} required/>
                    </Form.Group>
                    <Form.Group className="w-75 hor-center">
                        <Form.Label>Employee ID:</Form.Label>
                        <Form.Control type="text" value={EmployeeID} onChange={(e) => setEmployeeID(e.target.value)} placeholder={"Enter Employee ID"} required/>
                    </Form.Group>

                    <Form.Group className="p-3">
                        <Button style={{ marginBottom: "20px" }} variant="success" onClick={() => proceed()}>Proceed</Button>
                    </Form.Group>
                </Form>

                
            </div>

        </div>
    );
}