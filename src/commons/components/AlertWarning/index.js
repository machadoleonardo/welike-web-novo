import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

const AlertWarning = props => {
  return (
    <div className="sds-alert sds-alert--warning sds-margin-vertical">
      <p className="sds-p">
        <FormattedMessage id={props.message} />
      </p>
    </div>
  );
};

AlertWarning.propTypes = {
  message: PropTypes.string.isRequired
};

export default AlertWarning;
