import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-700 h-screen flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to FDR Creation</h1>
        <p className="text-lg mb-6">
          Your premier destination for secure financial investments and wealth
          management services. At FDR Creation, we prioritize your financial
          goals and provide tailored solutions to help you achieve them. Whether
          you're planning for retirement, saving for a dream vacation, or
          securing your children's future, we're here to guide you every step of
          the way. Explore our range of investment options and start building a
          brighter financial future today.
        </p>
        <div className="flex justify-center">
          <Link to="/login">
            <button className="bg-white text-blue-500 hover:text-white hover:bg-blue-600 font-semibold py-2 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out">
              Explore More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
