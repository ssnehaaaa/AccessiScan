import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import LoggedInLayout from "../components/LoggedInLayout";
import { accessibilityResultState } from "../recoil/scanResultAtom";
import { authState } from "../recoil/authAtom";
import { useRecoilValue } from "recoil";
import bgImage from "../assets/images/analyze-bg.png";

const AnalyzePage = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const setScanResult = useSetRecoilState(accessibilityResultState);
  const { token } = useRecoilValue(authState);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL;

  const handleAnalyze = async () => {
    if (!url) return alert("Please enter a URL");
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`,
         },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();

      if (!data || !data.violations) {
        alert("No valid data returned. The site might be blocking scans.");
        setLoading(false);
        return;
      }

      setScanResult(data);
      navigate("/results");
    } catch (error) {
      console.error("Error analyzing site:", error);
      alert("Failed to analyze the URL. The website might have blocked scanning or returned bad HTML.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoggedInLayout>
      <div className="flex items-center justify-center px-4 py-12">
        <div className="relative max-w-4xl w-full bg-[#f8f5ff]/90 rounded-3xl shadow-xl border border-purple-200 p-10 overflow-hidden flex flex-col items-center backdrop-blur-sm">
          <img src={bgImage} alt="Illustration" className="w-[300px] md:w-[400px] mb-6 z-10" />
          <div className="z-10 w-full text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
              Make the Web Usable for Everyone
            </h2>

            <div className="flex items-center justify-center gap-2 max-w-xl mx-auto mb-4">
              <input
                type="text"
                placeholder="Enter Website URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-grow py-3 px-4 rounded-l-full border border-gray-300 focus:outline-none text-gray-800"
              />
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-r-full font-semibold disabled:opacity-50"
              >
                {loading ? "Analyzing..." : "Analyze"}
              </button>
            </div>

            <p className="text-gray-600 my-2">OR</p>

            <button className="bg-gray-800 text-white px-5 py-2 rounded-md font-medium hover:bg-gray-700 transition">
              Upload HTML File
            </button>
          </div>
        </div>
      </div>
    </LoggedInLayout>
  );
};

export default AnalyzePage;
