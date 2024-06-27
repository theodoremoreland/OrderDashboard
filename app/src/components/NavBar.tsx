// React
import { ReactElement, useState } from "react";

// MUI
import FormControl from '@mui/material/FormControl';
import { NativeSelect } from '@mui/material';

// Custom
import Analytics from "../classes/Analytics";

// Images
import TableViewIcon from "../assets/images/icons/table-view.svg?react"
import DownloadIcon from "../assets/images/icons/download.svg?react"
import FindReplaceIcon from "../assets/images/icons/find-replace.svg?react"

// Styles
import './NavBar.css';

interface Props {
    analytics: Analytics;
}

const NavBar = ({ analytics }: Props): ReactElement => {
    const [selectedYear, setSelectedYear] = useState<string>("All");

    return (
        <nav className="NavBar">
            <h1 className="app-title">Order Dashboard</h1>
            <ul>
                <li>
                    <TableViewIcon className="icon" />
                </li>
                <li>
                    <FindReplaceIcon className="icon" />
                </li>
                <li>
                    <DownloadIcon className="icon" />
                </li>
                <FormControl>
                <NativeSelect
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    inputProps={{
                        name: 'year',
                        id: 'uncontrolled-native',
                    }}
                >
                    <option value="All">All</option>
                    {
                        Object.keys(analytics.getTotalSpendByYear()).sort((a, b) => Number(b) - Number(a)).map(year => {
                            return (
                                <option key={year} value={year}>{year}</option>
                            )
                        })
                    }
                </NativeSelect>
            </FormControl>
            </ul>

        </nav>
    )
}

export default NavBar;