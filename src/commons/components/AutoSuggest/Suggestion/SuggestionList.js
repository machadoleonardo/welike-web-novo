import React, { Component } from "react";
import PropTypes from "prop-types";
import SuggestionItem from "./SuggestionItem";
import compareObjects from "./compareObjects";

export default class SuggestionList extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    itemProps: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    renderItem: PropTypes.func.isRequired,
    renderItemData: PropTypes.object.isRequired,
    sectionIndex: PropTypes.number,
    highlightedItemIndex: PropTypes.number,
    onHighlightedItemChange: PropTypes.func.isRequired,
    getItemId: PropTypes.func.isRequired,
    keyPrefix: PropTypes.string.isRequired
  };

  static defaultProps = {
    sectionIndex: null
  };

  shouldComponentUpdate(nextProps) {
    return compareObjects(nextProps, this.props, ["itemProps"]);
  }

  storeHighlightedItemReference = highlightedItem => {
    this.props.onHighlightedItemChange(
      highlightedItem === null ? null : highlightedItem.item
    );
  };

  render() {
    const {
      items,
      itemProps,
      renderItem,
      renderItemData,
      sectionIndex,
      highlightedItemIndex,
      getItemId,
      keyPrefix
    } = this.props;
    const sectionPrefix =
      sectionIndex === null
        ? keyPrefix
        : `${keyPrefix}section-${sectionIndex}-`;
    const isItemPropsFunction = typeof itemProps === "function";

    return (
      <div className={"sds-dropdown__list sds-dropdown__list--full-width"}>
        <ul role="listbox" className="sds-list">
          {items.map((item, itemIndex) => {
            const isFirst = itemIndex === 0;
            const isHighlighted = itemIndex === highlightedItemIndex;
            const itemKey = `${sectionPrefix}item-${itemIndex}`;
            const itemPropsObj = isItemPropsFunction
              ? itemProps({ sectionIndex, itemIndex })
              : itemProps;
            const allItemProps = {
              id: getItemId(sectionIndex, itemIndex),
              "aria-selected": isHighlighted,
              ...itemPropsObj
            };

            if (isHighlighted) {
              allItemProps.ref = this.storeHighlightedItemReference;
            }

            return (
              <SuggestionItem
                key={itemKey}
                {...allItemProps}
                sectionIndex={sectionIndex}
                isHighlighted={isHighlighted}
                itemIndex={itemIndex}
                item={item}
                renderItem={renderItem}
                renderItemData={renderItemData}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}
