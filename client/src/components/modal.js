import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
const Modal = ({ show, onClose, children, width }) => {
  return (
    <div
      className={`${
        show ? "flex" : "hidden"
      } fixed z-50 justify-center items-center top-0 bottom-0 left-0 right-0 w-full h-full overflow-hidden`}>
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-50"></div>
      <div
        className={`absolute bg-main-100 rounded-lg p-9 shadow ${
          width ? width : "w-96"
        }`}>
        <div
          className={`absolute text-white text-2xl cursor-pointer right-3 top-3`}
          onClick={onClose}>
          <IoIosCloseCircle />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
