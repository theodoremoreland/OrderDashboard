// React
import { ReactElement, useState } from "react";

// MUI
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { NativeSelect } from '@mui/material';

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
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Longest consecutive
                </InputLabel>
                <NativeSelect
                    value={listSelection}
                    onChange={(e) => setListSelection(e.target.value as "days-with-purchases" | "days-without-purchases")}
                    inputProps={{
                        name: 'topStoresBy',
                        id: 'uncontrolled-native',
                    }}
                >
                    <option value="days-with-purchases">Days of purchases</option>
                    <option value="days-without-purchases">Days without purchases</option>
                </NativeSelect>
            </FormControl>
            {
                listSelection === "days-with-purchases" &&
                <List
                    id="days-with-purchases"
                    title="Longest consecutive days of purchases"
                    data={analytics
                        .getTopPurchaseStreaks()
                        .map(obj => ({ key: `${obj.days} days`, value: `${obj.startDate} - ${obj.endDate}` }))
                    }
                />
            }
            {
                listSelection === "days-without-purchases" &&
                <List
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
