import React from 'react';

const navItems = [
  'general',
  'rainbow6',
  'valorant',
  'apex',
  'ready-or-not'
];

const NavBar = () => {
  return (
    <div className="bg-gray-900 text-white p-4">
      {navItems.map((item, index) => (
        <div key={index} className="py-2 px-4 hover:bg-gray-700">
          #{item}
        </div>
      ))}
    </div>
  );
};

export default NavBar;
