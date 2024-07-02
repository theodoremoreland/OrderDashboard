// React
import { ReactElement, useContext } from 'react';

// MUI
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

// Context
import { DisplaySettingsContext } from '../../contexts/DisplaySettingsProvider';

// Styles
import './DisplaySettingsDialog.css';

interface Props {
    open: boolean
    handleClose: () => void
}

const DisplaySettingsModal = ({ open, handleClose }: Props): ReactElement => {
    const {
        barChartsCount,
        setBarChartsCount,
        listsCount,
        setListsCount,
    } = useContext(DisplaySettingsContext);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            className='DisplaySettingsDialog'
        >
            <DialogTitle className="form-title">Display Settings</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ color: 'white' }}>
                    Adjust the number of items displayed for bar charts and lists.
                </DialogContentText>
                <div className='settings'>
                        <FormControl>
                            <FormLabel id="lists-display-count" className='form-label'>Lists</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="lists-display-count"
                                name="controlled-lists-display-count"
                                value={listsCount}
                                onChange={(e) => setListsCount(parseInt(e.target.value) as 5 | 7 | 10)}
                            >
                                <FormControlLabel value={5} control={<Radio />} label="5" />
                                <FormControlLabel value={7} control={<Radio />} label="7" />
                                <FormControlLabel value={10} control={<Radio />} label="10" />
                            </RadioGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel id="bar-charts-display-count" className='form-label'>Bar Charts</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="bar-charts-display-count"
                                name="controlled-bar-charts-display-count"
                                value={barChartsCount}
                                onChange={(e) => setBarChartsCount(parseInt(e.target.value) as 5 | 7 | 10)}
                            >
                                <FormControlLabel value={5} control={<Radio />} label="5" />
                                <FormControlLabel value={7} control={<Radio />} label="7" />
                                <FormControlLabel value={10} control={<Radio />} label="10" />
                            </RadioGroup>
                        </FormControl>
                    </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DisplaySettingsModal;
