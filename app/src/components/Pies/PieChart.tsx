// React
import { ReactElement } from "react";

// Third party
import { PieChart } from '@mui/x-charts/PieChart';

// Styles
import './PieChart.css';

interface Props {
    metricLabel: string,
    dimensionLabel: string,
    data: {
        label: string,
        value: number
    }[]
}

const Pie = ({ data, metricLabel, dimensionLabel }: Props): ReactElement => {
    return (
        <div className="Pie">
            <h2>
                <span>{metricLabel}</span>
                <span>{dimensionLabel}</span>
            </h2>
            <PieChart
                slotProps={{
                    legend: {
                        hidden: true,
                    }
                }}
                series={[
                    {
                        data: data,
                        valueFormatter: (obj) =>  obj.value?.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
                        innerRadius: 110,
                        paddingAngle: 2,
                        cornerRadius: 12,
                        startAngle: 0,
                    }
                ]}
                width={300}
                height={240}
                margin={{ top: 0, right: 10, bottom: 0, left: 10 }}
            />
        </div>
    )
}

export default Pie;