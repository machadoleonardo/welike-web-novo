import React from 'react';
import PropTypes from "prop-types";
import Button from '../Button';
import classnames from "classnames";
import IconMaterial from '../IconMaterial';

const ButtonIcon = ({ icon, onClick, innerInput, secondary, classModifiers, classModifiersIcon, readonly }) => {
    
    const classes = classnames(
        "sds-btn--icon",
        { 
            "sds-input__icon": innerInput,
            "sds-btn--readonly": readonly
        },
        classModifiers
    );

    return (
        <Button
            type="button"
            onClick={onClick}
            secondary={secondary}
            classModifiers={classes}
        >
            <IconMaterial icon={icon} classModifiers={classModifiersIcon} />
        </Button>
    )
};

ButtonIcon.propTypes = {
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    classModifiers: PropTypes.string
};

ButtonIcon.defaultProps = {
    innerInput: true
};

export default ButtonIcon;