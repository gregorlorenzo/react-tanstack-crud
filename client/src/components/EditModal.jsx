import { useQueryClient } from "@tanstack/react-query";

const EditModal = ({ isOpen, onClose, rowData, columns }) => {
    if (!isOpen || !rowData) return null;
    const updatedColumns = columns.slice(0, -1); // excluding action column

    function convertISOtoYYYYMMDD(isoString) {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    rowData.birthday = convertISOtoYYYYMMDD(rowData.birthday)

    const queryClient = useQueryClient();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {};
        updatedColumns.forEach((column) => {
            formData[column.accessorKey] = e.target.elements[column.accessorKey].value;
        });

        if (formData.birthday) {
            const birthday = new Date(formData.birthday);
            formData.birthday = birthday.toISOString();
        }

        const response = await fetch(`http://localhost:8000/api/v1/idols/${rowData._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
            console.log(data);

            // Invalidate the cache to refetch the data
            queryClient.invalidateQueries(["idols"]);

            onClose();
        } else {
            console.error(data);
        }
    };


    return (
        <div
            aria-hidden="true"
            className="fixed top-0 right-0 bottom-0 left-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
            <div className="relative p-4 w-full max-w-md max-h-full">

                <div className="relative bg-white rounded-lg shadow">

                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Edit Idol
                        </h3>
                        <button
                            onClick={onClose}
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                        {updatedColumns.map((column) => (
                            <div key={column.accessorKey} className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label htmlFor={column.accessorKey} className="block mb-2 text-sm font-medium text-gray-900">
                                        {column.header}
                                    </label>
                                    <input
                                        type={column.type || 'text'}
                                        name={column.accessorKey}
                                        id={column.accessorKey}
                                        defaultValue={rowData[column.accessorKey]} // Populate with existing data
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder={`Enter ${column.header}`}
                                        required=""
                                    />
                                </div>
                            </div>
                        ))}
                        <button
                            type="submit"
                            className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Update Idol
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditModal