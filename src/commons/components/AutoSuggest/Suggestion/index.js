import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import createSectionIterator from "./sectionIterator";
import SuggestionTitle from "./SectionTitle";
import SuggestionList from "./SuggestionList";

const emptyObject = {};
const defaultRenderInputComponent = props => <input {...props} />;
const defaultRenderItemsContainer = ({ containerProps, children }) => (
  <div {...containerProps}>{children}</div>
);

export default class Suggestion extends PureComponent {
  static propTypes = {
    id: PropTypes.string, // Used in aria-* attributes. If multiple Suggestion's are rendered on a page, they must have unique ids.
    multiSection: PropTypes.bool, // Indicates whether a multi section layout should be rendered.
    renderInputComponent: PropTypes.func, // When specified, it is used to render the input element.
    renderItemsContainer: PropTypes.func, // Renders the items container.
    items: PropTypes.array.isRequired, // Array of items or sections to render.
    renderItem: PropTypes.func, // This function renders a single item.
    renderItemData: PropTypes.object, // Arbitrary data that will be passed to renderItem()
    renderSectionTitle: PropTypes.func, // This function gets a section and renders its title.
    getSectionItems: PropTypes.func, // This function gets a section and returns its items, which will be passed into `renderItem` for rendering.
    renderSuggestionSelected: PropTypes.func,
    containerProps: PropTypes.object, // Arbitrary container props
    inputProps: PropTypes.object, // Arbitrary input props
    itemProps: PropTypes.oneOfType([
      // Arbitrary item props
      PropTypes.object,
      PropTypes.func
    ]),
    isSingleSelection: PropTypes.bool,
    highlightedSectionIndex: PropTypes.number, // Section index of the highlighted item
    highlightedItemIndex: PropTypes.number // Highlighted item index (within a section)
  };

  static defaultProps = {
    id: "1",
    multiSection: false,
    isSingleSelection: false,
    renderInputComponent: defaultRenderInputComponent,
    renderItemsContainer: defaultRenderItemsContainer,
    renderItem: () => {
      throw new Error("`renderItem` must be provided");
    },
    renderItemData: emptyObject,
    renderSectionTitle: () => {
      throw new Error("`renderSectionTitle` must be provided");
    },
    getSectionItems: () => {
      throw new Error("`getSectionItems` must be provided");
    },
    containerProps: emptyObject,
    inputProps: emptyObject,
    itemProps: emptyObject,
    highlightedSectionIndex: null,
    highlightedItemIndex: null
  };

  constructor(props) {
    super(props);

    this.highlightedItem = null;

    this.setSectionsItems(props);
    this.setSectionIterator(props);
  }

  componentDidMount() {
    this.ensureHighlightedItemIsVisible();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items !== this.props.items) {
      this.setSectionsItems(nextProps);
    }

    if (
      nextProps.items !== this.props.items ||
      nextProps.multiSection !== this.props.multiSection
    ) {
      this.setSectionIterator(nextProps);
    }
  }

  componentDidUpdate() {
    this.ensureHighlightedItemIsVisible();
  }

  setSectionsItems(props) {
    if (props.multiSection) {
      this.sectionsItems = props.items.map(section =>
        props.getSectionItems(section)
      );
      this.sectionsLengths = this.sectionsItems.map(items => items.length);
      this.allSectionsAreEmpty = this.sectionsLengths.every(
        itemsCount => itemsCount === 0
      );
    }
  }

  setSectionIterator(props) {
    this.sectionIterator = createSectionIterator({
      multiSection: props.multiSection,
      data: props.multiSection ? this.sectionsLengths : props.items.length
    });
  }

  storeInputReference = input => {
    if (input !== null) {
      this.input = input;
    }
  };

  storeItemsContainerReference = itemsContainer => {
    if (itemsContainer !== null) {
      this.itemsContainer = itemsContainer;
    }
  };

  onHighlightedItemChange = highlightedItem => {
    this.highlightedItem = highlightedItem;
  };

  getItemId = (sectionIndex, itemIndex) => {
    if (itemIndex === null) {
      return null;
    }

    const { id } = this.props;
    const section = sectionIndex === null ? "" : `section-${sectionIndex}`;

    return `react-suggestion-${id}-${section}-item-${itemIndex}`;
  };

  renderSections() {
    if (this.allSectionsAreEmpty) {
      return null;
    }

    const {
      id,
      items,
      renderItem,
      renderItemData,
      renderSectionTitle,
      highlightedSectionIndex,
      highlightedItemIndex,
      itemProps
    } = this.props;

    return items.map((section, sectionIndex) => {
      const keyPrefix = `react-suggestion-${id}-`;
      const sectionKeyPrefix = `${keyPrefix}section-${sectionIndex}-`;

      return (
        <div>
          <SuggestionTitle
            section={section}
            renderSectionTitle={renderSectionTitle}
            sectionKeyPrefix={sectionKeyPrefix}
          />
          <SuggestionList
            items={this.sectionsItems[sectionIndex]}
            itemProps={itemProps}
            renderItem={renderItem}
            renderItemData={renderItemData}
            sectionIndex={sectionIndex}
            highlightedItemIndex={
              highlightedSectionIndex === sectionIndex
                ? highlightedItemIndex
                : null
            }
            onHighlightedItemChange={this.onHighlightedItemChange}
            getItemId={this.getItemId}
            keyPrefix={keyPrefix}
            ref={this.storeItemsListReference}
          />
        </div>
      );
      /* eslint-enable react/jsx-key */
    });
  }

  renderItems() {
    const { items } = this.props;

    if (items.length === 0) {
      return null;
    }

    const { theme } = this;
    const {
      id,
      renderItem,
      renderItemData,
      highlightedSectionIndex,
      highlightedItemIndex,
      itemProps
    } = this.props;

    return (
      <SuggestionList
        items={items}
        itemProps={itemProps}
        renderItem={renderItem}
        renderItemData={renderItemData}
        highlightedItemIndex={
          highlightedSectionIndex === null ? highlightedItemIndex : null
        }
        onHighlightedItemChange={this.onHighlightedItemChange}
        getItemId={this.getItemId}
        theme={theme}
        keyPrefix={`react-suggestion-${id}-`}
      />
    );
  }

  onFocus = event => {
    const { inputProps } = this.props;

    inputProps.onFocus && inputProps.onFocus(event);
  };

  onBlur = event => {
    const { inputProps } = this.props;

    inputProps.onBlur && inputProps.onBlur(event);
  };

  onKeyDown = event => {
    const {
      inputProps,
      highlightedSectionIndex,
      highlightedItemIndex
    } = this.props;

    switch (event.key) {
      case "ArrowDown":
      case "ArrowUp": {
        const nextPrev = event.key === "ArrowDown" ? "next" : "prev";
        const [
          newHighlightedSectionIndex,
          newHighlightedItemIndex
        ] = this.sectionIterator[nextPrev]([
          highlightedSectionIndex,
          highlightedItemIndex
        ]);

        inputProps.onKeyDown(event, {
          newHighlightedSectionIndex,
          newHighlightedItemIndex
        });
        break;
      }

      default:
        inputProps.onKeyDown(event, {
          highlightedSectionIndex,
          highlightedItemIndex
        });
    }
  };

  ensureHighlightedItemIsVisible() {
    const { highlightedItem } = this;

    if (!highlightedItem) {
      return;
    }

    const { itemsContainer } = this;
    const itemOffsetRelativeToContainer =
      highlightedItem.offsetParent === itemsContainer
        ? highlightedItem.offsetTop
        : highlightedItem.offsetTop - itemsContainer.offsetTop;

    let { scrollTop } = itemsContainer; // Top of the visible area

    if (itemOffsetRelativeToContainer < scrollTop) {
      // SuggestionItem is off the top of the visible area
      scrollTop = itemOffsetRelativeToContainer;
    } else if (
      itemOffsetRelativeToContainer + highlightedItem.offsetHeight >
      scrollTop + itemsContainer.offsetHeight
    ) {
      // SuggestionItem is off the bottom of the visible area
      scrollTop =
        itemOffsetRelativeToContainer +
        highlightedItem.offsetHeight -
        itemsContainer.offsetHeight;
    }

    if (scrollTop !== itemsContainer.scrollTop) {
      itemsContainer.scrollTop = scrollTop;
    }
  }

  render() {
    const {
      id,
      multiSection,
      isSingleSelection,
      renderInputComponent,
      renderItemsContainer,
      highlightedSectionIndex,
      highlightedItemIndex,
      renderSuggestionSelected
    } = this.props;
    const renderedItems = multiSection
      ? this.renderSections()
      : this.renderItems();
    const isOpen = renderedItems !== null;
    const ariaActivedescendant = this.getItemId(
      highlightedSectionIndex,
      highlightedItemIndex
    );
    const itemsContainerId = `react-suggestion-${id}`;
    let inputChipListWrapperState = "sds-input-chip__list";
    if (isSingleSelection) {
      inputChipListWrapperState += " sds-input-chip__list--single";
    }
    const containerProps = {
      role: "combobox",
      "aria-haspopup": "listbox",
      "aria-owns": itemsContainerId,
      "aria-expanded": isOpen,
      className: inputChipListWrapperState,
      ...this.props.containerProps
    };
    const inputComponent = renderInputComponent({
      type: "text",
      value: "",
      autoComplete: "off",
      "aria-autocomplete": "list",
      "aria-controls": itemsContainerId,
      "aria-activedescendant": ariaActivedescendant,
      className: "sds-input ",
      ...this.props.inputProps,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      onKeyDown: this.props.inputProps.onKeyDown && this.onKeyDown,
      ref: this.storeInputReference
    });
    const itemsContainer = renderItemsContainer({
      containerProps: {
        id: itemsContainerId,
        role: "listbox",
        ref: this.storeItemsContainerReference
      },
      children: renderedItems
    });
    return (
      <div {...containerProps}>
        {renderSuggestionSelected()}
        {inputComponent}
        {itemsContainer}
      </div>
    );
  }
}
