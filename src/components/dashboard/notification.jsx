import React, { Component } from "react";
import { MDBNotification } from "mdbreact";

class Notification extends Component {
    render() {
        return (
            <MDBNotification
                autohide={3000} // by default = ∞ ms
                bodyClassName="p-5 font-weight-bold white-text"
                className="stylish-color-dark"
                closeClassName="blue-grey-text"
                fade
                icon="bell"
                iconClassName="blue-grey-text"
                message="Reduce your energy usage by 10% then you will receive a voucher for 20% off your next electricity bill."
                show
                text="11 mins ago"
                title="Bootstrap"
                titleClassName="elegant-color-dark white-text"
            />
        );
    }
}

export default Notification;