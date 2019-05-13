import React from 'react';
import PropTypes from "prop-types";
import classnames from "classnames";

const IconMaterial = ({ icon, classModifiers }) => (
    <i className={ classnames("material-icons", classModifiers) }>{icon}</i>
);

IconMaterial.propTypes = {
    icon: PropTypes.string.isRequired,
    classModifiers: PropTypes.string
}

export default IconMaterial;