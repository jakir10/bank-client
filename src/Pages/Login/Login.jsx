import { useState } from "react";

const AuthForm = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    role: "",
    bankName: "",
    userName: "",
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let tempErrors = {};
    if (isSignUp) {
      if (!formState.userName.trim())
        tempErrors.userName = "User Name is required";
      if (!formState.bankName.trim())
        tempErrors.bankName = "Bank Name is required";
      if (!formState.role.trim()) tempErrors.role = "Role is required";
    }
    if (!formState.email.trim()) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formState.email))
      tempErrors.email = "Email is invalid";
    if (!formState.password) tempErrors.password = "Password is required";
    else if (formState.password.length < 6)
      tempErrors.password = "Password must be at least 6 characters long";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Proceed with form submission (e.g., send data to backend)
      console.log("Form is valid:", formState);
    } else {
      console.log("Form has errors");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isSignUp ? "Sign up" : "Sign in"}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {isSignUp && (
            <>
              <div>
                <input
                  type="text"
                  name="userName"
                  value={formState.userName}
                  onChange={handleChange}
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                    errors.userName ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="User Name"
                />
                {errors.userName && (
                  <p className="text-red-500 text-xs italic">
                    {errors.userName}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="bankName"
                  value={formState.bankName}
                  onChange={handleChange}
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                    errors.bankName ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Bank Name"
                />
                {errors.bankName && (
                  <p className="text-red-500 text-xs italic">
                    {errors.bankName}
                  </p>
                )}
              </div>
              <div>
                <select
                  name="role"
                  value={formState.role}
                  onChange={handleChange}
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                    errors.role ? "border-red-500" : "border-gray-300"
                  } bg-white text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                >
                  <option value="">Select your role</option>
                  <option value="bank-agent">Bank Agent</option>
                  <option value="bangladesh-bank-agent">
                    Bangladesh Bank Agent
                  </option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-xs italic">{errors.role}</p>
                )}
              </div>
            </>
          )}
          <div>
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
              placeholder="Email address"
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">{errors.email}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">{errors.password}</p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </form>
        <div className="flex justify-center">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setFormState({
                email: "",
                password: "",
                role: "",
                bankName: "",
                userName: "",
              });
              setErrors({});
            }}
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
          >
            {isSignUp
              ? "Already have an account? Sign In"
              : "Don’t have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
