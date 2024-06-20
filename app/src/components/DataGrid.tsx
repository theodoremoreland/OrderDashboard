// React
import { ReactElement } from "react";

// MUI X
import { DataGrid, GridColDef } from "@mui/x-data-grid";

// Custom
import { Order } from "../types/types";

interface Props {
    data: Order[]
}

// "storeName": string,
// /** String of format: Oct 13 2023 */
// "date": DateFormat,
// "cost": number,
// "itemCount": number,
// "items": string[],
// "wasCancelled": boolean,
// "dayOfWeek": WeekDayFormat

const columns: GridColDef<Order>[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'storeName',
        headerName: 'Store',
        width: 150,
    },
    {
        field: 'cost',
        headerName: 'Cost',
        width: 150,
    },
    {
        field: 'itemCount',
        headerName: 'Item Count',
        type: 'number',
        width: 110,
    },
    {
        field: 'date',
        headerName: 'Date',
        type: 'date',
        width: 110,
    },
];

const Grid = ({ data }: Props): ReactElement => {
    return (
        <div>
            <DataGrid
                rows={data}
                columns={columns}
                initialState={{
                    pagination: {
                    paginationModel: {
                        pageSize: 5,
                    },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </div>
    );
}

export default Grid;