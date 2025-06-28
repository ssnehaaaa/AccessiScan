import { Link, useNavigate } from "react-router-dom";
import { useResetRecoilState } from "recoil";
import { authState } from "../recoil/authAtom";
import logo from "../assets/logo.png"; // ✅ Make sure this path is correct

const AnalyzeNavbar = () => {
  const resetAuth = useResetRecoilState(authState);
  const navigate = useNavigate();

  const handleLogout = () => {
    resetAuth();
    localStorage.removeItem("auth");
    navigate("/signin");
  };

  return (
    <nav className="w-full bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 shadow-md px-6 py-4 flex justify-between items-center border-b border-indigo-200">
      {/* Logo + Name */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="AccessiScan Logo" className="h-9 w-9 object-contain" />
        <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          AccessiScan
        </h1>
      </div>

      {/* Nav Buttons */}
      <div className="flex gap-4 text-sm font-medium">
        <Link
          to="/dashboard"
          className="px-4 py-2 rounded-md text-indigo-700 hover:bg-indigo-100 hover:text-indigo-900 transition duration-200"
        >
          Dashboard
        </Link>
        <Link
          to="/analyze"
          className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition duration-200 shadow-sm"
        >
          New Analysis
        </Link>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition duration-200 shadow-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AnalyzeNavbar;
