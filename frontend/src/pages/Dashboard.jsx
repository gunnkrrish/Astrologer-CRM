import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import {
  FaUsers,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock
} from "react-icons/fa";

const Dashboard = () => {

  const [stats, setStats] = useState({
    totalClients: 0,
    totalConsultations: 0,
    completedConsultations: 0,
    upcomingConsultations: 0,
    recentClients: [],
  });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {

      setLoading(true);

      const res =
        await API.get("/dashboard");

      setStats(res.data);

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

    }
  };

  if (loading) {
    return (
      <h2 className="text-center mt-10">
        Loading...
      </h2>
    );
  }

  return (
    <>
      <Navbar />

      <div className="p-8">

        <h1 className="text-3xl font-bold mb-6">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white shadow-lg p-6 rounded-xl">
            <h2 className="flex items-center gap-2">
                <FaUsers />
                Total Clients
                </h2>
            <p className="text-3xl font-bold">
              {stats.totalClients}
            </p>
          </div>

          <div className="bg-white shadow-lg p-6 rounded-xl">
           <h2 className="flex items-center gap-2">
                <FaCalendarAlt />
                Total Consultations
                </h2>
            <p className="text-3xl font-bold">
              {stats.totalConsultations}
            </p>
          </div>

          <div className="bg-white shadow-lg p-6 rounded-xl">
            <h2 className="flex items-center gap-2">
            <FaCheckCircle />
            Completed
            </h2>
            <p className="text-3xl font-bold">
              {stats.completedConsultations}
            </p>
          </div>

          <div className="bg-white shadow-lg p-6 rounded-xl">
            <h2 className="flex items-center gap-2">
            <FaClock />
            Upcoming
            </h2>
            <p className="text-3xl font-bold">
              {stats.upcomingConsultations}
            </p>
          </div>

        </div>

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-4">
            Recent Clients
          </h2>

          {stats.recentClients?.length === 0 ? (
            <p>No Clients Yet</p>
          ) : (
            stats.recentClients.map((client) => (

              <div
                key={client._id}
                className="bg-white shadow p-4 rounded mb-2"
              >
                {client.name}
              </div>

            ))
          )}

        </div>

        <div className="text-center mt-10 text-gray-500">
          
        </div>

      </div>
    </>
  );
};

export default Dashboard;