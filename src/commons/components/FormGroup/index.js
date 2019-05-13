import _ from 'lodash';
import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import Caption from '../Caption';
import { FormattedMessage } from 'react-intl';

const FormGroup = ({ classModifiers, children, hasError, hasDisabled }) => {
  const classes = classnames(
      "sds-form-group",
      {
        "sds-form-group--error": !_.isEmpty(hasError),
        "sds-form-group--disabled": hasDisabled
      },
      classModifiers
  )

  return (
    <div className={classes}>
      {children}
      {!_.isEmpty(hasError) &&  <Caption>{<FormattedMessage id={hasError}/>}</Caption> }
    </div>
  );
};

FormGroup.propTypes = {
  hasError: PropTypes.string,
  hasDisabled: PropTypes.string
};

FormGroup.defaultProps = {
  hasError: null
};

export default FormGroup;
