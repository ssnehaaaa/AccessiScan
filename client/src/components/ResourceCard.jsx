import React from 'react';

const resources = [
  {
    title: "Web Content Accessibility Guidelines (WCAG)",
    description: "The global standard for web accessibility maintained by the W3C.",
    image: "/images/resource1.png",
    link: "https://www.w3.org/WAI/standards-guidelines/wcag/",
    bgColor: "bg-[#E3F2FD]",
  },
  {
    title: "ARIA Accessibility Guide",
    description: "Accessible Rich Internet Applications specs and support for dynamic content.",
    image: "/images/resource2.png",
    link: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA",
    bgColor: "bg-[#FFF3E0]",
  },
  {
    title: "Accessibility in HTML",
    description: "Understand how to use semantic HTML for accessible websites.",
    image: "/images/resource3.png",
    link: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element",
    bgColor: "bg-[#E8F5E9]",
  },
  {
    title: "Using Screen Readers",
    description: "Learn how screen readers work and how to build for them.",
    image: "/images/resource4.png",
    link: "https://www.w3.org/WAI/people-use-web/tools-techniques/",
    bgColor: "bg-[#FFFDE7]",
  },
  {
    title: "Color Contrast Checker",
    description: "Test your color choices for accessibility and readability.",
    image: "/images/resource5.png",
    link: "https://webaim.org/resources/contrastchecker/",
    bgColor: "bg-[#F3E5F5]",
  },
  {
    title: "Keyboard Navigation Guide",
    description: "Ensure your site works without a mouse using keyboard shortcuts.",
    image: "/images/resource6.png",
    link: "https://webaim.org/techniques/keyboard/",
    bgColor: "bg-[#E0F2F1]",
  },
];

const editorsPicks = [
  {
    title: "Deque University",
    image: "/images/editor1.png",
    link: "https://dequeuniversity.com/",
    bgColor: "bg-[#E1F5FE]",
  },
  {
    title: "A11y Project",
    image: "/images/editor2.png",
    link: "https://www.a11yproject.com/",
    bgColor: "bg-[#FFF8E1]",
  },
];

const Resources = () => {
  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold text-center mb-12 text-[#1f2937]">Accessibility Resources</h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left: Main Resources Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-xl shadow-md hover:shadow-xl transform hover:scale-[1.02] transition duration-300 p-4 flex flex-col items-center text-center ${item.bgColor}`}
            >
              <img src={item.image} alt={item.title} className="w-24 h-24 mb-4 object-cover rounded-lg" />
              <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-700 mt-2">{item.description}</p>
            </a>
          ))}
        </div>

        {/* Right: Editor's Picks */}
        <div className="w-full lg:w-1/3">
          <h2 className="text-2xl font-bold mb-6 text-[#374151]">Editor's Picks</h2>
          <div className="space-y-6">
            {editorsPicks.map((pick, idx) => (
              <a
                key={idx}
                href={pick.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-4 rounded-xl p-4 shadow-md hover:shadow-lg transition duration-300 ${pick.bgColor}`}
              >
                <img src={pick.image} alt={pick.title} className="w-20 h-20 object-cover rounded-md" />
                <span className="text-md font-medium text-gray-800">{pick.title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
