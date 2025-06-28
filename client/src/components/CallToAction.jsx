import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="text-center py-16 bg-[#f9fafb]">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Ready to make your website accessible?
      </h2>

      <Link to="/signup">
        <button className="px-6 py-3 bg-green-200 text-green-900 font-semibold rounded-full hover:bg-green-300 transition">
          Get Started
        </button>
      </Link>
    </section>
  );
};

export default CallToAction;
