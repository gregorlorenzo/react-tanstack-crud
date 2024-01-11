import { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';

const CreateModal = ({ isOpen, onClose, columns, addIdolMutation }) => {
  const [error, setError] = useState(null);
  const updatedColumns = columns.slice(0, -1);

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

    try {
      await addIdolMutation.mutateAsync(formData);
      console.log('Idol added successfully');
      onClose();
    } catch (error) {
      console.error('Error adding idol:', error.message);
      setError(error.message || 'An error occurred');
    }
  };

  return (
    <div className={`fixed top-0 right-0 bottom-0 left-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${isOpen ? '' : 'hidden'}`}>
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-lg font-semibold text-gray-900">Add New Idol</h3>
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
              Add new idol
            </button>
          </form>
          {error && <div className="text-red-500">{error}</div>}
        </div>
      </div>
    </div>
  );
};

const CreateModalContainer = ({ isOpen, onClose, columns }) => {
  const queryClient = useQueryClient();

  const addIdolMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await fetch('http://localhost:8000/api/v1/idols', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    },
    onSuccess: () => {
      console.log('Idol added successfully');
      queryClient.invalidateQueries({
        queryKey: ['idols'],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <CreateModal isOpen={isOpen} onClose={onClose} addIdolMutation={addIdolMutation} columns={columns} />
  );
};

export default CreateModalContainer;
