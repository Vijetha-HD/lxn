

import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ children, className = '', padded = true, darkMode, userRole }) => {
  const rolesWithDarkMode = [
    "Campaign Manager",
    "Candidate",
    "Data Analyst",
    "Field Organizer",
    "Communications Director",
  ];

  const enableDark = rolesWithDarkMode.includes(userRole) && darkMode;

  return (
    <div
      className={`
        ${padded ? 'p-5' : ''}
        rounded-xl shadow-md overflow-hidden
        transition-all duration-300
        hover:shadow-xl hover:scale-[1.02]
        ${enableDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  padded: PropTypes.bool,
  darkMode: PropTypes.bool,
  userRole: PropTypes.string,
};

export default Card;
