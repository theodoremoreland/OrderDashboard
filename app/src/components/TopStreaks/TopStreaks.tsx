// React
import { ReactElement, useState, useContext } from "react";

// MUI
import FormControl from '@mui/material/FormControl';
import { NativeSelect } from '@mui/material';

// Custom
import Analytics from "../../classes/Analytics";

// Context
import { DisplaySettingsContext } from "../../contexts/DisplaySettingsProvider";

// Components
import List from "../List";

// Styles
import './TopStreaks.css';

interface Props {
    analytics: Analytics
    startDate: Date
    endDate: Date
}

const TopStreaks = ({ analytics, startDate, endDate }: Props): ReactElement => {
    const { listsCount } = useContext(DisplaySettingsContext);
    const [listSelection, setListSelection] = useState<"days-with-purchases" | "days-without-purchases">("days-with-purchases");

    return (
        <section className="TopStreaks">
            <div className='heading'>
                <h2>Top Streaks</h2>
                <FormControl
                    size="small"
                    sx={{ minWidth: 110 }}
                >
                    <NativeSelect
                        sx={{ color: '#feffff' }}
                        value={listSelection}
                        onChange={(e) => setListSelection(e.target.value as "days-with-purchases" | "days-without-purchases")}
                        inputProps={{
                            name: 'Top Streaks',
                            id: 'uncontrolled-native',
                        }}
                    >
                        <option value="days-with-purchases">Orders</option>
                        <option value="days-without-purchases">No Orders</option>
                    </NativeSelect>
                </FormControl>
            </div>
            {
                listSelection === "days-with-purchases" &&
                <List
                    id="days-with-purchases"
                    title="Longest consecutive days of purchases"
                    key={`${startDate} - ${endDate}`}
                    data={analytics
                        .getTopPurchaseStreaks(startDate, endDate, listsCount)
                        .map(obj => ({ key: `${obj.days} days`, value: `${new Date(obj.startDate).toLocaleDateString()} - ${new Date(obj.endDate).toLocaleDateString()}` }))
                    }
                />
            }
            {
                listSelection === "days-without-purchases" &&
                <List
                    id="days-without-purchases"
                    title="Longest consecutive days without purchases"
                    key={`${startDate} - ${endDate}`}
                    data={analytics
                        .getTopDroughtsBetweenPurchases(startDate, endDate, listsCount)
                        .map(obj => ({ key: `${obj.days} days`, value: `${new Date(obj.startDate).toLocaleDateString()} - ${new Date(obj.endDate).toLocaleDateString()}` }))
                    }
                />
            }
            <div className="overlay"></div>
        </section>
    );
}

export default TopStreaks;
