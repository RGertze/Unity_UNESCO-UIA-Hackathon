import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

/**
 * 
 * @param {*} props object containing immutable component data from parent. Has the following fields
 *                  - width: number - % width of chart 
 *                  - data: object[] - array of values to chart. Has the following fields
 *                      - day: string -- day of the month
 *                      - solarUsage: number -- solar power usage value
 *                      - electricUsage: number -- electricity usage value
 *                      - bioFuelUsage: number -- bio fuel usage value
 * 
 * 
 * 
 *  
 * @returns 
 */
export const Chart = (props) => {
    return (
        <div style={{ width: `${props.width}%` }}>
            <ResponsiveContainer minWidth={500} minHeight={500} width="100%" height="100%">
                <LineChart
                    width={500}
                    height={500}
                    data={props.data}
                    margin={{
                        top: 5,
                        bottom: 20
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="solarUsage" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="electricUsage" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="bioFuelUsage" stroke="#7c8800" />
                    <Line type="monotone" dataKey="evUsage" stroke="#ff8800" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}