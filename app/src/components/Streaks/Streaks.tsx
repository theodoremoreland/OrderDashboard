// React
import { ReactElement, useState } from "react";

// Custom
import Analytics from "../../classes/Analytics";

// Components
import Table from "../Table";

// Styles
import './Streaks.css';

interface Props {
    analytics: Analytics
}

const Streaks = ({ analytics }: Props): ReactElement => {
    const [tableSelection] = useState<"days-with-purchases" | "days-without-purchases">("days-with-purchases");

    return (
        <section className="Streaks">
            {
                tableSelection === "days-with-purchases" &&
                <Table
                    id="days-with-purchases"
                    title="Longest consecutive days of purchases"
                    data={analytics
                        .getTopPurchaseStreaks()
                        .map(obj => ({ key: `${obj.days} days`, value: `${obj.startDate} - ${obj.endDate}` }))
                    }
                />
            }
            {
                tableSelection === "days-without-purchases" &&
                <Table
                    id="days-without-purchases"
                    title="Longest consecutive days without purchases"
                    data={analytics
                        .getTopDroughtsBetweenPurchases()
                        .map(obj => ({ key: `${obj.days} days`, value: `${obj.startDate} - ${obj.endDate}` }))
                    }
                />
            }
        </section>
    );
}

export default Streaks;
