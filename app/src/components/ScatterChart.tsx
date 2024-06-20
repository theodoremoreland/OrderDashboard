// React
import { ReactElement } from "react";

// MUI X
import { ScatterValueType } from "@mui/x-charts";
import { ScatterChart } from "@mui/x-charts/ScatterChart";

interface Props {
    data: ScatterValueType[]
}

const Scatter = ({ data }: Props): ReactElement => {
    return (
        <div>
            <ScatterChart
                series={[
                    {
                        data: data
                    }
                ]}
                width={1280}
                height={300}
            />
        </div>
    )
}

export default Scatter;