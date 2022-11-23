import { useState } from "react";
import { Button, Form} from "react-bootstrap";
import { useNavigate , Link} from "react-router-dom";
import {SidebarMenu} from 'react-bootstrap-sidebar-menu';

export const Sidebar = (props) => {
    return (
    <div className="d-flex min-vh-100">
    <div style={{
        flex: "1 0 auto",
    }} className="d-none d-sm-none d-md-none d-lg-block d-xl-block d-xxl-block">
        <ul className="list-unstyled components">
            <li className="navbar-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="navbar-item">
              <button to="/" className="nav-link">About</button>
            </li>
            <li className="navbar-item">
              <button to="/" className="nav-link">Terms</button>
            </li>
        </ul>
      </div>
    </div>
            )
}