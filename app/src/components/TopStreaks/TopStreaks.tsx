// React
import { ReactElement, useState, useContext, useCallback } from 'react';

// MUI
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';

// Custom
import Analytics from '../../classes/Analytics';

// Context
import { DisplaySettingsContext } from '../../contexts/DisplaySettingsProvider';

// Components
import List from '../List';

// Images
import InfoHollowIcon from '../../assets/images/icons/info_hollow.svg?react';

// Styles
import './TopStreaks.css';

interface Props {
    analytics: Analytics;
    startDate: Date;
    endDate: Date;
}

const TopStreaks = ({ analytics, startDate, endDate }: Props): ReactElement => {
    const { listsCount } = useContext(DisplaySettingsContext);
    const [listSelection, setListSelection] = useState<
        'days-with-purchases' | 'days-without-purchases'
    >('days-with-purchases');
    const [infoMenuAnchorEl, setInfoMenuAnchorEl] =
        useState<null | HTMLElement>(null);
    const isInfoMenuOpen = Boolean(infoMenuAnchorEl);

    const handleInfoMenuOpen = useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            setInfoMenuAnchorEl(event.currentTarget);
        },
        []
    );

    const handleInfoMenuClose = useCallback(() => {
        setInfoMenuAnchorEl(null);
    }, []);

    return (
        <section className="TopStreaks">
            <div className="heading">
                <h2>
                    Top Streaks
                    <IconButton
                        id="info-menu-icon-button"
                        aria-label="menu"
                        aria-controls={isInfoMenuOpen ? 'info-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={isInfoMenuOpen ? 'true' : undefined}
                        onClick={handleInfoMenuOpen}
                    >
                        <InfoHollowIcon className="info-icon" />
                    </IconButton>
                    <Menu
                        id="top-streaks-info-menu"
                        anchorEl={infoMenuAnchorEl}
                        open={isInfoMenuOpen}
                        onClose={handleInfoMenuClose}
                    >
                        <p>
                            This data represents the most consecutive days with
                            or without purchases.
                        </p>
                    </Menu>
                </h2>
                <FormControl
                    variant="standard"
                    size="small"
                    sx={{ minWidth: 110 }}
                >
                    <Select
                        sx={{ color: '#feffff' }}
                        value={listSelection}
                        onChange={(e) =>
                            setListSelection(
                                e.target.value as
                                    | 'days-with-purchases'
                                    | 'days-without-purchases'
                            )
                        }
                        inputProps={{
                            name: 'Top Streaks',
                            id: 'uncontrolled-native',
                        }}
                    >
                        <MenuItem value="days-with-purchases">Orders</MenuItem>
                        <MenuItem value="days-without-purchases">
                            No Orders
                        </MenuItem>
                    </Select>
                </FormControl>
            </div>
            {listSelection === 'days-with-purchases' && (
                <List
                    id="days-with-purchases"
                    title="Longest consecutive days of purchases"
                    key={`${startDate} - ${endDate}`}
                    data={analytics
                        .getTopPurchaseStreaks(startDate, endDate, listsCount)
                        .map((obj) => ({
                            key: `${obj.days} days`,
                            value: `${new Date(obj.startDate).toLocaleDateString()} - ${new Date(obj.endDate).toLocaleDateString()}`,
                        }))}
                />
            )}
            {listSelection === 'days-without-purchases' && (
                <List
                    id="days-without-purchases"
                    title="Longest consecutive days without purchases"
                    key={`${startDate} - ${endDate}`}
                    data={analytics
                        .getTopDroughtsBetweenPurchases(
                            startDate,
                            endDate,
                            listsCount
                        )
                        .map((obj) => ({
                            key: `${obj.days} days`,
                            value: `${new Date(obj.startDate).toLocaleDateString()} - ${new Date(obj.endDate).toLocaleDateString()}`,
                        }))}
                />
            )}
            <div className="overlay"></div>
        </section>
    );
};

export default TopStreaks;
