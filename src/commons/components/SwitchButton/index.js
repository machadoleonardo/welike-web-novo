import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

const SwitchButton = props => {
  const { isChecked, handleOnClick, label, componentId } = props;
  return (
    <label className="sds-switch" htmlFor={componentId}>
      <input
        type="checkbox"
        id={componentId}
        className="sds-switch__input"
        defaultChecked={isChecked}
        onClick={handleOnClick}
      />
      <span className="sds-switch__label">
        <FormattedMessage id={label} />
      </span>
      <span className="sds-switch__track" />
      <span className="sds-switch__thumb">
        <span className="sds-switch__focus-helper" />
      </span>
    </label>
  );
};

SwitchButton.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
  componentId: PropTypes.string,
  label: PropTypes.string
};

export default SwitchButton;
