import React from "react";
import PropTypes from "prop-types";
import Paragraph from "../Paragraph";

const AlertError = ({ message }) => (
  <div className="sds-alert sds-alert--error sds-margin-vertical">
    <Paragraph>{message}</Paragraph>
  </div>
);

AlertError.propTypes = {
  message: PropTypes.string.isRequired
};

export default AlertError;
