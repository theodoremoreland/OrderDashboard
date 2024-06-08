import { ReactElement } from "react";

// Third party
import { PieChart } from '@mui/x-charts/PieChart';

const Pie = (): ReactElement => {
    return (
        <div>
            <PieChart series={[]} />
        </div>
    )
}

export default Pie;