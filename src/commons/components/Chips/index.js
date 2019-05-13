import React from "react";
import PropTypes from "prop-types";
import ButtonIcon from "../ButtonIcon";

const Chips = ({ value, onCloseClick }) => (
  <div className="sds-input-chip__item">
    <span
      className="sds-input-chip__text"
      dangerouslySetInnerHTML={{ __html: value }}
    />

    <ButtonIcon
      icon="cancel" 
      innerInput={false}
      secondary={true} 
      onClick={onCloseClick} 
      classModifiers="sds-input-chip__btn"
      classModifiersIcon="sds-input-chip__icon"
    />
  </div>
);

Chips.KEY = "chips-key-";

Chips.propTypes = {
  value: PropTypes.string.isRequired
};

export default Chips;
