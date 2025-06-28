import React from "react";

const bgColor = {
  Serious: "bg-red-50 text-red-800 border-red-300",
  Moderate: "bg-yellow-50 text-yellow-800 border-yellow-300",
  Minor: "bg-blue-50 text-blue-800 border-blue-300",
};

const ReportItem = ({ title, description, severity, category, imageMap }) => {
  const image = imageMap[category] || imageMap.default;
  const classes = bgColor[severity] || "bg-gray-50 text-gray-800 border-gray-200";

  return (
    <div
      className={`flex flex-col sm:flex-row items-center gap-4 border-l-4 ${classes} rounded-xl p-4 shadow-md hover:shadow-lg transition backdrop-blur-sm`}
    >
      {/* Left Image */}
      <div className="w-full sm:w-32 h-32 flex-shrink-0">
        <img
          src={image}
          alt={category}
          className="w-full h-full object-contain rounded-md"
        />
      </div>

      {/* Text Content */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-sm mb-2">{description}</p>
        <span
          className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
            severity === "Serious"
              ? "bg-red-200 text-red-900"
              : severity === "Moderate"
              ? "bg-yellow-200 text-yellow-900"
              : "bg-blue-200 text-blue-900"
          }`}
        >
          {severity} Issue
        </span>
      </div>
    </div>
  );
};

export default ReportItem;
