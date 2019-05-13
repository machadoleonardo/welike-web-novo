import classnames from "classnames";
import React from "react";
import PropTypes from "prop-types";

export default function CollapseItemTitle({
  className,
  expanded,
  onClick,
  onMouseOver,
  rootTag: Root,
  title,
  uuid,
  style
}) {

  if (typeof title === "object") {
    return React.cloneElement(title, {
      onClick,
      id: `sds-collapse-list__item-title-${uuid}`,
      "aria-controls": `sds-collapse-list__item-body-${uuid}`
    });
  }

  return (
    <div className="sds-collapse-list__content">
      <Root
        aria-controls={`sds-collapse-list__item-body-${uuid}`}
        aria-expanded={expanded}
        className={classnames(
          "sds-subtitle sds-collapse-list__header",
          className
        )}
        id={`sds-collapse-list__item-title-${uuid}`}
        onClick={onClick}
        onMouseOver={onMouseOver}
        style={style}
      >
        {title}
      </Root>
    </div>
  );
}

CollapseItemTitle.defaultProps = {
  rootTag: "div"
};

CollapseItemTitle.propTypes = {
  className: PropTypes.string,
  expanded: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseOver: PropTypes.func,
  rootTag: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  uuid: PropTypes.string
};
