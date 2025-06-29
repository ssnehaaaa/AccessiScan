import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { authState } from "../recoil/authAtom";
import LoggedInLayout from "../components/LoggedInLayout";
import { Image, Circle, Keyboard } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, token } = useRecoilValue(authState);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch(`${BASE_URL}/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [token]);

  if (!user) {
    return (
      <LoggedInLayout>
        <h2 className="text-xl text-red-600 p-4">
          Error: User not found. Please sign in again.
        </h2>
      </LoggedInLayout>
    );
  }

  if (loading) {
    return (
      <LoggedInLayout>
        <p className="text-gray-700 p-6">Loading dashboard...</p>
      </LoggedInLayout>
    );
  }

  const {
    totalScans,
    issuesFound,
    complianceScore,
    recentActivity,
    topIssues,
    graphData,
  } = stats || {};

  return (
    <LoggedInLayout>
      <div className="bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 p-6 md:p-10 rounded-xl shadow-inner">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Welcome back, {user.firstName} {user.lastName}
      </h2>

      <div className="flex gap-4 mb-6">
        <button onClick={() => navigate("/analyze")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
         Start New Scan
        </button>
        <button onClick={() => navigate("/pastreports")}
        className="bg-gray-200 px-5 py-2 rounded-lg hover:bg-gray-300"
        >
        View Reports
       </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <StatCard title="Total Scans" value={totalScans} bg="bg-purple-100" />
        <StatCard title="Issues Found" value={issuesFound} bg="bg-red-100" />
        <StatCard title="Compliance Score" value={`${complianceScore}%`} bg="bg-green-100" />
      </div>

      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-3">Recent Activity</h3>
        <ul className="space-y-3">
          {recentActivity?.slice(0, 3).map((activity, idx) => (
            <li
              key={idx}
              className={`p-4 rounded-lg shadow-sm ${
                idx === 0 ? "bg-blue-50" : idx === 1 ? "bg-pink-50" : "bg-purple-50"
              }`}
            >
              <p className="text-gray-800 font-medium">
                {idx === 0
                  ? `Last scan: ${activity.url}`
                  : idx === 1
                  ? `Last issue found: ${activity.url}`
                  : `Last report generated: ${activity.url}`}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(activity.time).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3">Top Issues Summary</h3>
        <div className="space-y-4">
          {(topIssues || []).map((issue, idx) => {
            const icon =
              idx === 0 ? <Image size={20} /> : idx === 1 ? <Circle size={20} /> : <Keyboard size={20} />;
            return (
              <div
                key={issue.id}
                className="flex items-center gap-4 bg-orange-50 p-4 rounded-lg shadow-sm"
              >
                <div className="bg-white p-2 rounded-full shadow">{icon}</div>
                <div>
                  <p className="text-gray-800 font-medium capitalize">{issue.label}</p>
                  <p className="text-sm text-gray-500">{issue.count} occurrences</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3">Accessibility Score Over Time</h3>
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-lg shadow-sm">
          <p className="text-xl font-bold text-gray-800 mb-1">{complianceScore || 0}%</p>
          <p className="text-sm text-gray-600 mb-4">
            Based on recent scans <span className="text-green-600">↑</span>
          </p>

          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={graphData}>
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#4f46e5"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      </div>
    </LoggedInLayout>
  );
};

const StatCard = ({ title, value, bg }) => (
  <div className={`${bg} p-4 rounded-xl shadow-sm border border-gray-200 text-center`}>
    <h4 className="text-gray-600 text-sm">{title}</h4>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

export default Dashboard;
