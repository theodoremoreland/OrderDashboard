import { ReactElement } from "react";

// Styles
import './List.css';

interface Props {
    id: string
    title: string
}

const List = ({ id, title }: Props): ReactElement => {
    return (
        <section 
            id={id}
            data-testid={id} 
            className="list"
        >
            <h2 className="list-title">{title}</h2>
        </section>
    )
}

export default List;