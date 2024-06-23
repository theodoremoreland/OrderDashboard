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
            storeName: string
            value: number
        }[]
}

const Bar = ({ id, dataset }: Props): ReactElement => {
    return (
        <section
            id={id}
            data-testid={id} 
            className="Bar"
        >
            <BarChart
                barLabel={() => null}
                dataset={dataset}
                xAxis={[{ scaleType: 'band', dataKey: 'storeName' }]}
                series={[
                    { dataKey: 'storeName', color: 'transparent' },
                    { dataKey: 'value' },
                ]}
                layout="horizontal"
                height={400}
                
            />
        </section>
    )
}

export default Bar;