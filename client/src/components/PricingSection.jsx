import React from 'react';

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    features: ["Scan up to 5 pages/month", "Basic accessibility report", "Email support"],
    button: "Get Started",
    bg: "bg-white",
    border: "border-green-300",
  },
  {
    name: "Pro",
    price: "$19/month",
    features: ["Unlimited scans", "Detailed audit reports", "Priority support"],
    button: "Upgrade Now",
    bg: "bg-[#e6f4f1]",
    border: "border-blue-400",
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: ["Team collaboration", "Custom branding", "Dedicated support"],
    button: "Contact Us",
    bg: "bg-[#fef6e0]",
    border: "border-yellow-400",
  },
];

const PricingSection = () => {
  return (
    <div className="py-16 px-6 bg-gradient-to-b from-[#f0f4f8] via-[#e7f5f0] to-[#fdfdfd]">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Our Pricing</h2>
      <p className="text-center text-gray-600 mb-12">Choose the plan that fits your accessibility needs.</p>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={`rounded-xl shadow-lg p-8 transition transform hover:scale-105 border-t-4 ${plan.bg} ${plan.border}`}
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">{plan.name}</h3>
            <p className="text-3xl font-bold text-gray-900 mb-6">{plan.price}</p>
            <ul className="space-y-2 text-gray-700 mb-6">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  ✅ <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
              {plan.button}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingSection;
