import { getToPathname } from "@remix-run/router";
import { Chart } from "../chart/chart";
import { DashboardMetric, M_Bio, M_Solar, M_Watts, EV } from "../dash-board-metric/dashboardMetric";
import { Rewards } from "../rewards/rewards";
import "./dashboard.css";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth'
import { BarChartComponent } from "../bar-chart/barChart";


//----   TEMP DATA   ----

const tempData = [
    { day: "1", solarUsage: 45, electricUsage: 12, bioFuelUsage: 20 },
    { day: "2", solarUsage: 25, electricUsage: 13, bioFuelUsage: 0 },
    { day: "3", solarUsage: 5, electricUsage: 19, bioFuelUsage: 30 },
    { day: "4", solarUsage: 35, electricUsage: 23, bioFuelUsage: 9 },
    { day: "5", solarUsage: 12, electricUsage: 29, bioFuelUsage: 10 },
    { day: "6", solarUsage: 9, electricUsage: 13, bioFuelUsage: 39 },
    { day: "7", solarUsage: 50, electricUsage: 30, bioFuelUsage: 10 },
    { day: "8", solarUsage: 20, electricUsage: 41, bioFuelUsage: 0 },
    { day: "9", solarUsage: 10, electricUsage: 44, bioFuelUsage: 0 },
    { day: "10", solarUsage: 20, electricUsage: 28, bioFuelUsage: 14 },
    { day: "11", solarUsage: 32, electricUsage: 37, bioFuelUsage: 24 },
    { day: "12", solarUsage: 24, electricUsage: 10, bioFuelUsage: 20 },
    { day: "13", solarUsage: 45, electricUsage: 30, bioFuelUsage: 34 },
];

const tempCountryREUsage = [
    { name: "Namibia", value: 99 },
    { name: "France", value: 80 },
    { name: "Morocco", value: 12 },
    { name: "Niger", value: 70 },
    { name: "India", value: 60 },
];

//-----------------------------------

const getUserName = () => {
    let currentUser = getAuth().currentUser;
    return currentUser !== null ? currentUser.displayName : "";
}



export const Dashboard = (props) => {
    return (
        <div className=" dashboard">
            <h1 style={{ width: "100%", textAlign: "center", gridColumn: "1/3" }}>Dashboard : {getUserName()}</h1>

            <div className="vert-flex  dash-metrics">
                <DashboardMetric title="Solar Energy Used" unit="kWh" value={38} type={M_Solar} thresholds={[100, 200]} />
                <DashboardMetric title="Electricity Used" unit="kWh" value={20} type={M_Watts} thresholds={[200, 400]} />
                <DashboardMetric title="EV" unit="kWh" value={0} type={EV} thresholds={[200, 400]} />
                <DashboardMetric title="Bio Fuel Used" unit="J/kg" value={4000} type={M_Bio} thresholds={[1000, 2000]} />

                <Chart width={97} data={tempData} />

                <h3 className="p-3">Renewable percentage in countries over the past 10 years:</h3>
                <BarChartComponent width={97} data={tempCountryREUsage} />
            </div>

            <Rewards />
        </div>
    );
}