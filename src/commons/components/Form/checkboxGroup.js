import React, { PureComponent } from 'react';
import InputFeedback from './inputFeedBack';
import classnames from "classnames";
import { msg } from '../../i18n/intl';

class CheckboxGroup extends PureComponent {
  handleChange = event => {
    const target = event.currentTarget;
    let valueArray = [...this.props.value] || [];

    if (target.checked) {
      valueArray.push(target.id);
    } else {
      valueArray.splice(valueArray.indexOf(target.id), 1);
    }

    this.props.onChange(this.props.id, valueArray);
  };

  handleBlur = () => {
    this.props.onBlur(this.props.id, true);
  };

  render() {
    const { value, error, touched, label, className, classModifiers, children } = this.props;

    const classes = classnames(
      "sds-checkbox-col",
      {
        "is-success": value || (!error && touched),
        "is-error": !!error && touched
      },
      className,
      classModifiers
    );

    return (
      <div className="sds-form-group">
        <label className="sds-label">{msg(label)}</label>

        <div className={classes}>
          {React.Children.map(children, child => {
            return React.cloneElement(child, {
              field: {
                value: value.includes(child.props.id),
                onChange: this.handleChange,
                onBlur: this.handleBlur
              }
            });
          })}
        </div>

        {error && <InputFeedback error={error} />}
      </div>
    );
  }
}

export default CheckboxGroup;