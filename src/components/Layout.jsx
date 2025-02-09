import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <div className="main"></div>
      <div className="layout">
        <div className="sidebar">
          <div className="logo">Doc-App-Sys</div>
          <div className="menu">menu</div>
        </div>
        <div className="content">
          <div className="header">header</div>
          <div className="body">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
