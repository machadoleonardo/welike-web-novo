import React from "react";
import PropTypes from "prop-types";
import { msg } from "../../i18n/intl";
import { IconLoading } from "../Icon";

const Loading = props => {
  const { label } = props;
  return (
      <div className="sds-load">
        <div className="sds-load__content">
          <IconLoading />
          {label && <p className="sds-p">{msg(label)}</p>}
        </div>
      </div>
  );
};

Loading.propTypes = {
  label: PropTypes.string
};

Loading.defaultProps = {
  label: 'LABELS.LOADING'
};

export default Loading;
