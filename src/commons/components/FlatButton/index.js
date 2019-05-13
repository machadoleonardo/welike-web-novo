import React from "react";
import Button from "../Button";
import PropTypes from "prop-types";
import classnames from "classnames";

const FlatButton = ({ classModifiers, onClick, children, label, secondary }) => {
  return (
    <Button
      classModifiers={classnames("sds-btn--flat", classModifiers)}
      label={label}
      secondary={secondary}
      onClick={onClick}
      children={children}
    />
  );
};

FlatButton.propTypes = {
  onClick: PropTypes.func,
  classModifiers: PropTypes.string,
  label: PropTypes.string
};

export default FlatButton;
