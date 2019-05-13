import React from 'react';
import InputFeedback from './inputFeedBack';
import classnames from "classnames";

import { msg } from '../../i18n/intl'

const Radio = ({
  field: { name, value, onChange, onBlur },
  form: { errors, touched, setFieldValue },
  id,
  label,
  className,
  classModifiers,
  ...props
}) => {
  return (
    <div className={classnames("sds-radio", classModifiers)}>
      <input
        name={name}
        id={id}
        type="radio"
        value={id}
        checked={id === value}
        onChange={onChange}
        onBlur={onBlur}
        className={classnames("radio-button")}
        {...props}
      />
      <label
        htmlFor={id}
        className="sds-radio__label">
        {msg(label)}
      </label>
      {errors[name] && <InputFeedback error={errors[name]} />}
    </div>
  );
};

export default Radio; 