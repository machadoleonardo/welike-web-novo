import React from "react";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";

const Header = props => {
  return (
    <header className="sds-page__title sds-margin-vertical">
      <h6>
        <FormattedMessage id={props.title} />
      </h6>
      {props.children}
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string
};

export default Header;
