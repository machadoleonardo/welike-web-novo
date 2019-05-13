import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { elementType } from "prop-types-extra";

class Row extends Component {
  render() {
    const { as: Component, classModifiers, children, ...props } = this.props;

    return (
      <Component {...props} className={classNames("sds-row", classModifiers)}>
        {children}
      </Component>
    );
  }
}

Row.propTypes = {
  classModifiers: PropTypes.string,
  as: elementType
};

Row.defaultProps = {
  as: "div"
};

export default Row;
