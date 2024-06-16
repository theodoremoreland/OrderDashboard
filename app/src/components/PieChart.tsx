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
        <div>
            <PieChart
                series={[
                    {
                        data: data
                    }
                ]}
                width={400}
                height={200}
            />
        </div>
    )
}

export default Pie;