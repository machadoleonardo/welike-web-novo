import React from 'react';

const FormGroup = ({ classes, children, ...props }) => (
    <div className={classes} {...props}>{children}</div>
);

export default FormGroup;