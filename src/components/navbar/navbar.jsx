import { useState } from "react";
import { Navbar, Container, Nav, NavLink, Button } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { getAuth, signOut } from "firebase/auth";
import "./navbar.css";

import Logo from "./logo.jpg";
import AppLogo from "../../assets/appLogo.png";
import { Bell } from "react-bootstrap-icons";

export const NavigationBar = (props) => {

    const [toggled, setToggled] = useState(false);
    const navigate = useNavigate();

    return (
        <Navbar className="navbar-custom" variant="" expand="lg" onToggle={setToggled}>
            <Container>
                <Navbar.Toggle />
                <Navbar.Brand style={{ color: "white" }}>
                    <img className="rounded" src={AppLogo} alt="An awesome logo" style={{ width: "120px", height: "35px", marginRight: "20px" }} />
                </Navbar.Brand>
                <Navbar.Collapse>
                    {
                        props.loggedIn &&
                        <>
                            <Nav>
                                <NavLink to="/home" as={Link} style={{ color: "black" }}>Home</NavLink>
                                <NavLink to="/dashboard" as={Link} style={{ color: "black" }}>Dashboard</NavLink>
                            </Nav>
                            <Nav>
                                <NavLink to="/achievements" as={Link} style={{ color: "black" }}>Achievements</NavLink>
                            </Nav>
                            <Nav>
                                <NavLink to="/MLentry" as={Link} style={{ color: "black" }}>ML</NavLink>
                            </Nav>
                        </>
                    }
                </Navbar.Collapse>
                {
                    props.loggedIn &&
                    <div className={`navbar-icons vert-flex space-evenly ${toggled && "hor-center"}`}>
                        <Nav >
                            <Bell style={{ width: 25, height: 25 }} onClick={() => props.showNotifications()} className={`hor-center hover`}></Bell>
                        </Nav>
                    </div>
                }
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