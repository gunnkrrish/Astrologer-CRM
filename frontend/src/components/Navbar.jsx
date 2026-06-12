import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("user");

    navigate("/");

  };

  return (
    <nav className="bg-indigo-600 text-white px-8 py-4 flex justify-between items-center">

      <h1 className="font-bold text-2xl">
        🪐 Astrologer CRM
      </h1>

      <div className="space-x-6">

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/clients">
          Clients
        </Link>

        <Link to="/consultations">
          Consultations
        </Link>

        <button
          onClick={logout}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Logout
        </button>

      </div>

    </nav>
  );
};

export default Navbar;