import React from "react";
import PropTypes from "prop-types";
import Checkbox from "../Checkbox";
import classnames from "classnames";

const CheckboxGroup = ({ checkboxs, onChange, onBlur, classModifiers }) => {
    const listCheckboxs = checkboxs.items.map(checkbox =>
        <Checkbox key={checkbox.labelFor} onChange={onChange} onBlur={onBlur} name={checkboxs.name} {...checkbox} />
    );

    return (
        <div className={classnames("sds-checkbox-col sds-checkbox-group", classModifiers)}>
            { listCheckboxs }
        </div>
    )
};

CheckboxGroup.propTypes = {    
    checkboxs: PropTypes.object.isRequired,
    classModifiers: PropTypes.string
};

export default CheckboxGroup;