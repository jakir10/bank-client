import { useState } from "react";
import axios from "axios";
// import toast from "react-hot-toast";
import { Toaster, toast } from "react-hot-toast";

const FdrAccountForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
    fatherName: "",
    motherName: "",
    dateOfBirth: "",
    nidNumber: "",
    selectedBank: "",
    bankAgentName: "",
  });

  // Define banks and their agents
  const banksWithAgents = {
    "Bank Asia": ["Ibrahim", "Imran", "Asif"],
    "City BAnk": ["Masud", "Yousuf", "Rashed"],
    "Prime Bank": ["Rafiq", "Shumon", "Omar"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "selectedBank") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        bankAgentName: "", // Reset agent name when a new bank is selected
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const validateInput = (value) => {
    // Regular expression to check for special characters or symbols
    const regex = /^[a-zA-Z\s]*$/;
    return regex.test(value);
  };

  const validateNidNumber = (value) => {
    // Regular expression to check if the value contains exactly 12 digits
    const regex = /^\d{12}$/;
    return regex.test(value);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Example Axios POST request
    try {
      const response = await axios.post(
        "http://localhost:5000/submits",
        formData
      );
      console.log(response.data); // Or any other logic based on response

      // Clear form data on successful submission
      setFormData({
        userName: "",
        fatherName: "",
        motherName: "",
        dateOfBirth: "",
        nidNumber: "",
        selectedBank: "",
        bankAgentName: "",
      });

      // Show success message
      toast.success("Form submitted successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      // Optionally handle errors, e.g., show error toast
      toast.error("Failed to submit the form.");
    }
  };

  const bankAgentOptions = formData.selectedBank
    ? banksWithAgents[formData.selectedBank]
    : [];

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <Toaster />
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Create FDR Account
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="userName"
            className="block text-gray-700 font-semibold mb-2"
          >
            User Name
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
              formData.userName.length !== 0 &&
              !validateInput(formData.userName)
                ? "border-red-500"
                : ""
            }`}
            placeholder="Enter User Name"
          />
          {formData.userName.length !== 0 &&
            !validateInput(formData.userName) && (
              <p className="text-red-500 text-xs mt-1">Invalid user name</p>
            )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="fatherName"
            className="block text-gray-700 font-semibold mb-2"
          >
            Father's Name
          </label>
          <input
            type="text"
            id="fatherName"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
              formData.fatherName.length !== 0 &&
              !validateInput(formData.fatherName)
                ? "border-red-500"
                : ""
            }`}
            placeholder="Enter Father's Name"
          />
          {formData.fatherName.length !== 0 &&
            !validateInput(formData.fatherName) && (
              <p className="text-red-500 text-xs mt-1">Invalid father's name</p>
            )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="motherName"
            className="block text-gray-700 font-semibold mb-2"
          >
            Mother's Name
          </label>
          <input
            type="text"
            id="motherName"
            name="motherName"
            value={formData.motherName}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
              formData.motherName.length !== 0 &&
              !validateInput(formData.motherName)
                ? "border-red-500"
                : ""
            }`}
            placeholder="Enter Mother's Name"
          />
          {formData.motherName.length !== 0 &&
            !validateInput(formData.motherName) && (
              <p className="text-red-500 text-xs mt-1">Invalid mother's name</p>
            )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="nidNumber"
            className="block text-gray-700 font-semibold mb-2"
          >
            NID Number
          </label>
          <input
            type="text"
            id="nidNumber"
            name="nidNumber"
            value={formData.nidNumber}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
              formData.nidNumber.length !== 0 &&
              (!validateNidNumber(formData.nidNumber) ||
                !validateInput(formData.nidNumber))
                ? "border-red-500"
                : ""
            }`}
            placeholder="Enter NID Number (12 digits)"
          />
          {formData.nidNumber.length !== 0 &&
            !validateNidNumber(formData.nidNumber) && (
              <p className="text-red-500 text-xs mt-1">
                NID number must be exactly 12 digits
              </p>
            )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="selectedBank"
            className="block text-gray-700 font-semibold mb-2"
          >
            Select Bank
          </label>
          <select
            id="selectedBank"
            name="selectedBank"
            value={formData.selectedBank}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Please select</option>
            {Object.keys(banksWithAgents).map((bankKey) => (
              <option key={bankKey} value={bankKey}>
                {bankKey.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {formData.selectedBank && (
          <div className="mb-4">
            <label
              htmlFor="bankAgentName"
              className="block text-gray-700 font-semibold mb-2"
            >
              Bank Agent Name
            </label>
            <select
              id="bankAgentName"
              name="bankAgentName"
              value={formData.bankAgentName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">Please select</option>
              {bankAgentOptions.map((agentName, index) => (
                <option key={index} value={agentName}>
                  {agentName}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FdrAccountForm;
