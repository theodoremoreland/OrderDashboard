// React
import { ReactElement } from "react";

// MUI X
import { DataGrid, GridColDef } from "@mui/x-data-grid";

// Custom
import { Order } from "../types/types";

interface Props {
    data: (Omit<Order, 'date'> & { id: number, date: Date})[]
    pageSizeOptions: number[]
    pageSize: number
}

const columns: GridColDef<(Omit<Order, 'date'> & { id: number, date: Date})>[] = [
    { 
        field: 'id',
        headerName: 'Id'
    },
    {
        field: 'date',
        headerName: 'Date',
        type: 'date',
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
        field: 'items',
        headerName: 'Items',
        valueGetter: (_, row) => row.items.join(', '),
        flex: 1,
        sortable: false,
    },
];

const Grid = ({ data, pageSize, pageSizeOptions }: Props): ReactElement => {
    return (
        <section className="Grid">
            <DataGrid
                rows={data}
                columns={columns}
                initialState={{
                    pagination: {
                    paginationModel: {
                        pageSize,
                    },
                    },
                }}
                pageSizeOptions={pageSizeOptions}
            />
        </section>
    );
}

export default Grid;