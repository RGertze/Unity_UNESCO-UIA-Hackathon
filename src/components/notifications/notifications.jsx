

import { useEffect, useState } from "react";
import { Offcanvas, Tab, Tabs } from "react-bootstrap";
import "./notifications.css";

export const NotificationsComponent = (props) => {

    const [allNotifications, setAllNotifications] = useState([
        {
            value: "hi"
        },
        {
            value: "hi 1"
        },
        {
            value: "hi 2"
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
                                        <h1>{notif.value}</h1>
                                        <h3>{notif.value}</h3>
                                        <h3>{notif.value}</h3>
                                        <h2>{notif.value}</h2>
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
