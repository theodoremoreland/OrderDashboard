// React
import { ReactElement, useContext } from 'react';

// MUI
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// Zod
import { z } from 'zod';

// Context
import { DataContext } from '../../contexts/DataContextProvider';

// Styles
import './DataUploadDialog.css';

const ordersSchema = z.object({
    storeName: z.string(),
    date: z.string().refine((date) => /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{1,2} \d{4}$/.test(date), "Invalid data format. JSON Data must contain a date in the format of: 'Oct 13 2023'"),
    cost: z.number(),
    itemCount: z.number(),
    items: z.array(z.string()),
    wasCancelled: z.boolean(),
    dayOfWeek: z.string().refine((dayOfWeek) => /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)$/.test(dayOfWeek), "Invalid data format. JSON data must contain a day of the week in the format of: 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'"),
});

interface Props {
    open: boolean
    handleClose: () => void
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const DataUploadDialog = ({ open, handleClose }: Props): ReactElement => {
    const { setRawData } = useContext(DataContext);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            className='DataUploadDialog'
        >
            <DialogTitle className="form-title"></DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ color: 'white' }}>
                    Upload your own data and see it visualized!
                </DialogContentText>
                <div className='settings'>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        >
                            Upload file
                        <VisuallyHiddenInput type="file" onChange={(e) => {
                            const fileList: FileList | null = e.target.files;
                            const file: File | undefined = fileList?.[0];
                            const reader = new FileReader();

                            if (!file) {
                                return;
                            }

                            reader.onload = (e) => {
                                const rawData = JSON.parse(e.target?.result as string);

                                try {
                                    rawData.forEach((order: unknown) => {
                                        ordersSchema.parse(order);
                                    });

                                    setRawData(rawData);
                                    handleClose();
                                } catch (error) {
                                    const errorMessage: string = error instanceof Error ? error.message : 'An error occurred';

                                    alert(errorMessage);
                                }
                            }

                            reader.readAsText(file);
                        }}/>
                    </Button>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DataUploadDialog;
