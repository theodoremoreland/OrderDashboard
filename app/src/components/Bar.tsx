import { ReactElement } from "react";

import { BarChart } from '@mui/x-charts/BarChart';

// Styles
import './Bar.css';

interface Props {
    id: string
    title?: string
    data: 
        {
            key: string | number,
            value: string | number
        }[]
}

const Bar = ({ id, data }: Props): ReactElement => {
    return (
        <section
            id={id}
            data-testid={id} 
            className="Bar"
        >
            <BarChart
                dataset={data}
                yAxis={[{ scaleType: 'band', dataKey: 'key' }]}
                series={[{ dataKey: 'value' }]}
                layout="horizontal"
                height={400}
                
            />
        </section>
    )
}

export default Bar;