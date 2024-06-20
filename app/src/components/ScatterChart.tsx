// React
import { ReactElement } from "react";

// MUI X
import { ScatterValueType } from "@mui/x-charts";
import { ScatterChart } from "@mui/x-charts/ScatterChart";

interface Props {
    data: ScatterValueType[]
}

const Scatter = ({ data }: Props): ReactElement => {
    return (
        <div>
            <ScatterChart
                grid={{
                    horizontal: true
                }}
                series={[
                    {
                        data,
                        valueFormatter: ({ x, y }) => `${y.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} (${new Date(x).toLocaleDateString()})`,
                    }
                ]}
                yAxis={[
                    {
                        min: 1,
                        valueFormatter: (value) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
                    }
                ]}
                xAxis={[
                    {
                        valueFormatter: (value) => new Date(value).toLocaleDateString()
                    }
                ]}
                width={1400}
                height={300}
            />
        </div>
    )
}

export default Scatter;