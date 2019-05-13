import React, { PureComponent } from "react";
import classnames from "classnames";

import { ErrorMessage } from 'formik';

import Label from './label'
import InputFeedback from './inputFeedBack'
import FormGroup from './formGroup'

class Select extends PureComponent {

    handleChange = event => {
        const value = event.target.value;
        this.props.onChange(this.props.name, value);
    };

    handleBlur = () => {
        this.props.onBlur(this.props.name, true);
    };

    render() {
        const {
            name,
            errors,
            label,
            className,
        } = this.props;

        const error = errors;
        // const touch = touched.order;
        const classes = classnames(
            'sds-form-group',
            {
                'sds-form-group--error': !!error,
                'completed': !error
            },
            className
        );

        return (
            <FormGroup className={classes}>
                <Label htmlFor={name} error={error}>{label}</Label>

                <div className="sds-select-wrap">
                    <select
                        id={name}
                        className={`sds-select sds-input`}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                    >
                        {options.map((item, index) =>
                            <option key={`${index}`} value={item.value}>{item.label}</option>)
                        }
                    </select>

                    <i className="material-icons sds-select__icon">arrow_drop_down</i>
                    <span className="sds-select-wrap__overline" />
                </div>

                {errors && <ErrorMessage component={InputFeedback} name={name} />}
            </FormGroup>
        )
    }
}

export default Select;