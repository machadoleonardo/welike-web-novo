import React, { Fragment } from 'react';
import PropTypes from "prop-types";

import { IconLoading } from '../Icon';
import IconMaterial from '../IconMaterial';

const LeadingIcon = ({ loading, icon }) => (
    <Fragment>
    {
        loading ?
        (
            <div className="sds-load__icon sds-input__leading-icon">
                <IconLoading />
            </div>
        ) : (
            <IconMaterial icon={ icon ? icon : 'search' } classModifiers="sds-input__leading-icon" />
        )
    }
    </Fragment>
);

LeadingIcon.propTypes = {
    loading: PropTypes.bool,
    icon: PropTypes.string,
};

export default LeadingIcon;