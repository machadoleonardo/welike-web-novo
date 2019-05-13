import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import classnames from "classnames";
import { IconLoading } from "../Icon";

const Button = ({ classModifiers, type, onClick, children, loading, disabled, label, waves, primary, secondary }) => {
  const classesBtns = {
    "sds-btn--primary": primary,
    "sds-btn--secondary": secondary,
    "sds-waves-effect": waves,
    "sds-btn--disabled": disabled,
    "sds-btn--loading": loading
  }
  return (
    <button
      type={type ? type : 'button'}
      className={classnames("sds-btn", classesBtns, classModifiers)}
      onClick={onClick}>
      {loading && <span className="sds-btn__load"><IconLoading /></span>}
      {label && <FormattedMessage id={label} />}
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  classModifiers: PropTypes.string,
  label: PropTypes.string,
  secondary: PropTypes.bool
};

export default Button;
