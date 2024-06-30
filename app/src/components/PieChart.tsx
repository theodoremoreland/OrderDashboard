// React
import { ReactElement } from "react";

// Third party
import { PieChart, pieArcLabelClasses, pieArcClasses } from '@mui/x-charts/PieChart';

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
                colors={[
                    "#d71c60"
                    ,"#3a3b59"
                    , "#b14d68"
                    , "#4aa7f1"
                    , "#2265c1"
                    , "#214263"
                    , "#263951"
                    , "#5845ba"
                    , "#19122d"
                    ,"#1164c1"
                    , "#445454"
                    , "#72505c"
                    , "#6a9ec7"
                ]}
                slotProps={{
                    legend: {
                        hidden: true,
                    }
                }}
                series={[
                    {
                        arcLabel: (item) => `${item.label}`,
                        data: data,
                        valueFormatter: (obj) =>  obj.value?.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
                        highlightScope: { faded: 'global', highlighted: 'item' },
                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                        innerRadius: 70,
                        paddingAngle: 2,
                        cornerRadius: 4,
                        startAngle: 0,
                        
                    }
                ]}
                sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                        fill: '#feffff',
                    },
                    [`& .${pieArcClasses.root}`]: {
                        stroke: 'transparent'
                    }
                }}
                width={260}
                height={220}
                margin={{ top: 0, right: 10, bottom: 0, left: 10 }}
            />
        </div>
    )
}

export default Pie;