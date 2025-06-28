import React, { useState, useRef } from "react";
import { useRecoilValue } from "recoil";
import { accessibilityResultState } from "../recoil/scanResultAtom";
import LoggedInLayout from "../components/LoggedInLayout";
import ReportItem from "../components/ReportItem";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Images
import contrastImg from "../assets/issues/contrast.png";
import altTextImg from "../assets/issues/alttext.png";
import keyboardImg from "../assets/issues/keyboard.png";
import headingImg from "../assets/issues/heading.png";
import defaultImg from "../assets/issues/default.png";
import doclangImg from "../assets/issues/doclang.png";
import emptyImg from "../assets/issues/empty.png";
import formlabelImg from "../assets/issues/formlabel.png";

const categoryImageMap = {
  "color-contrast": contrastImg,
  "image-alt": altTextImg,
  "keyboard": keyboardImg,
  "region": keyboardImg,
  "html-has-lang": doclangImg,
  "heading-order": headingImg,
  "page-has-heading-one": headingImg,
  "empty-heading": emptyImg,
  "form-field-multiple-label": formlabelImg,
  default: defaultImg,
};

const getSeverityCount = (violations = []) => {
  const count = { serious: 0, moderate: 0, minor: 0 };
  violations.forEach((v) => {
    if (v.impact && count[v.impact] !== undefined) {
      count[v.impact]++;
    }
  });
  return count;
};

const ResultPage = () => {
  const result = useRecoilValue(accessibilityResultState);
  const [filter, setFilter] = useState("All");
  const reportRef = useRef();

  if (!result || !result.violations) {
    return (
      <LoggedInLayout>
        <p className="text-gray-600 text-center mt-10">
          No scan data available. Please go to Analyze and run a scan.
        </p>
      </LoggedInLayout>
    );
  }

  const { url, violations, timestamp } = result;
  const severityCount = getSeverityCount(violations);
  const score = Math.max(0, 100 - violations.length * 5);

  const filteredViolations =
    filter === "All"
      ? violations
      : violations.filter((v) => v.impact === filter.toLowerCase());

  // PDF download function
  const handleDownloadPDF = async () => {
    const input = reportRef.current;
    if (!input) return;

    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pageWidth;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("accessibility-report.pdf");
  };

  return (
    <LoggedInLayout>
      <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 via-pink-100 to-blue-50 p-6">
        <div
          ref={reportRef}
          className="max-w-6xl mx-auto bg-white/70 backdrop-blur-xl border border-purple-100 rounded-3xl shadow-2xl p-10 transition-all duration-300"
        >
          <h1 className="text-4xl font-bold text-indigo-700 mb-2">🌐 Accessibility Report</h1>
          <p className="text-sm text-gray-500 mb-1">
            Last scanned: {new Date(timestamp).toLocaleString()}
          </p>
          <p className="text-base font-medium text-gray-700 mb-6">
            URL: <span className="text-indigo-600 font-semibold">{url}</span>
          </p>

          {/* Score bar */}
          <div className="flex items-center gap-4 mb-6">
            <span className="font-semibold text-gray-700">Accessibility Score</span>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-blue-600"
                style={{ width: `${score}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-700 font-semibold">{score}%</span>
          </div>

          {/* Severity Badges */}
          <div className="flex flex-wrap gap-4 mb-6">
            <span className="bg-red-100 text-red-800 px-4 py-1 rounded-full font-semibold text-sm shadow-md">
              ❗ Serious ({severityCount.serious})
            </span>
            <span className="bg-yellow-100 text-yellow-800 px-4 py-1 rounded-full font-semibold text-sm shadow-md">
              ⚠️ Moderate ({severityCount.moderate})
            </span>
            <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full font-semibold text-sm shadow-md">
              🧾 Minor ({severityCount.minor})
            </span>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-6 border-b border-gray-300 mb-6 text-sm font-semibold text-gray-700">
            {["All", "Serious", "Moderate", "Minor"].map((level) => {
              const lower = level.toLowerCase();
              const count =
                level === "All" ? violations.length : severityCount[lower] || 0;

              return (
                <button
                  key={level}
                  onClick={() => setFilter(level)}
                  className={`pb-2 transition ${
                    filter === level
                      ? "text-indigo-600 border-b-2 border-indigo-600"
                      : "hover:text-indigo-500"
                  }`}
                >
                  {level} ({count})
                </button>
              );
            })}
          </div>

          {/* Issue Cards */}
          <div className="grid gap-6">
            {filteredViolations.map((v, index) => {
              const image =
                categoryImageMap[v.id] ||
                categoryImageMap[v.tags?.find((tag) => categoryImageMap[tag])] ||
                categoryImageMap.default;

              const capitalizedImpact =
                v.impact?.charAt(0).toUpperCase() + v.impact?.slice(1) || "Minor";

              return (
                <ReportItem
                  key={index}
                  title={v.help || "Untitled Issue"}
                  description={v.description || "No description provided."}
                  severity={capitalizedImpact}
                  category={v.id}
                  imageMap={{ [v.id]: image, default: defaultImg }}
                />
              );
            })}
          </div>
        </div>

        {/* Download Button */}
        <div className="flex justify-end mt-8">
          <button
            onClick={handleDownloadPDF}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold shadow-lg transition"
          >
            📄 Download Full Report
          </button>
        </div>
      </div>
    </LoggedInLayout>
  );
};

export default ResultPage;
