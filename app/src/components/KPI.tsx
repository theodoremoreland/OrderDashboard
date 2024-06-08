import { ReactElement } from "react"

interface Props {
    id: string
}

const Kpi = ({ id }: Props): ReactElement => {
    return (
        <div 
            id={id}
            className="kpi"
        >
            <h1>KPI</h1>
        </div>
    )
} 

export default Kpi;