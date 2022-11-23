import { useState } from "react";
import { Button, Form, Dropdown } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";

export const DashboardInput = (props) => {

    const [organisation, setOrganisation] = useState("");
    const [employerID, setEmployerID] = useState("");
    const [consumerID, setConsumerID] = useState("");
    const navigate = useNavigate();

    const proceed = () => {
        if (employerID === "") {
            alert("enter a employerID");
            return;
        }
        if (consumerID === "") {
            alert("enter a consumerID");
            return;
        }

        navigate('/dashboard');
    }

    return (
        <div className="dashboardInput">

            
            
            <div className="">
                <Form>
                    <h1 className="m-3"></h1>
                    <Form.Group style={{ marginBottom: "20px" }} className="w-75 hor-center">
                        <Form.Label>Organisation</Form.Label>
                        <Form.Select  value={organisation} onChange={(e) => setOrganisation(e.target.value)} placeholder={"organisation"}>
                            <option>org1</option> 
                            <option>org2</option> 
                            <option>org3</option>    
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="w-75 hor-center">
                        <Form.Label>Employer ID</Form.Label>
                        <Form.Control type="text" value={employerID} onChange={(e) => setEmployerID(e.target.value)} placeholder={"employerID"} />
                    </Form.Group>
                    <Form.Group className="w-75 hor-center">
                        <Form.Label>Consumer ID</Form.Label>
                        <Form.Control type="text" value={consumerID} onChange={(e) => setConsumerID(e.target.value)} placeholder={"consumerID"} />
                    </Form.Group>

                    <Form.Group className="p-3">
                        <Button variant="success" onClick={() => proceed()}>Proceed</Button>
                    </Form.Group>
                </Form>
            </div>

        </div>
    );
}