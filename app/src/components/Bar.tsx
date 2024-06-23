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

const Bar = ({ id, dataset, title }: Props): ReactElement => {
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
                    { dataKey: 'value', label: title },
                ]}
                layout="horizontal"
                height={400}
                margin={{ left: 200 }}
                
            />
        </section>
    )
}

export default Bar;