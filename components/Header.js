import React from "react";

const Header = ({ nameCollege }) => {
  return (
    <div className="flex justify-center bg-white py-1 items-center">
      <div className="w-10 h-10 bg-gray-600 text-white p-3 rounded-full flex items-center justify-center">
        B
      </div>
      <p className="text-gray-600 p-3 rounded-full flex items-center justify-center text-lg lg:text-xl">
        {nameCollege}
      </p>
    </div>
  );
};

export default Header;
