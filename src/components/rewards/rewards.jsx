import { useEffect, useState } from 'react';
import ArcProgress from 'react-arc-progress';
import { Check, X } from 'react-bootstrap-icons';

import "./rewards.css";


/**
 * rewards component
 * @param {*} props - an object with the following properties
 *                  - data: object[] - array of values to chart. Has the following fields
 *                      - day: string -- day of the month
 *                      - solarUsage: number -- solar power usage value
 *                      - electricUsage: number -- electricity usage value
 *                      - bioFuelUsage: number -- bio fuel usage value
 *                  - thresholds: [][] - array of arrays of threshold values for each energy type
 * 
 * @returns react component 
 */
export const Rewards = (props) => {

    const [points, setPoints] = useState(0);
    const [progress, setProgress] = useState(0);

    const [currentGoal, setCurrentGoal] = useState(-1);
    const [goals, setGoals] = useState([50, 100, 150, 200, 250, 300, 350, 400]);

    /**
     * if the points change, e.g from an API call or something,
     * the current goal as well as the current progress
     * is updated automatically
     */
    useEffect(() => {
        let newGoal = -1;
        let newProgress = 0.99999;
        for (let i = 0; i < goals.length; i++) {
            if (points < goals[i]) {
                newGoal = i;
                newProgress = (50 - (goals[i] - points)) / 50;
                break;
            }
        }
        setCurrentGoal(newGoal);
        setProgress(newProgress);
    }, [points]);

    useEffect(() => {
        calculatePoints();
    }, [props.data, props.thresholds]);

    const calculatePoints = async () => {
        let data = props.data[props.data.length - 1];
        let thresholds = props.thresholds;

        let totalPoints = 0;

        if (data.solarUsage < thresholds[0][0]) {
            totalPoints += (thresholds[0][0] - data.solarUsage) * 5;
        } else if (data.solarUsage < thresholds[0][1]) {
            totalPoints += (thresholds[0][1] - data.solarUsage) * 2;
        }
        if (data.electricUsage < thresholds[1][0]) {
            totalPoints += (thresholds[1][0] - data.electricUsage) * 5;
        } else if (data.electricUsage < thresholds[1][1]) {
            totalPoints += (thresholds[1][1] - data.electricUsage) * 2;
        }
        if (data.bioFuelUsage < thresholds[2][0]) {
            totalPoints += (thresholds[2][0] - data.bioFuelUsage) * 5;
        } else if (data.bioFuelUsage < thresholds[2][1]) {
            totalPoints += (thresholds[2][1] - data.bioFuelUsage) * 2;
        }
        if (data.evUsage < thresholds[3][0]) {
            totalPoints += (thresholds[3][0] - data.evUsage) * 5;
        } else if (data.evUsage < thresholds[3][1]) {
            totalPoints += (thresholds[3][1] - data.evUsage) * 2;
        }

        setPoints(totalPoints);
    }

    return (
        <div className="border rounded rewards">
            <h2 style={{ padding: 20 }}>Rewards</h2>

            <div className="hor-center reward-progress">
                <ArcProgress
                    className='hor-center'
                    progress={progress}
                    text={`${points} points`}

                />
                {
                    currentGoal >= 0 &&
                    <h4>Next reward at <b>{goals[currentGoal]}</b> points</h4>
                }
                {
                    currentGoal < 0 &&
                    <h4><b>All Goals Achieved</b></h4>
                }
            </div>

            <div className='reward-goals'>
                <h2>Goals:</h2>
                {
                    goals.map((goal, index) => {
                        return (
                            <div key={index} className='reward-goal hor-center border rounded ' style={{ backgroundColor: points > goal ? "#ddFFdd" : "white" }}>
                                <h4 className='vert-flex' style={{ alignItems: "center", padding: 0, margin: 0, textAlign: "center", width: "100%", justifyContent: "center" }}>{goal}</h4>
                                {
                                    points > goal &&
                                    <Check style={{ width: "50px", height: "50px", color: "#88FF88" }} />
                                }
                            </div>
                        );
                    })
                }
            </div>

        </div>
    );
}