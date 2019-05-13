import React from 'react';
 
const Label = ({ error, children, ...props }) => {
    <label className="sds-label" {...props}>{children}</label>
}

export default Label;