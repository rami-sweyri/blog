import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="fixed top-0 flex items-center w-full h-12 px-6 text-sm text-white outline-none appearance-none bg-main-300">
      <Link to="/posts">posts</Link>
    </div>
  );
};

export default Header;
