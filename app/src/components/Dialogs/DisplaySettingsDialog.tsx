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
        topStoresCount,
        setTopStoresCount,
        topStreaksCount,
        setTopStreaksCount,
    } = useContext(DisplaySettingsContext);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            className='DisplaySettingsDialog'
        >
            <DialogTitle>Display Settings</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ color: 'white' }}>
                    Adjust the number of items displayed in the Top Streaks list and/or Top Stores bar graph.
                </DialogContentText>
                <div className='settings'>
                        <FormControl>
                            <FormLabel id="top-streaks-count" className='form-label'>Top Streaks</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="top-streaks-count"
                                name="controlled-top-streaks-count"
                                value={topStreaksCount}
                                onChange={(e) => setTopStreaksCount(parseInt(e.target.value) as 5 | 7 | 10)}
                            >
                                <FormControlLabel value={5} control={<Radio />} label="5" />
                                <FormControlLabel value={7} control={<Radio />} label="7" />
                                <FormControlLabel value={10} control={<Radio />} label="10" />
                            </RadioGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel id="top-stores-count" className='form-label'>Top Stores</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="top-stores-count"
                                name="controlled-top-stores-count"
                                value={topStoresCount}
                                onChange={(e) => setTopStoresCount(parseInt(e.target.value) as 5 | 7 | 10)}
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
