import inclusivity from '../assets/images/inclusivity.png';
import userExperience from '../assets/images/user-experience.png';
import widerReach from '../assets/images/wider-reach.png';

const cards = [
  {
    img: inclusivity,
    title: "Inclusivity",
    description:
      "Ensure everyone can access your website, regardless of their abilities.",
    bg: "bg-[#FFFBEA]",
  },
  {
    img: userExperience,
    title: "Improved User Experience",
    description:
      "Accessibility features often improve the experience for all users, not just those with disabilities.",
    bg: "bg-[#EAFDFE]",
  },
  {
    img: widerReach,
    title: "Wider Reach",
    description:
      "Reach a larger audience by making your website accessible to people with disabilities.",
    bg: "bg-[#F9F0FF]",
  },
];

const WhyAccessibilityMatters = () => {
  return (
    <section className="px-6 md:px-20 py-16">
      {/* Styled heading */}
      <div className="text-center mb-12">
        <h3 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">
          Why Accessibility Matters
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
          Accessibility ensures that everyone can access and interact with your website.
          It’s about inclusivity, equal opportunity, and wider reach for all.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`p-6 rounded-2xl ${card.bg} shadow hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`}
          >
            <img
              src={card.img}
              alt={card.title}
              className="w-full h-40 object-cover rounded-xl mb-5"
            />
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              {card.title}
            </h4>
            <p className="text-sm text-gray-700">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyAccessibilityMatters;
