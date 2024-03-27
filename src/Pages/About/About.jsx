const About = () => {
  return (
    <div className="py-10 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            FDR Creation Process
          </h2>
          <p className="mt-4 text-gray-600 text-center">
            Welcome to our FDR (Fixed Deposit Receipt) creation portal. Discover
            the streamlined process to securely invest your funds.
          </p>
        </div>

        <div className="px-6 pt-0 pb-8 sm:px-10 sm:pt-0 sm:pb-10 lg:px-12 lg:pt-0 lg:pb-12">
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="flex-shrink-0">
                <svg
                  className="w-6 h-6 text-blue-500"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </span>
              <div className="ml-4">
                <p className="text-gray-700">
                  <strong>Step 1: Submission</strong>
                  <br />
                  Begin by filling out the FDR form with your deposit amount,
                  tenure, and personal details. This ensures we tailor the
                  investment to your needs.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0">
                <svg
                  className="w-6 h-6 text-blue-500"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M15 17h5l-1.405-1.405A2.033 2.033 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m4 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
              </span>
              <div className="ml-4">
                <p className="text-gray-700">
                  <strong>Step 2: Bank Agent Review</strong>
                  <br />
                  Our dedicated bank agents meticulously review your application
                  to ensure accuracy and compliance with our policies. We may
                  reach out for additional information if necessary.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0">
                <svg
                  className="w-6 h-6 text-blue-500"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </span>
              <div className="ml-4">
                <p className="text-gray-700">
                  <strong>Step 3: Bangladesh Bank Approval</strong>
                  <br />
                  Once approved internally, your application is forwarded to the
                  Bangladesh Bank for final approval. This is essential for
                  regulatory compliance and the processing of your FDR.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
