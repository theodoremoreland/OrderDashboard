// React
import { ReactElement } from "react";

// Third party
import { PieChart } from '@mui/x-charts/PieChart';

// Styles
import './PieChart.css';

interface Props {
    data: {
        label: string,
        value: number
    }[]
}

const Pie = ({ data }: Props): ReactElement => {
    return (
        <div className="Pie">
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
                        innerRadius: 90,
                        paddingAngle: 0,
                        cornerRadius: 0,
                    }
                ]}
                width={240}
                height={240}
                margin={{ top: 0, right: 10, bottom: 0, left: 10 }}
            />
        </div>
    )
}

export default Pie;