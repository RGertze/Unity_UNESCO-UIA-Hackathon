import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

/**
 * 
 * @param {*} props object containing immutable component data from parent. Has the following fields
 *                  - width: number - % width of chart 
 *                  - data: object[] - array of values to chart. Has the following fields
 *                      - name: string -- name of data
 *                      - value: number -- value for data point
 * 
 * 
 * 
 *  
 * @returns 
 */
export const BarChartComponent = (props) => {
    return (
        <div style={{ width: `${props.width}%` }}>
            <ResponsiveContainer minWidth={500} minHeight={500} width="100%" height="100%">
                <BarChart
                    width={500}
                    height={500}
                    data={props.data}
                    margin={{
                        top: 5,
                        bottom: 20
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}