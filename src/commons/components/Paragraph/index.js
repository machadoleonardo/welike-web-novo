import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class Paragraph extends React.Component{
  render(){
    const { classModifiers, as: Component, children, ...props } = this.props;
    return (
      <Component className={classnames('sds-p', classModifiers)}
        {...props}>
        {children}
      </Component>
    );
  }
};

Paragraph.propTypes = {
  classModifiers: PropTypes.string
};

Paragraph.defaultProps = {
  as: 'p'
};

export default Paragraph;