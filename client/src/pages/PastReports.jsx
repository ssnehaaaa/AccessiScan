import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { accessibilityResultState } from "../recoil/scanResultAtom";
import { authState } from "../recoil/authAtom";
import LoggedInLayout from "../components/LoggedInLayout";

const PastReports = () => {
  const [reports, setReports] = useState([]);
  const { token } = useRecoilState(authState)[0];
  const [, setResult] = useRecoilState(accessibilityResultState);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/reports", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setReports(data);
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      }
    };

    fetchReports();
  }, [token]);

  const handleViewReport = (report) => {
    setResult({
      url: report.source,
      violations: report.results.violations,
      passes: report.results.passes,
      timestamp: report.createdAt,
      incomplete: report.results.incomplete || [],
    });
    navigate("/results");
  };

  return (
    <LoggedInLayout>
      <main className="p-6 md:p-10 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 min-h-screen">
        <h1 className="text-3xl font-bold text-indigo-800 mb-8">📂 Past Accessibility Reports</h1>

        <div className="flex flex-col gap-6">
          {reports.map((report) => {
            const score = Math.max(0, 100 - (report.results.violations?.length || 0) * 5);
            return (
              <div
                key={report._id}
                className="w-full bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 border border-purple-200 shadow-xl rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center transition-all hover:shadow-2xl"
              >
                <div className="mb-4 md:mb-0">
                  <h2 className="text-xl font-semibold text-gray-800 break-all">{report.source}</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Scanned on: {new Date(report.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <span className="text-lg font-bold text-blue-700">
                    Score: {score}%
                  </span>
                  <button
                    onClick={() => handleViewReport(report)}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow"
                  >
                    🔍 View Report
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </LoggedInLayout>
  );
};

export default PastReports;
