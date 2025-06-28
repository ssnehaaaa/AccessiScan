import disability from '../assets/images/disability.png';
import globalAccess from '../assets/images/global-access.png';
import inclusiveUX from '../assets/images/inclusive-ux.png';
import equityAccess from '../assets/images/equity-access.png';

const facts = [
  {
    image: disability,
    text: "1 in 4 adults live with a disability",
    bgColor: "bg-[#E0F7FA]",
  },
  {
    image: globalAccess,
    text: "Accessible websites reach a wider audience",
    bgColor: "bg-[#FFF3E0]",
  },
  {
    image: inclusiveUX,
    text: "Inclusive design improves user experience for everyone",
    bgColor: "bg-[#E8F5E9]",
  },
  {
    image: equityAccess,
    text: "Accessibility is not just a feature, it's a necessity",
    bgColor: "bg-[#F3E5F5]",
  },
];

const DidYouKnow = () => {
  return (
    <section className="-mt-10 px-6 py-16">
      <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-teal-500 to-emerald-500 text-transparent bg-clip-text mb-12">
        Did You Know?
        <div className="w-24 h-1 bg-emerald-400 rounded-full mx-auto mt-2"></div>

      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {facts.map((fact, index) => (
          <div
            key={index}
            className={`${fact.bgColor} p-6 rounded-2xl shadow-md hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 ease-in-out text-center cursor-pointer`}
          >
            <img
              src={fact.image}
              alt="Accessibility visual"
              className="mx-auto mb-5 h-24 object-contain"
            />
            <p className="text-gray-800 text-sm font-medium leading-relaxed">
              {fact.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DidYouKnow;
