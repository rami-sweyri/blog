import React from "react";
import Alerts from "./alerts";
import Footer from "./footer";
import Header from "./header";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col justify-between w-full h-full min-h-screen ">
      <Header />
      <Alerts />
      <div className="flex flex-col w-full md:w-9/12">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
