import React from "react";
import Header from "../Header";

const index = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="">{children}</div>
    </div>
  );
};

export default index;
