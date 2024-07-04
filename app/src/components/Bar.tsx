// React
import { ReactElement, useEffect, useCallback, useState } from "react";

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
    xAxisFormatter?: (value: number | null) => string
}

const Bar = ({ id, dataset, xAxisFormatter }: Props): ReactElement => {
    const [margins, setMargins] = useState({ left: 150, top: 15, right: 35 } as { left: number, top: number, right: number } );

    const handleResize = useCallback((): void => {
        if (window.innerWidth < 1080) {
            setMargins({ left: 100, top: 15, right: 5 });
        }
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [handleResize]);

    return (
        <BarChart
            data-testid={id} 
            className="Bar"
            dataset={dataset}
            yAxis={[
                { 
                    scaleType: 'band',
                    dataKey: 'key',
                },
            ]}
            xAxis={[
                {
                    colorMap: {
                        type: 'continuous',
                        min: dataset[dataset.length - 1].value,
                        max: dataset[0].value,
                        color: ['#fc3e74', '#d71c60']
                    },
                    valueFormatter: xAxisFormatter
                }
            ]}
            series={[
                { dataKey: 'value', valueFormatter: xAxisFormatter },
            ]}
            layout="horizontal"
            height={190}
            margin={margins}
        />
    )
}

export default Bar;