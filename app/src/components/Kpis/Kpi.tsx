import { ReactElement } from "react";

import './Kpi.css';

interface Props {
    id: string
    label: string
    value: string | number
    title?: string
    icon?: ReactElement
}

const Kpi = ({ id, label, value, title, icon }: Props): ReactElement => {
    return (
        <div 
            id={id}
            className="Kpi"
            title={title}
        >
            <span className="value">{value}</span>
            <div className="label-row">
                {icon && icon}
                <span className="label">{label}</span>
            </div>
            <div className="overlay"></div>
        </div>
    )
} 

export default Kpi;