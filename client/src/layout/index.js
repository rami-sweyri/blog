import React from "react";
import Alerts from "./alerts";
import Footer from "./footer";
import Header from "./header";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col items-center w-full h-full min-h-screen bg-main-200 ">
      <Header />
      <Alerts />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
