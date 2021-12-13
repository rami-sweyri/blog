import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loader = ({ size }) => {
  return (
    <AiOutlineLoading3Quarters
      size={size}
      className="text-5xl text-white animate-spin"
    />
  );
};

export default Loader;
