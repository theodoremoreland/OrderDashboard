// React
import { ReactElement } from "react";

// Third party
import { PieChart } from '@mui/x-charts/PieChart';

interface Props {
    data: {
        label: string,
        value: number
    }[]
}

const Pie = ({ data }: Props): ReactElement => {
    return (
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
                        innerRadius: 120,
                        paddingAngle: 0,
                        cornerRadius: 0,
                    }
                ]}
                width={375}
                height={400}
                margin={{ top: 0, right: 10, bottom: 0, left: 10 }}
            />
    )
}

export default Pie;