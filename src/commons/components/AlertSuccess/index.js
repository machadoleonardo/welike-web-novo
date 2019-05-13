import React from "react";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";

const AlertSuccess = props => {
  return (
    <div className="sds-alert sds-alert--success sds-margin-vertical">
      <p className="sds-p">
        <FormattedMessage id={props.message} />
      </p>
    </div>
  );
};

AlertSuccess.propTypes = {
  message: PropTypes.string.isRequired
};

export default AlertSuccess;
