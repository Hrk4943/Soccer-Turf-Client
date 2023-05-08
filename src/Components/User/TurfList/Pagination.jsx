const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex justify-center">
            <ul className="flex">
                {pageNumbers.map((number) => (
                    <li key={number}>
                        <button
                            className={'px-4 py-2 rounded-lg ${ number === currentPage ? "bg-blue-500 text-white" : "bg-white text-gray-800 hover:bg-gray-200" }'}
                            onClick={() => paginate(number)}
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pagination;