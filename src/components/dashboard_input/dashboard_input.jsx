import Axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { sidebar } from "../sidebar/sidebar";
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
            alert("enter a orga");
            return;
        }

        if (consumerID === "") {
            alert("enter a consumerID");
            return;
        }

        if (EmployeeID === "") {
            alert("enter a EMployeeID");
            return;
        }

        navigate("dashboard")        
    }
    

    return (
        
        <div className="vert-flex justify-center" style={{ height: "60vh", alignItems: "center" }}>
            <sidebar />
            <div style={{
                width: "70%",
                height: "440px",
                display: "grid",
                gridTemplateColumns: "100% 1fr",
                alignItems: "center"
            }} className="rounded border p-3">
                <Form>
                    <h1 className="m-3">User Organisation</h1>
                    <Form.Group style={{ marginBottom: "20px" }} className="w-75 hor-center">
                        <Form.Label>Organisation :</Form.Label>
                        <Form.Select  value={organisation} onChange={(e) => setOrganisation(e.target.value)} placeholder={"organisation"} >
                            <option></option> 
                            <option>orga1</option>    
                            <option>orga2</option>    
                            <option>orga3</option>    
                        </ Form.Select>
                    </Form.Group>
                    <Form.Group style={{ marginBottom: "20px" }} className="w-75 hor-center">
                        <Form.Label>consumerID:</Form.Label>
                        <Form.Control type="text" value={consumerID} onChange={(e) => setConsumerID(e.target.value)} placeholder={"consumerID"} required/>
                    </Form.Group>
                    <Form.Group className="w-75 hor-center">
                        <Form.Label>EmployeeID:</Form.Label>
                        <Form.Control type="text" value={EmployeeID} onChange={(e) => setEmployeeID(e.target.value)} placeholder={"EmployeeID"} />
                    </Form.Group>

                    <Form.Group className="p-3">
                        <Button style={{ marginBottom: "20px" }} variant="success" onClick={() => proceed()}>Proceed</Button>
                    </Form.Group>
                </Form>

                
            </div>

        </div>
    );
}