// React
import { ReactElement } from "react";

// MUI X
import { DataGrid, GridColDef } from "@mui/x-data-grid";

// Custom
import { Order } from "../types/types";

interface Props {
    data: (Omit<Order, 'date'> & { id: number, date: Date})[]
}

const columns: GridColDef<(Omit<Order, 'date'> & { id: number, date: Date})>[] = [
    { 
        field: 'id',
        headerName: 'ID'
    },
    {
        field: 'storeName',
        headerName: 'Store',
    },
    {
        field: 'cost',
        headerName: 'Cost',
        type: 'number',
        valueGetter: (_, row) => row.cost.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
    },
    {
        field: 'itemCount',
        headerName: 'Item Count',
        type: 'number',
    },
    {
        field: 'date',
        headerName: 'Date',
        type: 'date',
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