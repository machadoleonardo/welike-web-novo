import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const arrayify = obj => [].concat(obj);

function getChildrenActiveItems(children) {
  let activeItems = [];

  arrayify(children)
    .filter(c => c)
    .forEach((children, index) => {
      if (!children.props.disabled && children.props.expanded) {
        activeItems.push(index);
      }
    });

  return activeItems;
}

function getActiveItems(children, allowMultiple) {
  let activeItems = getChildrenActiveItems(children);

  if (!allowMultiple && activeItems.length > 0) {
    activeItems = activeItems.slice(0, 1);
  }

  return activeItems;
}

// https://stackoverflow.com/a/22395463/338762
function isSame(array1, array2) {
  return (
    array1.length === array2.length &&
    array1.every((element, index) => element === array2[index])
  );
}

export default class CollapseList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeItems: getActiveItems(props.children, props.allowMultiple)
    };
  }

  componentWillReceiveProps({ children, allowMultiple }) {
    if (
      !isSame(
        getChildrenActiveItems(this.props.children),
        getChildrenActiveItems(children)
      )
    ) {
      this.setState({
        activeItems: getActiveItems(children, allowMultiple)
      });
    }
  }

  handleChange(index) {
    const {
      allowMultiple,
      children,
      onChange,
      openNextAccordionItem
    } = this.props;

    // clone active items state array
    let activeItems = this.state.activeItems.slice(0);

    const position = activeItems.indexOf(index);

    if (position !== -1) {
      activeItems.splice(position, 1);

      if (openNextAccordionItem && index !== children.length - 1) {
        activeItems.push(index + 1);
      }
    } else if (allowMultiple) {
      activeItems.push(index);
    } else {
      activeItems = [index];
    }

    const newState = {
      activeItems
    };

    this.setState(newState, () => {
      if (onChange) {
        onChange(newState);
      }
    });
  }

  renderItems() {
    const { children, duration, easing, isHovered } = this.props;

    if (!children) {
      return null;
    }

    const { activeItems } = this.state;

    return arrayify(children).reduce((acc, item, index) => {
      if (item) {
        const {
          props: { disabled, duration: itemDuration, easing: itemEasing }
        } = item;

        const isExpanded = !disabled && activeItems.indexOf(index) !== -1;
        const handleChange = this.handleChange.bind(this, index);
        const element = React.cloneElement(item, {
          duration: itemDuration || duration,
          easing: itemEasing || easing,
          expanded: isExpanded,
          key: index,
          index,
          onClick: handleChange,
          onMouseOver: isHovered && !disabled ? handleChange : null,
          ref: `item-${index}`
        });
        acc.push(element);
      }
      return acc;
    }, []);
  }

  render() {
    const { className, style, rootTag: Root } = this.props;

    return (
      <Root
        className={classnames("sds-collapse-list", className)}
        style={style}>
        {this.renderItems()}
      </Root>
    );
  }
}

CollapseList.defaultProps = {
  activeItems: [0],
  allowMultiple: false,
  duration: 300,
  easing: "ease",
  rootTag: "div"
};

CollapseList.propTypes = {
  allowMultiple: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className: PropTypes.string,
  duration: PropTypes.number,
  easing: PropTypes.string,
  onChange: PropTypes.func,
  isHovered: PropTypes.bool,
  openNextAccordionItem: PropTypes.bool,
  style: PropTypes.object,
  rootTag: PropTypes.string
};
