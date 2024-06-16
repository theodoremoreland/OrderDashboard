import { ReactElement } from "react";

import './Kpi.css';

interface Props {
    id: string
    title: string
    value: string
}

const Kpi = ({ id, title, value }: Props): ReactElement => {
    return (
        <div 
            id={id}
            className="kpi"
        >
            <span className="title">{title}</span>
            <span className="value">{value}</span>
        </div>
    )
} 

export default Kpi;