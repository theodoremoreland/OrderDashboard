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
        <section
            id={id}
            data-testid={id} 
            className="List"
        >
            <ul
                title={title}
            >
                {data.map(({ key, value } : { key: string | number, value: string | number }) => (
                    <li key={key}>
                        <span className="key">{key}</span>
                        <span className="value">{value}</span>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default List;