import React from 'react';
import InputFeedback from './inputFeedBack';
import classnames from "classnames";
import { msg } from '../../i18n/intl';

const RadioGroup = ({
  value,
  error,
  touched,
  id,
  label,
  className,
  children
}) => {
  const classes = classnames(
    "sds-radio-col",
    {
      "is-success": value || (!error && touched),
      "is-error": !!error && touched
    },
    className
  );

  return (
    <div className={classes}>
      <label className="sds-label">{msg(label)}</label>
      <div className="sds-form-group">
        {children}
      </div>
      {touched && <InputFeedback error={error} />}
    </div>
  );
};

export default RadioGroup;