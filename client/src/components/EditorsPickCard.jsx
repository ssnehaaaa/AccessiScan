import React from 'react';

const EditorsPickCard = ({ title, description, image, buttonText, link }) => (
  <div className="flex items-start space-x-3 mb-6">
    <img src={`/images/${image}`} alt={title} className="w-16 h-20 object-cover rounded-md" />
    <div>
      <p className="text-xs text-rose-500 font-semibold mb-1">Featured</p>
      <h4 className="text-sm font-bold">{title}</h4>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <a href={link} target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded-full bg-gray-200 text-sm font-medium hover:bg-gray-300">{buttonText}</a>
    </div>
  </div>
);

export default EditorsPickCard;
