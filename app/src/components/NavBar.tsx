// React
import { ReactElement, useContext, useEffect, useState } from "react";

// MUI
import FormControl from '@mui/material/FormControl';
import { NativeSelect } from '@mui/material';

// Context
import { DataContext } from "../contexts/DataContextProvider";

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
    const { setStartDate, setEndDate, resetDates } = useContext(DataContext);
    const [selectedYear, setSelectedYear] = useState<string>("All");

    useEffect(() => {
        if (selectedYear === "All") {
            resetDates();
        } else {
            const year = Number(selectedYear);
            setStartDate(new Date(year, 0, 1));
            setEndDate(new Date(year, 11, 31));
        }
    }, [selectedYear, setStartDate, setEndDate, resetDates]);

    return (
        <nav className="NavBar">
            <h1 className="app-title">Order Dashboard</h1>
            <div className="center">
                <ul>
                    <li>
                        <TableViewIcon className="icon clickable" />
                    </li>
                    <li>
                        <FindReplaceIcon className="icon clickable" />
                    </li>
                    <li>
                        <DownloadIcon className="icon clickable" />
                    </li>
                </ul>
            </div>
            <FormControl
                size="small"
                sx={{ minWidth: 95, zIndex: 2}}
            >
                <NativeSelect
                    sx={{ 
                        color: '#feffff',
                    }}
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    inputProps={{
                        name: 'year',
                        id: 'uncontrolled-native',
                    }}
                >
                    <option value="All">All years</option>
                    {
                        Object.keys(analytics.getTotalSpendByYear()).sort((a, b) => Number(b) - Number(a)).map(year => {
                            return (
                                <option key={year} value={year}>{year}</option>
                            )
                        })
                    }
                </NativeSelect>
            </FormControl>
            <div className="overlay"></div>
        </nav>
    )
}

export default NavBar;