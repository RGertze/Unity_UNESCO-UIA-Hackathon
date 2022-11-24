import { getToPathname } from "@remix-run/router";
import { Chart } from "../chart/chart";
import { DashboardMetric, M_Bio, M_Solar, M_Watts, EV } from "../dash-board-metric/dashboardMetric";
import { Rewards } from "../rewards/rewards";
import "./dashboard.css";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth'
import { BarChartComponent } from "../bar-chart/barChart";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useFetcher } from "react-router-dom";


//----   TEMP DATA   ----

const tempData = [
    { day: "1", solarUsage: 45, electricUsage: 12, bioFuelUsage: 20, evUsage: 10 },
    { day: "2", solarUsage: 25, electricUsage: 13, bioFuelUsage: 0, evUsage: 20 },
    { day: "3", solarUsage: 5, electricUsage: 19, bioFuelUsage: 30, evUsage: 30 },
    { day: "4", solarUsage: 35, electricUsage: 23, bioFuelUsage: 9, evUsage: 40 },
    { day: "5", solarUsage: 12, electricUsage: 29, bioFuelUsage: 10, evUsage: 80 },
    { day: "6", solarUsage: 9, electricUsage: 13, bioFuelUsage: 39, evUsage: 10 },
    { day: "7", solarUsage: 50, electricUsage: 30, bioFuelUsage: 10, evUsage: 40 },
    { day: "8", solarUsage: 20, electricUsage: 41, bioFuelUsage: 0, evUsage: 30 },
    { day: "9", solarUsage: 10, electricUsage: 44, bioFuelUsage: 0, evUsage: 20 },
    { day: "10", solarUsage: 20, electricUsage: 28, bioFuelUsage: 14, evUsage: 80 },
    { day: "11", solarUsage: 32, electricUsage: 37, bioFuelUsage: 24, evUsage: 70 },
    { day: "12", solarUsage: 24, electricUsage: 10, bioFuelUsage: 20, evUsage: 40 },
    { day: "13", solarUsage: 12, electricUsage: 19, bioFuelUsage: 33, evUsage: 38 },
];

const thresholds = [
    [15, 25],   // solar
    [15, 25],   // electricity
    [20, 30],   // bio
    [30, 40],   // ev
]

const tempCountryREUsage = [
    { name: "Karnataka", value: 99 },
    { name: "New Delhi", value: 80 },
    { name: "Kerala", value: 12 },
    { name: "UP", value: 70 },
    { name: "Tamil Nadu", value: 60 },
];

const tempEvSales = [
    { name: "2015", value: 30000 },
    { name: "2016", value: 35000 },
    { name: "2017", value: 27000 },
    { name: "2018", value: 25000 },
    { name: "2019", value: 52000 },
    { name: "2020", value: 47000 },
    { name: "2021", value: 44000 },
];

//-----------------------------------

const getUserName = () => {
    let currentUser = getAuth().currentUser;
    return currentUser !== null ? currentUser.displayName : "";
}



export const Dashboard = (props) => {

    useEffect(() => {
        queryApi();
    }, []);

    const queryApi = async () => {
        try {
            const result = await Axios.post("https://c76c-103-177-203-246.in.ngrok.io/click");

            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className=" dashboard">
            <h1 style={{ width: "100%", textAlign: "center", gridColumn: "1/3", marginTop: "30px" }}>Dashboard : {getUserName()}</h1>

            <div className="vert-flex  dash-metrics">
                <DashboardMetric title="Solar Energy Used" unit="kWh" value={tempData[12].solarUsage} type={M_Solar} thresholds={[15, 25]} />
                <DashboardMetric title="Electricity Used" unit="kWh" value={tempData[12].electricUsage} type={M_Watts} thresholds={[15, 25]} />
                <DashboardMetric title="EV" unit="kWh" value={tempData[12].evUsage} type={EV} thresholds={[30, 40]} />
                <DashboardMetric title="Bio Fuel Used" unit="J/kg" value={tempData[12].bioFuelUsage} type={M_Bio} thresholds={[20, 30]} />

                <Chart width={97} data={tempData} />

                <h3 className="p-3">Renewable percentage in states over the past 10 years:</h3>
                <BarChartComponent width={97} data={tempCountryREUsage} />

                <h3 className="p-3">Electric vehicle sales in Japan :</h3>
                <BarChartComponent width={97} data={tempEvSales} />
            </div>

            <Rewards data={tempData} thresholds={thresholds} />

        </div>
    );
}