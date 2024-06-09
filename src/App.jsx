import { useState } from "react";
import "./App.css";
import { customerDB } from "./CustomerDB";
import toast from "react-hot-toast";
import Table from "./components/Table";

function App() {
  const [customers, setCustomers] = useState(customerDB);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Open");
  const [rate, setRate] = useState("");
  const [balance, setBalance] = useState("");
  const [deposit, setDeposit] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleSelectChange = (event, id) => {
    if (event.target.checked) {
      setSelectedCustomers([...selectedCustomers, id]);
    } else {
      setSelectedCustomers(
        selectedCustomers.filter((customerId) => customerId !== id)
      );
    }
  };

  const handleDeleteSelected = () => {
    setCustomers(
      customers.filter((customer) => !selectedCustomers.includes(customer.id))
    );
    setSelectedCustomers([]);
    toast.success("Entries deleted successfully");
  };

  const filteredCustomers = customers?.filter(
    (customer) =>
      customer?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer?.Description?.toLowerCase().includes(
        searchQuery.toLowerCase()
      ) ||
      customer?.Status?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCustomers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const visibleCustomers = filteredCustomers.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Function to determine the color class for the Status field
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "green-text";
      case "unpaid":
        return "gray-text";
      case "due":
        return "red-text";
      case "open":
        return "purple-text";
      default:
        return "black-text";
    }
  };

  // Function to determine the color class for the financial fields
  const getFinancialColor = (value) => {
    // const valueString = String(value);
    return value.startsWith("-") ? "red-text" : "green-text";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCustomer = {
      id: customers.length + 1,
      name,
      Description: description,
      Status: status,
      Rate: rate,
      Balance: balance,
      Deposit: deposit,
    };
    setCustomers([...customers, newCustomer]);
    // toast.success("Customer added successfully");
    setShowModal(false);
    setName("");
    setDescription("");
    setStatus("Open");
    setRate("");
    setBalance("");
    setDeposit("");
  };

  if (showModal) {
    return (
      <>
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add Customer</h2>
            <form onSubmit={handleSubmit}>
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label>Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <label>Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Open">Open</option>
                <option value="Paid">Paid</option>
                <option value="Inactive">Inactive</option>
                <option value="Due">Due</option>
              </select>
              <label>Rate</label>
              <input
                type="text"
                value={rate}
                placeholder="$0.00"
                onChange={(e) => setRate(e.target.value)}
                required
              />
              <label>Balance</label>
              <input
                type="text"
                value={balance}
                placeholder="$0.00"
                onChange={(e) => setBalance(e.target.value)}
                required
              />
              <label>Deposit</label>
              <input
                type="text"
                value={deposit}
                placeholder="$0.00"
                onChange={(e) => setDeposit(e.target.value)}
                required
              />
              <button type="submit">Add</button>
              <button type="button" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Table
        setRowsPerPage={setRowsPerPage}
        selectedCustomers={selectedCustomers}
        handleDeleteSelected={handleDeleteSelected}
        handlePageChange={handlePageChange}
        handleSearchChange={handleSearchChange}
        handleSelectChange={handleSelectChange}
        searchQuery={searchQuery}
        visibleCustomers={visibleCustomers}
        getFinancialColor={getFinancialColor}
        getStatusColor={getStatusColor}
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        setShowModal={setShowModal}
      ></Table>
    </>
  );
}

export default App;
