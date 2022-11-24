

import { useEffect, useState } from "react";
import { Offcanvas, Tab, Tabs } from "react-bootstrap";
import "./notifications.css";

export const NotificationsComponent = (props) => {

    const [allNotifications, setAllNotifications] = useState([
        {
            value: "Challenge 1",
            points: 200,
            reward: "N$ 300.00 Voucher to Spur",
            difficulty: 3
        },
        {
            value: "Challenge 2",
            points: 50,
            reward: "Slab of chocolate",
            difficulty: 1
        },
        {
            value: "Challenge 3",
            points: 120,
            reward: "New Stationery",
            difficulty: 2
        },
    ]);
    const [tabKey, initTabKey] = useState('challenges');

    return (
        <Offcanvas show={props.show} onHide={() => {
            props.hide();
        }} placement={"end"}>

            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Notifications</Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
                <Tabs activeKey={tabKey} onSelect={(e) => initTabKey(e ? e : "new")}>
                    <Tab className="notifications-new-tab" eventKey="challenges" title="Challenges">
                        {
                            allNotifications.map((notif, index) => {
                                return (
                                    <div className="notification border rounded p-2 m-2">
                                        <h3 className="p-2 rounded">{notif.value}</h3>
                                        <h4 style={{ color: "#444" }}>Points needed: <b>{notif.points}</b></h4>
                                        <div className="notification-reward shadow rounded p-3">
                                            <h4>Reward:</h4>
                                            <p>{notif.reward}</p>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </Tab>
                    <Tab className="notifications-all-tab" eventKey="events" title="Events">

                    </Tab>
                </Tabs>
            </Offcanvas.Body>

        </Offcanvas>
    );
}
