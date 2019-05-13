import classnames from "classnames";
import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class CollapseItemBody extends PureComponent {
  render() {
    const {
      children,
      className,
      duration,
      easing,
      expanded,
      maxHeight,
      overflow,
      rootTag: Root,
      uuid
    } = this.props;

    const style = {
      maxHeight,
      overflow,
      transition: `max-height ${duration}ms ${easing}`
    };

    return (
      <Root
        aria-hidden={!expanded}
        aria-labelledby={`sds-collapse-list__item-title-${uuid}`}
        className={classnames("sds-collapse-list__body", className)}
        id={`sds-collapse-list__item-body-${uuid}`}
        style={style}
      >
        <div className="sds-collapse-list__content">{children}</div>
      </Root>
    );
  }
}

CollapseItemBody.defaultProps = {
  rootTag: "div"
};

CollapseItemBody.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  duration: PropTypes.number,
  easing: PropTypes.string,
  expanded: PropTypes.bool,
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  overflow: PropTypes.string,
  rootTag: PropTypes.string,
  uuid: PropTypes.string
};
