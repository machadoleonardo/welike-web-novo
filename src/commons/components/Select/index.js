import React from "react";
import PropTypes from "prop-types";
import { msg } from "../../i18n/intl";

const Select = ({
    items,
    name,
    value,
    onChange,
    onBlur,
    classModifers
}) => (
        <div className="sds-select-wrap">
            <select
                id={name}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                className={`sds-select sds-input ${classModifers}`}
                value={value}
            >
                {items.map((item, index) =>
                    <option
                        key={`${item.name}-${index}`}
                        value={item.value}>{msg(item.name)}</option>)
                }
            </select>

            <i className="material-icons sds-select__icon">arrow_drop_down</i>
            <span className="sds-select-wrap__overline" />
        </div>
    );

Select.defaultvalue = {
    value: ''
}

Select.propTypes = {
    name: PropTypes.string.isRequired,
    items: PropTypes.array
}

export default Select;
