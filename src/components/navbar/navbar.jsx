import { useState } from "react";
import { Navbar, Container, Nav, NavLink, Button } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { getAuth, signOut } from "firebase/auth";

import Logo from "./logo.jpg";

export const NavigationBar = (props) => {

    const [toggled, setToggled] = useState(false);
    const navigate = useNavigate();

    return (
        <Navbar className="rounded" bg="dark" expand="lg" onToggle={setToggled}>
            <Container>
                <Navbar.Toggle />
                <Navbar.Brand style={{ color: "white" }}>
                    <img className="rounded" src={Logo} alt="An awesome logo" style={{ width: "30px", height: "30px", marginRight: "20px" }} />
                    Your App Name Here
                </Navbar.Brand>
                <Navbar.Collapse>
                    {
                        props.loggedIn &&
                        <>
                            <Nav>
                                <NavLink to="/home" as={Link} style={{ color: "white" }}>Home</NavLink>
                            </Nav>
                            <Nav>
                                <NavLink to="/announcements" as={Link} style={{ color: "white" }}>Announcements</NavLink>
                            </Nav>
                        </>
                    }
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Nav >
                        {
                            !props.loggedIn &&
                            <>
                                <Button style={{ marginRight: "20px" }} variant="light" onClick={() => navigate("/register")}>Sign Up</Button>
                                <Button variant="success" onClick={() => navigate("/")}>Login</Button>
                            </>
                        }
                        {
                            props.loggedIn &&
                            <Button variant="primary" onClick={() => {
                                props.logout();
                                const auth = getAuth();
                                signOut(auth).then(() => {
                                    navigate("/");
                                }).catch((error) => {
                                    // An error happened.
                                });
                                navigate("/");
                            }}>Logout</Button>
                        }
                    </Nav>
                </Navbar.Collapse>

            </Container>
        </Navbar>
    )
}