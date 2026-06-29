import React from 'react';

const Button = ({ name }) => {
  return (
    <div>
        <button className="px-3 py-1 mx-1 my-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium whitespace-nowrap">{name}</button>
    </div>
  );
};

export default Button;
