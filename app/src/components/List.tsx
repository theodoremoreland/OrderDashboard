// React
import { ReactElement } from 'react';

// Images
import TrophyIcon from '../assets/images/icons/trophy.svg?react';

// Styles
import './List.css';

interface Props {
    id: string;
    title: string;
    data: {
        key: string | number;
        value: string | number;
    }[];
}

const displayTrophyIcon = (index: number): ReactElement | null => {
    if (index === 0) {
        return <TrophyIcon className="trophy-icon gold" />;
    } else if (index === 1) {
        return <TrophyIcon className="trophy-icon silver" />;
    } else if (index === 2) {
        return <TrophyIcon className="trophy-icon bronze" />;
    } else {
        // Return an invisible trophy icon to maintain spacing for items without a trophy.
        return <TrophyIcon className="trophy-icon invisible" />;
    }
};

const List = ({ id, title, data }: Props): ReactElement => {
    return (
        <ul id={id} data-testid={id} title={title} className="List">
            {data.map(
                (
                    {
                        key,
                        value,
                    }: {
                        key: string | number;
                        value: string | number;
                    },
                    index
                ) => (
                    <li key={`${key} ${value}`}>
                        <span className="key">
                            {displayTrophyIcon(index)}
                            <p>{key}</p>
                        </span>
                        <span className="value">{value}</span>
                    </li>
                )
            )}
        </ul>
    );
};

export default List;
