import { ReactElement } from "react";

// Styles
import './List.css';

interface Props {
    id: string
    title: string
    data: 
        {
            key: string,
            value: string | number
        }[]
}

const List = ({ id, title, data }: Props): ReactElement => {
    return (
        <section 
            id={id}
            data-testid={id} 
            className="list"
        >
            <h2 className="list-title">{title}</h2>
            <ul className="list-items">
                {data.map(({ key, value } : { key: string, value: string | number }) => (
                    <li key={key} className="list-item">
                        <span className="list-item-key">{key}</span>
                        <span className="list-item-value">{value}</span>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default List;