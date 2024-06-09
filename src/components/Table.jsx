import { Toaster } from "react-hot-toast";

const Table = ({
  setShowModal,
  selectedCustomers,
  handleDeleteSelected,
  searchQuery,
  handleSearchChange,
  visibleCustomers,
  handlePageChange,
  handleSelectChange,
  getFinancialColor,
  getStatusColor,
  setRowsPerPage,
  currentPage,
  totalPages,
  rowsPerPage,
}) => {
  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false}></Toaster>
      </div>
      <div className="container">
        <header>
          <h1>Customer Data</h1>
          <button onClick={() => setShowModal(true)}>Add Customer</button>
        </header>
        <div className="controls">
          {selectedCustomers.length > 0 ? (
            <button onClick={handleDeleteSelected} className="delBtn">
              Delete Selected
            </button>
          ) : (
            <div></div>
          )}
          <input
            className="searchInput"
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Select</th>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Rate</th>
              <th>Balance</th>
              <th>Deposit</th>
            </tr>
          </thead>
          <tbody>
            {visibleCustomers.map((customer, inx) => (
              <tr
                key={inx}
                className={
                  selectedCustomers.includes(customer.id)
                    ? "selected"
                    : "notSelected"
                }
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedCustomers.includes(customer.id)}
                    onChange={(e) => handleSelectChange(e, customer.id)}
                  />
                </td>
                <td>{inx + 1}</td>
                <td>{customer.name}</td>
                <td>{customer.Description}</td>
                <td className={getStatusColor(customer.Status)}>
                  {customer.Status}
                </td>
                <td>{customer.Rate}</td>
                <td className={getFinancialColor(customer.Balance)}>
                  {customer.Balance}
                </td>
                <td>{customer.Deposit}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <div>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            {/* Dropdown for rows per page */}
            <select
              style={{ marginLeft: "10px" }}
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={15}>15 per page</option>
            </select>
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Table;
