// React
import { ReactElement } from "react";

// MUI X
import { DataGrid, GridColDef } from "@mui/x-data-grid";

// Custom
import { Order } from "../types/types";

// Styles
import './DataGrid.css';

interface Props {
    data: (Omit<Order, 'date'> & { id: number, date: Date})[]
    pageSizeOptions: number[]
    pageSize: number
}

const columns: GridColDef<(Omit<Order, 'date'> & { id: number, date: Date})>[] = [
        // TODO make component accept arguments to display commented out columns optionally
    // { 
    //     field: 'id',
    //     headerName: 'Id'
    // },
    {
        field: 'date',
        headerName: 'Date',
        headerClassName: 'grid-header',
        type: 'date',
        flex: 1,
        minWidth: 150
    },
    {
        field: 'storeName',
        headerName: 'Store',
        headerClassName: 'grid-header',
        flex: 1,
        minWidth: 150
    },
    {
        field: 'cost',
        headerName: 'Cost',
        headerClassName: 'grid-header',
        type: 'number',
        valueFormatter: (_, row) => row.cost.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
        flex: 1,
        minWidth: 150
    },
    {
        field: 'itemCount',
        headerName: 'Item Count',
        headerClassName: 'grid-header',
        type: 'number',
        minWidth: 150
    },
    {
        field: 'items',
        headerName: 'Items',
        headerClassName: 'grid-header',
        valueFormatter: (_, row) => row.items.join(' • '),
        flex: 1,
        minWidth: 150,
        sortable: false,
    },
];

const Grid = ({ data, pageSize, pageSizeOptions }: Props): ReactElement => {
    return (
        <section className="Grid">
            <DataGrid
                sx={{
                    border: 'none',
                    color: 'white'
                }}
                rows={data}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize,
                        },
                    },
                    sorting: {
                        sortModel: [{ field: 'date', sort: 'desc' }],
                    },
                }}
                pageSizeOptions={pageSizeOptions}
            />
        </section>
    );
}

export default Grid;