import React from "react";
import classNames from "classnames";
import { elementType } from "prop-types-extra";
import PropTypes from "prop-types";

const DEVICE_SIZES = ["s", "xl", "lg", "md", "sm", "xs"];

class Col extends React.Component {
  render() {
    const { classModifiers, as: Component, children, ...props } = this.props;

    const spans = [];

    DEVICE_SIZES.forEach(brkPoint => {
      let propValue = this.props[brkPoint];
      if (!propValue) return;
      let span = propValue;
      spans.push(`sds-col-${brkPoint}-${span}`);
    });
    if (!spans.length) {
      spans.push("sds-col"); // plain 'col'
    }

    return (
      <Component { ...props } className={classNames(...spans, classModifiers)}>
        {children}
      </Component>
    );
  }
}

Col.propTypes = {
  classModifiers: PropTypes.string,
  as: elementType,
  /**
   * The number of columns to span on sxtra small devices (<576px)
   */
  xs: PropTypes.number,
  /**
   * The number of columns to span on small devices (≥576px)
   */
  sm: PropTypes.number,
  /**
   * The number of columns to span on medium devices (≥768px)
   */
  md: PropTypes.number,
  /**
   * The number of columns to span on large devices (≥992px)
   */
  lg: PropTypes.number,
  /**
   * The number of columns to span on extra large devices (≥1200px)
   */
  xl: PropTypes.number
};
Col.defaultProps = {
  as: "div"
};

export default Col;
