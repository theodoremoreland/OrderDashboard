// React
import { ReactElement } from "react";

// MUI X
import { LineChart } from '@mui/x-charts/LineChart';

interface Props {
    xAxis: string[]
    data: number[]
}

const SparkLine = ({ xAxis, data }: Props): ReactElement => {
    return (
        <div>
            <LineChart
            
                series={[
                    {
                        data: data.map(val => val === 0 ? null : val)
                    }
                ]}
                xAxis={[{
                    
                    data: xAxis,
                    // valueFormatter: (value) => value.toISOString().slice(0, 10),
                }]}
                width={1280}
                height={300}
            />
        </div>
    )
}

export default SparkLine;