import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

const Label = ({ value, args, labelFor}) => {
  if (args != null) {
    return (
      <label className="sds-label" htmlFor={labelFor}>
        <FormattedMessage id={value} values={args} />
      </label>
    );
  }
  return (
    <label className="sds-label" htmlFor={labelFor}>
      <FormattedMessage id={value} />
    </label>
  );
};

Label.propTypes = {
  value: PropTypes.string.isRequired,
  args: PropTypes.object,
  labelFor: PropTypes.string
};

export default Label;
