import { useState, useEffect } from "react";
import axios from "axios";

const BankDashboard = () => {
  const [bankData, setBankData] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [statusChanged, setStatusChanged] = useState(false);
  const [updatedData, setUpdatedData] = useState(null); // State to track updated data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/submits");
        setBankData(response.data);
      } catch (error) {
        console.error("Error fetching bank data:", error);
      }
    };

    fetchData();
  }, []);

  const renderBanksWithAgents = () => {
    const banksWithAgents = {};

    // Organize data by banks
    bankData.forEach((bank) => {
      if (!banksWithAgents[bank.selectedBank]) {
        banksWithAgents[bank.selectedBank] = [];
      }
      if (!banksWithAgents[bank.selectedBank].includes(bank.bankAgentName)) {
        banksWithAgents[bank.selectedBank].push(bank.bankAgentName);
      }
    });

    return Object.entries(banksWithAgents).map(([bankName, agents]) => (
      <div key={bankName}>
        <h2 className="text-xl font-semibold">{bankName}</h2>
        <ul className="pl-4">
          {agents.map((agent, index) => (
            <li
              key={index}
              className="cursor-pointer"
              onClick={() => handleAgentClick(agent)}
            >
              {agent}
              {hasPendingSubmissions(agent) && (
                <span className="ml-2 bg-yellow-500 text-white rounded px-2">
                  Pending Submissions
                </span>
              )}
              {hasApprovedSubmissions(agent) && (
                <span className="ml-2 bg-green-500 text-white rounded px-2">
                  Approved Submissions
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    ));
  };

  const handleAgentClick = (agentName) => {
    setSelectedAgent(agentName);
    setStatusChanged(false); // Reset statusChanged state when agent changes
  };

  const hasPendingSubmissions = (agentName) => {
    // Check if the agent has any pending submissions
    return bankData.some(
      (data) => data.bankAgentName === agentName && data.status === "pending"
    );
  };

  const hasApprovedSubmissions = (agentName) => {
    // Check if the agent has any approved submissions
    return bankData.some(
      (data) => data.bankAgentName === agentName && data.status === "approved"
    );
  };

  const handleStatusChange = (id, status) => {
    // Update the status of a submission and set statusChanged state to true
    const updatedBankData = bankData.map((data) => {
      if (data._id === id) {
        setStatusChanged(true);
        const updatedDataItem = { ...data, status }; // Create an updated data item
        setUpdatedData(updatedDataItem); // Set updatedData
        return updatedDataItem; // Return updated data item
      }
      return data;
    });
    setBankData(updatedBankData);
  };

  const handleUpdateClick = async () => {
    try {
      if (updatedData) {
        const response = await axios.patch(
          `http://localhost:5000/submits/${updatedData._id}`,
          updatedData
        );
        console.log("Data sent to bank agent endpoint:", response.data);
        setStatusChanged(false); // Reset statusChanged state after successful update
        setUpdatedData(null); // Reset updatedData state
      } else {
        console.log("No data to update");
      }
    } catch (error) {
      console.error("Error sending data to bank agent endpoint:", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64 flex-none">
        <div className="p-4">
          <h1 className="text-2xl font-semibold">Bank List</h1>
          <ul className="mt-4">{renderBanksWithAgents()}</ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-semibold mb-8">Bank Dashboard</h1>
        {selectedAgent && (
          <div>
            <h2 className="text-xl font-semibold">{selectedAgent}</h2>
            <div className="flex flex-wrap -mx-4">
              {/* Render detailed information for the selected agent */}
              {bankData
                .filter((data) => data.bankAgentName === selectedAgent)
                .map((data, index) => (
                  <div
                    key={index}
                    className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 px-4 mb-8"
                  >
                    <div className="bg-gray-100 rounded-lg p-4">
                      <p>User Name: {data.userName}</p>
                      <p>Father's Name: {data.fatherName}</p>
                      <p>Mother's Name: {data.motherName}</p>
                      <p>Bank Agent Status: {data.status}</p>
                      {/* Add more fields as needed */}
                      <div className="mt-4">
                        {data.status !== "verified" && (
                          <>
                            <button
                              onClick={() =>
                                handleStatusChange(data._id, "pending")
                              }
                              className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                            >
                              Mark as Pending
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange(data._id, "approved")
                              }
                              className="bg-green-500 text-white px-2 py-1 rounded"
                            >
                              Mark as Approved
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
        {statusChanged && (
          <button
            onClick={handleUpdateClick}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Update
          </button>
        )}
      </div>
    </div>
  );
};

export default BankDashboard;
