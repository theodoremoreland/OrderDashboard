// React
import { ReactElement } from "react";

// MUI X
import { ScatterValueType } from "@mui/x-charts";
import { ScatterChart } from "@mui/x-charts/ScatterChart";

interface Props {
    tooltipFormatter?: (obj: { x: number, y: number }) => string
    xAxisFormatter?: (value: number) => string
    yAxisFormatter?: (value: number) => string
    data: ScatterValueType[]
}

const Scatter = ({ data, tooltipFormatter, xAxisFormatter, yAxisFormatter }: Props): ReactElement => {

    
    return (
        <div>
            <ScatterChart
                grid={{
                    horizontal: true
                }}
                series={[
                    {
                        data,
                        valueFormatter: tooltipFormatter,
                    }
                ]}
                yAxis={[
                    {
                        min: 1,
                        valueFormatter: yAxisFormatter,
                    }
                ]}
                xAxis={[
                    {
                        valueFormatter: xAxisFormatter
                    }
                ]}
                height={175}
                margin={{ left: 75, top: 20, bottom: 35, right: 35 }}
            />
        </div>
    )
}

export default Scatter;