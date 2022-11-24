import { useEffect, useRef, useState } from "react";
import "./dashboardMetric.css"

import ElecPic from "../../assets/Group.png";
import SolarPic from "../../assets/Group (1).png";
import EVPic from "../../assets/Group (2).png";
import BioPic from "../../assets/Group (3).png";
import { InfoCircle } from "react-bootstrap-icons";
import { Alert, ProgressBar } from "react-bootstrap";

export const M_Solar = 1;
export const M_Watts = 2;
export const M_Bio = 3;
export const EV = 4;

function getGreenToRed(percent) {
    let r = (percent * 255.00)
    let g = 300 - ((percent) * 255.00);
    return `rgb(${r},${g},0)`;
}


/**
 * represents a single dashboard metric item
 * @param {*} props - an object with the following properties
 *                  - title: string
 *                  - unit: string. eg kW, Joules etc
 *                  - value: number
 *                  - type: number --> one of the following types:
 *                      - M_Solar
 *                      - M_Watts
 *                      - M_Bio
 *                  - thresholds: number[] --> array of 2 numbers representing safe and warning amounts. Any amount greater than warning is in the danger zone
 *                      - index 0 -- max safe amount
 *                      - index 1 -- max warning amount
 * 
 * @returns react component 
 */
export const DashboardMetric = (props) => {

    const [img, setImg] = useState();
    const [valueColor, setValueColor] = useState("");

    const prog1 = useRef();
    let counter = 0;

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        switch (props.type) {
            case M_Solar:
                setImg(SolarPic);
                break;
            case EV:
                setImg(EVPic);
                break;
            case M_Watts:
                setImg(ElecPic);
                break;
            case M_Bio:
                setImg(BioPic);
                break;
        }

        let valCol = "#00ff00";
        if (props.value > props.thresholds[0])
            valCol = "#ffcc00"
        if (props.value > props.thresholds[1])
            valCol = "#ff0000"
        setValueColor(valCol);
    }

    return (
        <div className="rounded border metric col-sm">
            <div className="vert-flex align-center space-evenly w-100">
                <h2 className="rounded metric-title">{props.title} </h2>
                <div className="metric-popup-container">
                    <InfoCircle width={30} height={30} className="hover metric-popup-trigger" />
                    <div className="metric-popup border rounded p-3">
                        <h4><b style={{ color: "#008800" }} >10</b> Points Per {props.unit} Under {props.thresholds[0]} </h4>
                        <h4><b style={{ color: "#888800" }} >5</b> Points Per {props.unit} Under {props.thresholds[1]} </h4>
                        {
                            (props.value < props.thresholds[0]) &&
                            <Alert variant="success">You are in the green! Keep up the amazing work!</Alert>
                        }
                        {
                            (props.value < props.thresholds[1] && props.value > props.thresholds[0]) &&
                            <Alert variant="warning">You're doing great! But try to lower your usage to below {props.thresholds[0]} {props.unit}!</Alert>
                        }
                        {
                            (props.value > props.thresholds[1]) &&
                            <Alert variant="danger">Your usage is above {props.thresholds[1]} {props.unit}! This is an excessive amount! Try to lower it. </Alert>
                        }
                    </div>
                </div>
            </div>
            <img className="metric-img m-4" src={img} alt="a very important pic" />
            <div className="vert-flex space-evenly w-75">
                <h3 style={{ color: valueColor }}><b>{props.value}</b></h3>
                <h2 onClick={() => {
                    counter += 0.1;
                    var elem = prog1.current;
                    elem.style.background = getGreenToRed(counter);
                }}>{props.unit}</h2>
            </div>

            <div style={{ width: "250px" }}>
                <ProgressBar>
                    <ProgressBar style={{ background: getGreenToRed((props.value / props.thresholds[1])) }} variant="" now={(props.value / props.thresholds[1]) * 100} key={1} />
                </ProgressBar>
            </div>
        </div>
    )
}