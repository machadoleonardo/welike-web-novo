import React from "react";
import Button from "../Button";
import PropTypes from "prop-types";
import classnames from "classnames";

const RaisedButton = ({ classModifiers, onClick, label, secondary }) => {
  return (
    <Button
      classModifiers={classnames("sds-btn--raised", classModifiers)}
      label={label}
      secondary={secondary}
      onClick={onClick}
    />
  );
};

RaisedButton.propTypes = {
  onClick: PropTypes.func,
  classModifiers: PropTypes.string,
  label: PropTypes.string.isRequired
};

export default RaisedButton;
