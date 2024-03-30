import { useState, useEffect } from "react";
import axios from "axios";

const BangladeshBankDashboard = () => {
  const [bankData, setBankData] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming the endpoint provides all submissions, including those already verified
        const response = await axios.get("http://localhost:5000/submits");
        setBankData(response.data);
      } catch (error) {
        console.error("Error fetching bank data:", error);
      }
    };

    fetchData();
  }, []);

  const renderAgents = () => {
    // Filter to include only agents with 'approved' or 'verified' submissions
    const agents = bankData
      .filter(
        (data) => data.status === "approved" || data.status === "verified"
      )
      .map((data) => data.bankAgentName);

    const uniqueAgents = [...new Set(agents)];
    return uniqueAgents.map((agent, index) => (
      <li
        key={index}
        className="cursor-pointer"
        onClick={() => handleAgentClick(agent)}
      >
        {agent}
      </li>
    ));
  };

  const renderSubmissions = () => {
    if (!selectedAgent) return null;
    return bankData
      .filter(
        (data) =>
          data.bankAgentName === selectedAgent &&
          (data.status === "approved" || data.status === "verified")
      )
      .map((data, index) => (
        <div
          key={index}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 px-4 mb-8"
        >
          <div className="bg-gray-100 rounded-lg p-4">
            <p>User Name: {data.userName}</p>
            <p>Father's Name: {data.fatherName}</p>
            <p>Mother's Name: {data.motherName}</p>
            <p>Status: {data.status}</p>
            {data.status === "approved" && (
              <div className="mt-4">
                <button
                  onClick={() => handleStatusChange(data._id, "verified")}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Verify
                </button>
              </div>
            )}
          </div>
        </div>
      ));
  };

  const handleAgentClick = (agentName) => {
    setSelectedAgent(agentName);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/submits/${id}`, {
        status: newStatus,
      });
      const updatedBankData = bankData.map((data) => {
        if (data._id === id) {
          return { ...data, status: newStatus };
        }
        return data;
      });
      setBankData(updatedBankData);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="bg-gray-800 text-white w-64 flex-none">
        <div className="p-4">
          <h1 className="text-2xl font-semibold">Bangladesh Bank</h1>
          <ul className="mt-4">{renderAgents()}</ul>
        </div>
      </div>

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-semibold mb-8">
          Bangladesh Bank Dashboard
        </h1>
        <div className="flex flex-wrap -mx-4">{renderSubmissions()}</div>
      </div>
    </div>
  );
};

export default BangladeshBankDashboard;
