import React from 'react';

const Tooltip = ({ label, children, direcao, classModifiers }) => {
  return (
    <span className="sds-tooltip">
      {children}
      <span className="sds-tooltip__content sds-tooltip__content--top-left">{label}</span>
    </span>
  );
};

export default Tooltip;