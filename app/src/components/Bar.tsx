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
        <section
            id={id}
            data-testid={id} 
            className="Bar"
        >
            <BarChart
                dataset={dataset}
                yAxis={[{ scaleType: 'band', dataKey: 'key',}]}
                series={[
                    { dataKey: 'value' },
                ]}
                layout="horizontal"
                height={400}
                margin={{ left: 150 }}
                
            />
        </section>
    )
}

export default Bar;