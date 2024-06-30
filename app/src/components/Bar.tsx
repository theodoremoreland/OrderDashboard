// React
import { ReactElement } from "react";

// MUI X
import { BarChart } from '@mui/x-charts/BarChart';

// Styles
import './Bar.css';

interface Props {
    id: string
    title?: string
    dataset: 
        {   
            key: string
            value: number
        }[]
    xAxisFormatter?: (value: number | null) => string
}

const Bar = ({ id, dataset, xAxisFormatter }: Props): ReactElement => {
    return (
        <BarChart
            data-testid={id} 
            className="Bar"
            dataset={dataset}
            yAxis={[
                { 
                    scaleType: 'band',
                    dataKey: 'key',
                },
            ]}
            xAxis={[
                {
                    colorMap: {
                        type: 'continuous',
                        min: dataset[dataset.length - 1].value,
                        max: dataset[0].value,
                        color: ['#fc3e74', '#d71c60']
                    },
                    valueFormatter: xAxisFormatter
                }
            ]}
            series={[
                { dataKey: 'value', valueFormatter: xAxisFormatter},
            ]}
            layout="horizontal"
            height={190}
            margin={{ left: 150, top: 15, right: 35 }}
        />
    )
}

export default Bar;