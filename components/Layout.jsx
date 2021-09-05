import React from "react";
import moduleCss from "../styles/Layout.module.css"

const Layout = ({ children }) => {
  return <div className={moduleCss.container}>{children}</div>;
};

export default Layout;
