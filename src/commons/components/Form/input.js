import React from 'react'
import classnames from "classnames";
import { ErrorMessage } from 'formik';

import Label from './label'
import InputFeedback from './inputFeedBack'
import FormGroup from './formGroup'

const TextInput = ({
  field: { name, ...field },
  form: { touched, errors },
  className,
  label,
  ...props
}) => {
  const error = errors[name]
  const touch = touched[name]
  const classes = classnames(
    'sds-form-group',
    {
      'sds-form-group--error': !!error,
      'completed': !error
    },
    className
  )
  
  return (
    <FormGroup className={classes}>
      <Label htmlFor={name} error={error}>{label}</Label>
      <input
        id={name}
        className="sds-input"
        type="text"
        {...field}
        {...props}
      />
      <ErrorMessage component={InputFeedback} name={name} />
    </FormGroup>
  )
}
 
export default TextInput