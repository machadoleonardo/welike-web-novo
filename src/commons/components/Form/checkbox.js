import React from 'react';
import InputFeedback from './inputFeedBack';
import classnames from "classnames";
import { msg } from '../../i18n/intl';

const Checkbox = ({
  field: { name, value, onChange, onBlur },
  form: { errors, touched, setFieldValue },
  id,
  label,
  className,
  classModifiers,
  ...props
}) => {
  return (
    <div className={classnames("sds-checkbox sds-checkbox-custom", classModifiers)}>
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <label htmlFor={id}>
        <i className="material-icons icon">check</i>
        {msg(label)}
      </label>
      {errors[name] && <InputFeedback error={errors[name]} />}
    </div>
  );
};

export default Checkbox; 