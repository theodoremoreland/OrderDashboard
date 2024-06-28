import { ReactElement } from "react";

import './Kpi.css';

interface Props {
    id: string
    title: string
    value: string | number
}

const Kpi = ({ id, title, value }: Props): ReactElement => {
    return (
        <div 
            id={id}
            className="Kpi"
        >
            <span className="value">{value}</span>
            <span className="label">{title}</span>
            <div className="overlay"></div>
        </div>
    )
} 

export default Kpi;