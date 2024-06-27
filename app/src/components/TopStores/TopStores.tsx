// React
import { ReactElement, useState } from 'react';

// MUI
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

// Custom
import Analytics from '../../classes/Analytics';

// Components
import Bar from '../Bar';

// Styles
import './TopStores.css';

interface Props {
    analytics: Analytics
}

const TopStores = ({ analytics }: Props): ReactElement => {
    const [barSelection, setBarSelection] = useState<"totalSpend" | "totalOrders" | "totalItemsPurchased">("totalSpend");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBarSelection((event.target as HTMLInputElement).value as "totalSpend" | "totalOrders" | "totalItemsPurchased");
    };

    return (
        <section className="TopStores">
            {/* <ul className="title-selector">
                <li
                    className={barSelection === "totalSpend" ? "selected" : ""}
                    onClick={() => setBarSelection("totalSpend")}
                >
                        Total Spend
                </li>
                <li
                    className={barSelection === "totalOrders" ? "selected" : ""}
                    onClick={() => setBarSelection("totalOrders")}
                >
                        Total Orders
                </li>
                <li
                    className={barSelection === "totalItemsPurchased" ? "selected" : ""}
                    onClick={() => setBarSelection("totalItemsPurchased")}
                >
                        Total Items
                </li>
            </ul> */}
            <FormControl
                sx={
                    {
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: "16px",
                        width: "100%",
                    }
                }
            >
                <FormLabel
                    id="demo-row-radio-buttons-group-label"
                    sx={{
                        fontSize: "1.3rem",
                        fontStyle: "oblique",
                        fontWeight: "bold",
                    }}
                >
                    Top Stores
                </FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={barSelection}
                    onChange={handleChange}
                >
                    <FormControlLabel value="totalSpend" control={<Radio />} label="Total Spend" />
                    <FormControlLabel value="totalOrders" control={<Radio />} label="Total Orders" />
                    <FormControlLabel value="totalItemsPurchased" control={<Radio />} label="Total Items" />
                </RadioGroup>
            </FormControl>
            {
                barSelection === "totalSpend" &&
                <Bar
                    id="stores-by-total-spend"
                    title="Top Stores by Total Spend"
                    dataset={analytics
                        .getTopStoresByTotalSpend(5)
                        .map(obj => ({ key: obj.storeName, value: obj.totalSpend }))
                    }
                />
            }
            {
                barSelection === "totalOrders" &&
                <Bar
                    id="stores-by-total-orders"
                    title="Top Stores by Total Orders"
                    dataset={analytics
                        .getTopStoresByTotalOrders(5)
                        .map(obj => ({ key: obj.storeName, value: obj.totalOrders }))
                    }
                />
            }
            {
                barSelection === "totalItemsPurchased" &&
                <Bar
                    id="stores-by-total-items-purchased"
                    title="Top Stores by Total Items Purchased"
                    dataset={analytics
                        .getTopStoresByTotalItemsPurchased(5)
                        .map(obj => ({ key: obj.storeName, value: obj.totalItemsPurchased }))
                    }
                />
            }
        </section>
    );
}

export default TopStores;
