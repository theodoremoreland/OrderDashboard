// React
import { ReactElement, useState } from "react";

// Custom
import Analytics from "../../classes/Analytics";

// Components
import List from "../List";

// Styles
import './Streaks.css';

interface Props {
    analytics: Analytics
}

const Streaks = ({ analytics }: Props): ReactElement => {
    const [listSelection, setListSelection] = useState<"days-with-purchases" | "days-without-purchases">("days-with-purchases");

    return (
        <section className="Streaks">
            <ul className="title-selector">
                <li
                    className={listSelection === "days-with-purchases" ? "selected" : ""}
                    onClick={() => setListSelection("days-with-purchases")}
                >
                        Purchase Streaks
                </li>
                <li
                    className={listSelection === "days-without-purchases" ? "selected" : ""}
                    onClick={() => setListSelection("days-without-purchases")}
                >
                        Non Purchase Streaks
                </li>
            </ul>
            {
                listSelection === "days-with-purchases" &&
                <List
                    id="days-with-purchases"
                    title="Longest consecutive days of purchases"
                    data={analytics
                        .getTopPurchaseStreaks(7)
                        .map(obj => ({ key: `${obj.days} consecutive days`, value: `${obj.startDate} - ${obj.endDate}` }))
                    }
                />
            }
            {
                listSelection === "days-without-purchases" &&
                <List
                    id="days-without-purchases"
                    title="Longest consecutive days without purchases"
                    data={analytics
                        .getTopDroughtsBetweenPurchases(7)
                        .map(obj => ({ key: `${obj.days} consecutive days`, value: `${obj.startDate} - ${obj.endDate}` }))
                    }
                />
            }
        </section>
    );
}

export default Streaks;
