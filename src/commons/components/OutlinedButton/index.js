import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import classnames from "classnames";

const OutlinedButton = ({ waves, primary, secondary, label, onClick, children, classModifiers, loading }) => (
  <Button
    classModifiers={classnames("sds-btn--outlined", classModifiers)}
    waves={waves}
    primary={primary}
    secondary={secondary}
    label={label}
    onClick={onClick}
    loading={loading}
  >
    {children}
  </Button>
);

OutlinedButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  classModifiers: PropTypes.string,
};

export default OutlinedButton;
