import React from "react";
import LoggedInLayout from "../components/LoggedInLayout";

const Guidelines = () => {
  const openWCAG = () => {
    window.open("https://www.w3.org/WAI/standards-guidelines/wcag/", "_blank");
  };

  return (
    <LoggedInLayout>
      <main className="min-h-screen bg-gradient-to-tr from-purple-100 via-indigo-100 to-blue-100 py-10 px-4 flex justify-center items-center">
        <div className="bg-white/80 backdrop-blur-sm border border-purple-200 rounded-3xl shadow-xl p-10 max-w-2xl w-full text-center">
          <h1 className="text-4xl font-extrabold text-indigo-800 mb-4">
            Accessibility Guidelines
          </h1>
          <p className="text-gray-700 mb-6 text-lg">
            To make your websites usable by all, we recommend following the
            <span className="font-semibold text-indigo-700"> Web Content Accessibility Guidelines (WCAG)</span>.
          </p>

          <div className="flex justify-center">
            <button
              onClick={openWCAG}
              className="bg-indigo-600 hover:bg-indigo-700 transition px-6 py-3 rounded-full text-white font-semibold shadow-md"
            >
              View Official WCAG Guidelines
            </button>
          </div>
        </div>
      </main>
    </LoggedInLayout>
  );
};

export default Guidelines;
