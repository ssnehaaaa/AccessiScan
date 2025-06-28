import { useNavigate } from "react-router-dom";
import heroBg from '../assets/hero-bg.jpg'; // Make sure your generated image is here

const HeroSection = () => {
  const navigate = useNavigate();

  const handleAnalyzeClick = () => {
    navigate("/analyze"); // Temporary redirect to AnalyzePage
  };

  return (
    <section className="flex justify-center px-4 pt-16 pb-20">
      <div
        className="max-w-5xl w-full bg-white/90 rounded-3xl shadow-lg backdrop-blur-sm p-8 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="bg-white/70 p-6 rounded-2xl shadow-inner">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 text-center">
            Unlock the Power of Inclusive Web Design
          </h1>
          <p className="text-gray-600 mb-6 text-center">
            Analyze your website’s accessibility with AccessCheck and ensure a seamless experience for all users.
          </p>

          <div className="flex flex-col gap-4 items-center">
            <input
              type="text"
              placeholder="🔍 Enter URL"
              className="px-4 py-3 w-full sm:w-96 border rounded-full shadow-sm outline-none"
            />
            <button
              onClick={handleAnalyzeClick}
              className="bg-emerald-500 text-white px-6 py-3 rounded-full hover:bg-emerald-600"
            >
              Analyze Now
            </button>
            <button className="bg-white border border-gray-300 px-6 py-3 rounded-full hover:bg-gray-100 text-gray-800">
              Upload HTML File
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
