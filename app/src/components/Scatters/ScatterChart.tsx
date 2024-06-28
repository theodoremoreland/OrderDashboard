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
                sx={{
                    '& .MuiChartsAxis-tickLabel': {
                        fill: 'var(--primary-font-color)',
                    },
                    '& .MuiChartsAxis-line, & .MuiChartsAxis-tick': {
                        stroke: 'var(--border-color)'
                    },
                }}
                grid={{
                    horizontal: true,
                }}
                series={[
                    {
                        data,
                        valueFormatter: tooltipFormatter,
                        color: '#d71c60',
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
                height={165}
                margin={{ left: 75, top: 20, bottom: 20, right: 35 }}
            />
        </div>
    )
}

export default Scatter;