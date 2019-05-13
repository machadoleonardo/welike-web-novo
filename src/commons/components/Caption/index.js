import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class Caption extends React.Component{
  render(){
    const { classModifiers, as: Component, children, ...props } = this.props;
    return (
      <Component
        {...props}
        className={classnames("sds-caption", classModifiers)}>
        {children}
      </Component>
    );
  }
};

Caption.propTypes = {
  classModifiers: PropTypes.string
};

Caption.defaultProps = {
  as: 'span'
};

export default Caption;
