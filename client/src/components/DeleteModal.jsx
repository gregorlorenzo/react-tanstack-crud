// DeleteModal.js
import { useQueryClient } from "@tanstack/react-query";

const DeleteModal = ({ isOpen, onClose, id }) => {
    if (!isOpen || !id) return null;

    const queryClient = useQueryClient();

    const handleConfirmDelete = async () => {
        // Send delete request to the API
        const response = await fetch(`http://localhost:8000/api/v1/idols/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            // Handle success
            console.log('Item deleted successfully');

            queryClient.invalidateQueries(["idols"]);

            onClose();
        } else {
            // Handle error
            console.error('Error deleting item');
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
                            Confirm Deletion
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

                    <div className="p-4 md:p-5">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this idol?
                        </p>
                    </div>

                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
                        <button onClick={handleConfirmDelete}  type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Delete</button>
                        <button type="button" className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
