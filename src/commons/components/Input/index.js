import React from 'react';
import PropTypes from "prop-types";
import classnames from 'classnames';
import { msg } from '../../i18n/intl';

const Input = ({ value, type, onChange, onBlur, focus, placeholder, classModifiers }) => {
    const classes = classnames(
        "sds-input",
        {
            "sds-input--focus": focus
        },
        classModifiers
    );

    return (
        <input
            type={type ? type : 'text'}
            value={value}
            placeholder={msg(placeholder)}
            onChange={onChange}
            onBlur={onBlur}
            className={classes}
        />
    )
};

Input.propTypes = {
    type: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    classModifiers: PropTypes.string
}

export default Input;