import { format } from "date-fns";
import { flexRender, useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CreateModalContainer from "./CreateModalContainer";
import EditModalContainer from "./EditModalContainer";
import DeleteModalContainer from "./DeleteModalContainer";

const BasicTable = () => {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [rowID, setRowID] = useState(null);
    const [currentRowData, setCurrentRowData] = useState(null);

    const handleClose = (modalType) => {
        switch (modalType) {
            case 'create':
                setIsCreateOpen(false);
                break;
            case 'edit':
                setIsEditOpen(false);
                break;
            case 'delete':
                setIsDeleteOpen(false);
                break;
            default:
                break;
        }
    };

    const handleOpen = (modalType, rowData) => {
        setIsCreateOpen(modalType === 'create');
        setIsEditOpen(modalType === 'edit');
        setIsDeleteOpen(modalType === 'delete');
        setRowID(modalType === 'delete' ? rowData : null);
        setCurrentRowData(modalType === 'edit' ? rowData : null);
    };

    const columns = [
        {
            header: "Birth Name",
            accessorKey: "birthName",
            type: "text"
        },
        {
            header: "Stage Name",
            accessorKey: "stageName",
            type: "text"
        },
        {
            header: "Position",
            accessorKey: "position",
            type: "text"
        },
        {
            header: "Birth Day",
            accessorKey: "birthday",
            cell: (info) => format(new Date(info.getValue()), "LLL do, yyyy"),
            type: "date"
        },
        {
            header: "Height (CM)",
            accessorKey: "height",
            type: "number"
        },
        {
            header: "Weight (KG)",
            accessorKey: "weight",
            type: "number"
        },
        {
            header: () => <span>Action</span>,
            accessorKey: "_id",
            cell: (info) => (
                <div className="flex gap-2">
                    <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs px-2 py-1.5"
                        onClick={() => handleOpen('edit', info.row.original)} >
                        Edit
                    </button>
                    <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-2 py-1.5"
                        onClick={() => handleOpen('delete', info.row.original._id)}>
                        Delete
                    </button>
                </div>
            ),
            enableSorting: false
        }
    ]

    const { data: serverData } = useQuery({
        queryKey: ["idols"],
        queryFn: async () => {
            const response = await fetch("http://localhost:8000/api/v1/idols");

            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }

            const result = await response.json();
            return result;
        }
    });

    const data = serverData ?? [];

    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState('');

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: sorting,
            globalFilter: filtering
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering
    });

    return (
        <div className='bg-white relative shadow-md sm:rounded-lg overflow-hidden'>
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="w-full md:w-1/2">
                    <form className="flex items-center">
                        <label htmlFor="simple-search" className="sr-only">
                            Search
                        </label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg
                                    aria-hidden="true"
                                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="simple-search"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2"
                                placeholder="Search"
                                required=""
                                value={filtering}
                                onChange={(e) => setFiltering(e.target.value)}
                            />
                        </div>
                    </form>
                </div>
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    <button
                        type="button"
                        className="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                        onClick={() => handleOpen('create')}
                    >
                        <svg
                            className="h-3.5 w-3.5 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path
                                clipRule="evenodd"
                                fillRule="evenodd"
                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            />
                        </svg>
                        Add New Idol
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-600">
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup._id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header._id} scope='col' className='px-6 py-3' onClick={header.column.getToggleSortingHandler()}>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                        {
                                            { asc: '⬆️', desc: '⬇️' }[header.column.getIsSorted() ?? null]
                                        }
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row._id} className='bg-white border-b'>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell._id} className='px-6 py-4'>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4">
                <div className="flex justify-start gap-2 mt-4">
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-2.5 me-2"
                        onClick={() => table.setPageIndex(0)}>First Page</button>
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-2.5 me-2 disabled:opacity-50"
                        disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>Previous Page</button>
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-2.5 me-2 disabled:opacity-50"
                        disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>Next Page</button>
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-2.5 me-2"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}>Last Page</button>
                </div>
            </nav>
            <CreateModalContainer isOpen={isCreateOpen} onClose={() => handleClose('create')} columns={columns} />
            <EditModalContainer isOpen={isEditOpen} onClose={() => handleClose('edit')} rowData={currentRowData} columns={columns} />
            <DeleteModalContainer isOpen={isDeleteOpen} onClose={() => handleClose('delete')} id={rowID} />
        </div>
    );
}

export default BasicTable;
