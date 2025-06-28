import React from "react";
import LoggedInLayout from "../components/LoggedInLayout";
import { Mail, Phone } from "lucide-react";

const Support = () => {
  return (
    <LoggedInLayout>
      <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-10 px-4 flex justify-center items-center">
        <div className="bg-white/80 backdrop-blur-md border border-indigo-200 shadow-2xl rounded-3xl max-w-xl w-full p-10 text-center">
          <h1 className="text-4xl font-extrabold text-indigo-800 mb-4">
            Help & Support
          </h1>

          <div className="mt-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Contact Sneha Kumari
            </h2>
            <p className="flex items-center justify-center gap-2 text-gray-700 text-md mb-2">
              <Phone className="w-5 h-5 text-indigo-600" />
              9216760677
            </p>
            <p className="flex items-center justify-center gap-2 text-gray-700 text-md mb-4">
              <Mail className="w-5 h-5 text-indigo-600" />
              sneha057btece22@igdtuw.ac.in
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Feel free to reach out for any technical support or accessibility-related queries.
            </p>
          </div>
        </div>
      </main>
    </LoggedInLayout>
  );
};

export default Support;
