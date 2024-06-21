// React
import { ReactElement, useState } from "react";

// MUI
// MUI
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { NativeSelect } from '@mui/material';

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
    const [tableSelection, setTableSelection] = useState<"days-with-purchases" | "days-without-purchases">("days-with-purchases");

    return (
        <section className="Streaks">
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Streaks
                </InputLabel>
                <NativeSelect
                    value={tableSelection}
                    onChange={(e) => setTableSelection(e.target.value as "days-with-purchases" | "days-without-purchases")}
                    inputProps={{
                        name: 'topStoresBy',
                        id: 'uncontrolled-native',
                    }}
                >
                    <option value="days-with-purchases">Longest consecutive days of purchases</option>
                    <option value="days-without-purchases">Longest consecutive days without purchases</option>
                </NativeSelect>
            </FormControl>
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
