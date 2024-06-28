import { ReactElement } from "react";

import './Kpi.css';

interface Props {
    id: string
    label: string
    value: string | number
    title?: string
}

const Kpi = ({ id, label, value, title }: Props): ReactElement => {
    return (
        <div 
            id={id}
            className="Kpi"
            title={title}
        >
            <span className="value">{value}</span>
            <span className="label">{label}</span>
            <div className="overlay"></div>
        </div>
    )
} 

export default Kpi;