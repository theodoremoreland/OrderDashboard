// React
import { ReactElement } from "react";

// Styles
import './List.css';

interface Props {
    id: string
    title: string
    data: 
        {
            key: string | number,
            value: string | number
        }[]
}

const List = ({ id, title, data }: Props): ReactElement => {
    return (
        <ul
            id={id}
            data-testid={id}
            title={title}
            className="List"
        >
            {data.map(({ key, value } : { key: string | number, value: string | number }) => (
                <li key={key}>
                    <span className="key">{key}</span>
                    <span className="value">{value}</span>
                </li>
            ))}
        </ul>
    )
}

export default List;
