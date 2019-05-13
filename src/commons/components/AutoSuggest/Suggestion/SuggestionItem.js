import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import compareObjects from "./compareObjects";

export default class SuggestionItem extends Component {
  static propTypes = {
    sectionIndex: PropTypes.number,
    isHighlighted: PropTypes.bool.isRequired,
    itemIndex: PropTypes.number.isRequired,
    item: PropTypes.any.isRequired,
    renderItem: PropTypes.func.isRequired,
    renderItemData: PropTypes.object.isRequired,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseDown: PropTypes.func,
    onClick: PropTypes.func
  };

  shouldComponentUpdate(nextProps) {
    return compareObjects(nextProps, this.props, ["renderItemData"]);
  }

  storeItemReference = item => {
    if (item !== null) {
      this.item = item;
    }
  };

  onMouseEnter = event => {
    const { sectionIndex, itemIndex } = this.props;

    this.props.onMouseEnter(event, { sectionIndex, itemIndex });
  };

  onMouseLeave = event => {
    const { sectionIndex, itemIndex } = this.props;

    this.props.onMouseLeave(event, { sectionIndex, itemIndex });
  };

  onMouseDown = event => {
    const { sectionIndex, itemIndex } = this.props;

    this.props.onMouseDown(event, { sectionIndex, itemIndex });
  };

  onClick = event => {
    const { sectionIndex, itemIndex } = this.props;

    this.props.onClick(event, { sectionIndex, itemIndex });
  };

  render() {
    const {
      isHighlighted,
      item,
      renderItem,
      renderItemData,
      ...restProps
    } = this.props;

    delete restProps.sectionIndex;
    delete restProps.itemIndex;

    if (typeof restProps.onMouseEnter === "function") {
      restProps.onMouseEnter = this.onMouseEnter;
    }

    if (typeof restProps.onMouseLeave === "function") {
      restProps.onMouseLeave = this.onMouseLeave;
    }

    if (typeof restProps.onMouseDown === "function") {
      restProps.onMouseDown = this.onMouseDown;
    }

    if (typeof restProps.onClick === "function") {
      restProps.onClick = this.onClick;
    }

    return (
      <li
        className={classnames("sds-list__item", {
          "sds-list__item--highlighted": isHighlighted
        })}
        role="option"
        {...restProps}
        ref={this.storeItemReference}
      >
        {renderItem(item, { isHighlighted, ...renderItemData })}
        {/*{isHighlighted && <i className="material-icons sds-color-success">check</i>}*/}
      </li>
    );
  }
}
