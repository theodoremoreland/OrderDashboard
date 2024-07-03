// React
import { ReactElement, useContext, useEffect, useState } from "react";

// MUI
import FormControl from '@mui/material/FormControl';
import { NativeSelect } from '@mui/material';

// Context
import { DataContext } from "../contexts/DataContextProvider";

// Components
import DisplaySettingsDialog from './Dialogs/DisplaySettingsDialog';
import DataUploadDialog from "./Dialogs/DataUploadDialog";

// Custom
import Analytics from "../classes/Analytics";
import { generateRandomOrderData } from "../modules/randomizeData";

// Types
import { Order } from "../types/types";

// Images
import AttachFileAddIcon from "../assets/images/icons/attach_file_add.svg?react";
import DisplaySettingsIcon from "../assets/images/icons/display_settings.svg?react";
import RefreshIcon from "../assets/images/icons/refresh.svg?react";

// Styles
import './NavBar.css';

interface Props {
    analytics: Analytics;
}

const NavBar = ({ analytics }: Props): ReactElement => {
    const { setStartDate, setEndDate, resetDates, setRawData } = useContext(DataContext);
    const [selectedYear, setSelectedYear] = useState<string>("All");
    const [displaySettingsOpen, setDisplaySettingsOpen] = useState<boolean>(false);
    const [dataUploadOpen, setDataUploadOpen] = useState<boolean>(false);

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
                        <DisplaySettingsIcon
                            onClick={() => setDisplaySettingsOpen(true)}
                            className="icon clickable"
                        />
                    </li>
                    <li>
                        <AttachFileAddIcon
                            onClick={() => setDataUploadOpen(true)}
                            className="icon clickable"
                        />
                    </li>
                    <li>
                        <RefreshIcon
                            onClick={() => {
                                setSelectedYear("All");
                                setRawData(generateRandomOrderData() as Order[])
                            }}
                            className="icon clickable"
                        />
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
            <DisplaySettingsDialog
                open={displaySettingsOpen} 
                handleClose={() => setDisplaySettingsOpen(false)}
            />
            <DataUploadDialog
                open={dataUploadOpen}
                handleClose={() => setDataUploadOpen(false)}
            />
        </nav>
    )
}

export default NavBar;