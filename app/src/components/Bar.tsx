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
}

const Bar = ({ id, dataset}: Props): ReactElement => {
    return (
        <BarChart
            data-testid={id} 
            className="Bar"
            dataset={dataset}
            yAxis={[{ scaleType: 'band', dataKey: 'key',}]}
            series={[
                { dataKey: 'value' },
            ]}
            layout="horizontal"
            height={325}
            margin={{ left: 150 }}
            
        />
    )
}

export default Bar;