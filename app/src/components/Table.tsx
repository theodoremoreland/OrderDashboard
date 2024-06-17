import { ReactElement } from "react";

// Styles
import './Table.css';

interface Props {
    id: string
    title: string
    data: 
        {
            key: string | number,
            value: string | number
        }[]
}

const Table = ({ id, title, data }: Props): ReactElement => {
    return (
        <section 
            id={id}
            data-testid={id} 
            className="Table"
        >
            <h2 className="table-title">{title}</h2>
            <table>
                {data.map(({ key, value } : { key: string | number, value: string | number }) => (
                    <tr key={key}>
                        <td className="key">{key}</td>
                        <td className="value">{value}</td>
                    </tr>
                ))}
            </table>
        </section>
    )
}

export default Table;