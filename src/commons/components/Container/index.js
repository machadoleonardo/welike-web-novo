import React from "react";
import classnames from "classnames";

const Container = ({ children, classModifiers }) => (
  <div className={classnames("sds-container", classModifiers)}>{children}</div>
);

export default Container;
