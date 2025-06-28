import React, { useEffect } from 'react';
import './HowItWorks.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

import step1 from '../assets/steps/step1.png';
import step2 from '../assets/steps/step2.png';
import step3 from '../assets/steps/step3.png';
import step4 from '../assets/steps/step4.png';

const steps = [
  {
    step: "Step 1",
    title: "Enter URL",
    img: step1,
    back: {
      icon: "🔗",
      text: "Paste the website link you want to analyze.",
      bg: "bg-[#E1F5FE]",
    },
    frontColor: "bg-[#E0F7FA]",
  },
  {
    step: "Step 2",
    title: "Click Analyze",
    img: step2,
    back: {
      icon: "🧪",
      text: "Click the analyze button to start scanning.",
      bg: "bg-[#E8F5E9]",
    },
    frontColor: "bg-[#F1F8E9]",
  },
  {
    step: "Step 3",
    title: "View Report",
    img: step3,
    back: {
      icon: "📊",
      text: "Get a detailed accessibility report instantly.",
      bg: "bg-[#FFF8E1]",
    },
    frontColor: "bg-[#FFF3E0]",
  },
  {
    step: "Step 4",
    title: "Improve Site",
    img: step4,
    back: {
      icon: "🛠️",
      text: "Use the report to fix and improve your site.",
      bg: "bg-[#EDE7F6]",
    },
    frontColor: "bg-[#EDE7F6]",
  },
];

const HowItWorks = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <section className="px-6 py-20 bg-[#f3f4f6]">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
        How It Works
      </h2>

      <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <div key={index} className="relative flex flex-col items-center">
            {/* Card */}
            <div className="flip-card" data-aos="fade-up">
              <div className="flip-card-inner">
                {/* Front Side */}
                <div className={`flip-card-front ${step.frontColor} rounded-xl shadow-lg p-4 flex flex-col items-center justify-center text-center`}>
                  <p className="text-sm font-semibold text-gray-600">{step.step}</p>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h4>
                  <img src={step.img} alt={step.title} className="w-20 h-20 object-contain mt-2" />
                </div>

                {/* Back Side */}
                <div className={`flip-card-back ${step.back.bg} rounded-xl shadow-lg p-6 flex flex-col items-center justify-center text-center text-gray-700`}>
                  <div className="text-3xl mb-2">{step.back.icon}</div>
                  <p className="text-sm font-medium max-w-[90%]">{step.back.text}</p>
                </div>
              </div>
            </div>

            {/* Arrow */}
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute -right-6 top-1/2 transform -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
