import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import Suggestion from "./Suggestion";
import LoadingIcon from "../LoadingIcon";
import FormGroup from '../FormGroup';
import Label from '../Label';

const alwaysTrue = () => true;
const defaultShouldRenderSuggestions = value => value.trim().length > 0;
const defaultRenderSuggestionsContainer = ({ containerProps, children }) => (
  <div {...containerProps}>{children}</div>
);

class AutoSuggest extends PureComponent {
  static ACTION = {
    ENTER: "enter",
    CLICK: "click",
    MOUSE_DOWN: "mousedown",
    MOUSE_UP: "mouseup"
  };

  static propTypes = {
    suggestions: PropTypes.array.isRequired,
    isFetching: PropTypes.bool,
    onSuggestionsFetchRequested: (props, propName) => {
      const onSuggestionsFetchRequested = props[propName];

      if (typeof onSuggestionsFetchRequested !== "function") {
        throw new Error("'onSuggestionsFetchRequested' must be implemented.");
      }
    },
    onSuggestionsClearRequested: (props, propName) => {
      const onSuggestionsClearRequested = props[propName];

      if (
        props.alwaysRenderSuggestions === false &&
        typeof onSuggestionsClearRequested !== "function"
      ) {
        throw new Error("'onSuggestionsClearRequested' must be implemented.");
      }
    },
    onSuggestionSelected: PropTypes.func,
    onSuggestionHighlighted: PropTypes.func,
    renderInputComponent: PropTypes.func,
    renderSuggestionsContainer: PropTypes.func,
    getSuggestionValue: PropTypes.func.isRequired,
    renderSuggestion: PropTypes.func.isRequired,
    renderSuggestionSelected: PropTypes.func.isRequired,
    inputProps: (props, propName) => {
      const inputProps = props[propName];

      if (!inputProps.hasOwnProperty("value")) {
        throw new Error("'inputProps' must have 'value'.");
      }

      if (!inputProps.hasOwnProperty("onChange")) {
        throw new Error("'inputProps' must have 'onChange'.");
      }
    },
    shouldRenderSuggestions: PropTypes.func,
    alwaysRenderSuggestions: PropTypes.bool,
    isSingleSelection: PropTypes.bool,
    multiSection: PropTypes.bool,
    renderSectionTitle: (props, propName) => {
      const renderSectionTitle = props[propName];

      if (
        props.multiSection === true &&
        typeof renderSectionTitle !== "function"
      ) {
        throw new Error("'renderSectionTitle' must be implemented.");
      }
    },
    getSectionSuggestions: (props, propName) => {
      const getSectionSuggestions = props[propName];

      if (
        props.multiSection === true &&
        typeof getSectionSuggestions !== "function"
      ) {
        throw new Error("'getSectionSuggestions' must be implemented.");
      }
    },
    focusInputOnSuggestionClick: PropTypes.bool,
    highlightFirstSuggestion: PropTypes.bool,
    id: PropTypes.string,
    hasError: PropTypes.string,
    formGroupClassModifiers: PropTypes.string,
    label: PropTypes.string
  };

  static defaultProps = {
    renderSuggestionsContainer: defaultRenderSuggestionsContainer,
    shouldRenderSuggestions: defaultShouldRenderSuggestions,
    isFetching: false,
    alwaysRenderSuggestions: false,
    isSingleSelection: false,
    multiSection: false,
    focusInputOnSuggestionClick: true,
    highlightFirstSuggestion: false,
    id: "1",
    formGroupClassModifiers: ''
  };

  constructor(props) {
    super(props);

    this.state = {
      isFocused: false,
      isFetching: false,
      isCollapsed: true,
      highlightedSectionIndex: null,
      highlightedSuggestionIndex: null,
      highlightedSuggestion: null,
      valueBeforeUpDown: null
    };

    this.justPressedUpDown = false;
    this.justMouseEntered = false;

    this.pressedSuggestion = null;
  }

  componentDidMount() {
    document.addEventListener(
      AutoSuggest.ACTION.MOUSE_DOWN,
      this.onDocumentMouseDown
    );
    document.addEventListener(
      AutoSuggest.ACTION.MOUSE_UP,
      this.onDocumentMouseUp
    );
    this.input = this.suggestion.input;
    this.suggestionsContainer = this.suggestion.itemsContainer;
  }

  componentWillReceiveProps(nextProps) {
    if (_.isEqual(nextProps.suggestions, this.props.suggestions)) {
      if (
        nextProps.highlightFirstSuggestion &&
        nextProps.suggestions.length > 0 &&
        this.justPressedUpDown === false &&
        this.justMouseEntered === false
      ) {
        this.highlightFirstSuggestion();
      }
    } else {
      if (AutoSuggest.willRenderSuggestions(nextProps)) {
        if (this.state.isCollapsed && !this.justSelectedSuggestion) {
          this.revealSuggestions();
        }
      } else {
        this.resetHighlightedSuggestion();
      }
    }
    this.updateFetchState(nextProps);
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      suggestions,
      onSuggestionHighlighted,
      highlightFirstSuggestion
    } = this.props;

    if (
      !_.isEqual(suggestions, prevProps.suggestions) &&
      suggestions.length > 0 &&
      highlightFirstSuggestion
    ) {
      this.highlightFirstSuggestion();
      return;
    }

    if (onSuggestionHighlighted) {
      const highlightedSuggestion = this.getHighlightedSuggestion();
      const prevHighlightedSuggestion = prevState.highlightedSuggestion;

      if (highlightedSuggestion !== prevHighlightedSuggestion) {
        onSuggestionHighlighted({
          suggestion: highlightedSuggestion
        });
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener(
      AutoSuggest.ACTION.MOUSE_DOWN,
      this.onDocumentMouseDown
    );
    document.removeEventListener(
      AutoSuggest.ACTION.MOUSE_UP,
      this.onDocumentMouseUp
    );
  }

  updateFetchState(props) {
    this.setState({ isFetching: props.isFetching || false });
  }

  updateHighlightedSuggestion(sectionIndex, suggestionIndex, prevValue) {
    this.setState(state => {
      let { valueBeforeUpDown } = state;

      if (suggestionIndex === null) {
        valueBeforeUpDown = null;
      } else if (
        valueBeforeUpDown === null &&
        typeof prevValue !== "undefined"
      ) {
        valueBeforeUpDown = prevValue;
      }

      return {
        highlightedSectionIndex: sectionIndex,
        highlightedSuggestionIndex: suggestionIndex,
        highlightedSuggestion:
          suggestionIndex === null
            ? null
            : this.getSuggestion(sectionIndex, suggestionIndex),
        valueBeforeUpDown
      };
    });
  }

  resetHighlightedSuggestion(shouldResetValueBeforeUpDown = true) {
    this.setState(state => {
      const { valueBeforeUpDown } = state;

      return {
        highlightedSectionIndex: null,
        highlightedSuggestionIndex: null,
        highlightedSuggestion: null,
        valueBeforeUpDown: shouldResetValueBeforeUpDown
          ? null
          : valueBeforeUpDown
      };
    });
  }

  revealSuggestions() {
    this.setState({
      isCollapsed: false
    });
  }

  closeSuggestions() {
    this.setState({
      highlightedSectionIndex: null,
      highlightedSuggestionIndex: null,
      highlightedSuggestion: null,
      valueBeforeUpDown: null,
      isCollapsed: true
    });
  }

  getSuggestion(sectionIndex, suggestionIndex) {
    const { suggestions, multiSection, getSectionSuggestions } = this.props;

    if (multiSection) {
      return getSectionSuggestions(suggestions[sectionIndex])[suggestionIndex];
    }
    return suggestions[suggestionIndex];
  }

  getHighlightedSuggestion() {
    const { highlightedSectionIndex, highlightedSuggestionIndex } = this.state;

    if (highlightedSuggestionIndex === null) {
      return null;
    }

    return this.getSuggestion(
      highlightedSectionIndex,
      highlightedSuggestionIndex
    );
  }

  getSuggestionValueByIndex(sectionIndex, suggestionIndex) {
    const { getSuggestionValue } = this.props;

    return getSuggestionValue(
      this.getSuggestion(sectionIndex, suggestionIndex)
    );
  }

  static getSuggestionIndices(suggestionElement) {
    const sectionIndex = suggestionElement.getAttribute("data-section-index");
    const suggestionIndex = suggestionElement.getAttribute(
      "data-suggestion-index"
    );

    return {
      sectionIndex:
        typeof sectionIndex === "string" ? parseInt(sectionIndex, 10) : null,
      suggestionIndex: parseInt(suggestionIndex, 10)
    };
  }

  onDocumentMouseDown = event => {
    this.justClickedOnSuggestionsContainer = false;

    let node =
      (event.detail && event.detail.target) || // This is for testing only. Please show me a better way to emulate this.
      event.target;

    while (node !== null && node !== document) {
      if (node.getAttribute("data-suggestion-index") !== null) {
        // Suggestion was clicked
        return;
      }

      if (node === this.suggestionsContainer) {
        // Something else inside suggestions container was clicked
        this.justClickedOnSuggestionsContainer = true;
        return;
      }

      node = node.parentNode;
    }
  };

  static findSuggestionElement(startNode) {
    let node = startNode;

    do {
      if (node.getAttribute("data-suggestion-index") !== null) {
        return node;
      }

      node = node.parentNode;
    } while (node !== null);

    throw new Error("Couldn't find suggestion element");
  }

  maybeCallOnChange(event, newValue, method) {
    const { onChange } = this.props.inputProps;
    // remove to get ENTER press during typing
    // if (newValue !== value) {
    onChange(event, { newValue, method });
    // }
  }

  static willRenderSuggestions(props) {
    const { suggestions, inputProps, shouldRenderSuggestions } = props;
    const { value } = inputProps;
    return suggestions.length > 0 && shouldRenderSuggestions(value);
  }

  storeSuggestionRef = suggestion => {
    if (suggestion !== null) {
      this.suggestion = suggestion;
    }
  };

  onSuggestionMouseEnter = (event, { sectionIndex, itemIndex }) => {
    this.updateHighlightedSuggestion(sectionIndex, itemIndex);
    if (event.target === this.pressedSuggestion) {
      this.justSelectedSuggestion = true;
    }
    this.justMouseEntered = true;
    setTimeout(() => {
      this.justMouseEntered = false;
    });
  };

  highlightFirstSuggestion = () => {
    this.updateHighlightedSuggestion(this.props.multiSection ? 0 : null, 0);
  };

  onDocumentMouseUp = () => {
    if (this.pressedSuggestion && !this.justSelectedSuggestion) {
      this.input.focus();
    }
    this.pressedSuggestion = null;
  };

  onSuggestionMouseDown = event => {
    // Checking if this.justSelectedSuggestion is already true to not duplicate touch events in chrome
    // See: https://github.com/facebook/react/issues/9809#issuecomment-413978405
    if (!this.justSelectedSuggestion) {
      this.justSelectedSuggestion = true;
      this.pressedSuggestion = event.target;
    }
  };

  onSuggestionsClearRequested = () => {
    const { onSuggestionsClearRequested } = this.props;

    onSuggestionsClearRequested && onSuggestionsClearRequested();
  };

  onSuggestionSelected = (event, data) => {
    const {
      alwaysRenderSuggestions,
      onSuggestionSelected,
      onSuggestionsFetchRequested
    } = this.props;

    onSuggestionSelected && onSuggestionSelected(event, data);

    if (alwaysRenderSuggestions) {
      onSuggestionsFetchRequested({
        value: data.suggestionValue,
        reason: "suggestion-selected"
      });
    } else {
      this.onSuggestionsClearRequested();
    }

    this.resetHighlightedSuggestion();
  };

  onSuggestionClick = event => {
    const { alwaysRenderSuggestions, focusInputOnSuggestionClick } = this.props;
    const { sectionIndex, suggestionIndex } = AutoSuggest.getSuggestionIndices(
      AutoSuggest.findSuggestionElement(event.target)
    );
    const clickedSuggestion = this.getSuggestion(sectionIndex, suggestionIndex);
    const clickedSuggestionValue = this.props.getSuggestionValue(
      clickedSuggestion
    );
    this.maybeCallOnChange(
      event,
      clickedSuggestionValue,
      AutoSuggest.ACTION.CLICK
    );
    this.onSuggestionSelected(event, {
      suggestion: clickedSuggestion,
      suggestionValue: clickedSuggestionValue,
      suggestionIndex: suggestionIndex,
      sectionIndex,
      method: AutoSuggest.ACTION.CLICK
    });

    if (!alwaysRenderSuggestions) {
      this.closeSuggestions();
    }

    if (focusInputOnSuggestionClick === true) {
      this.input.focus();
    } else {
      this.onBlur();
    }

    setTimeout(() => {
      this.justSelectedSuggestion = false;
    });
  };

  onBlur = () => {
    const { inputProps, shouldRenderSuggestions } = this.props;
    const { value, onBlur } = inputProps;
    const highlightedSuggestion = this.getHighlightedSuggestion();
    const shouldRender = shouldRenderSuggestions(value);

    this.setState({
      isFocused: false,
      highlightedSectionIndex: null,
      highlightedSuggestionIndex: null,
      highlightedSuggestion: null,
      valueBeforeUpDown: null,
      isCollapsed: !shouldRender
    });

    onBlur && onBlur(this.blurEvent, { highlightedSuggestion });
  };

  onSuggestionMouseLeave = event => {
    this.resetHighlightedSuggestion(false); // shouldResetValueBeforeUpDown

    if (
      this.justSelectedSuggestion &&
      event.target === this.pressedSuggestion
    ) {
      this.justSelectedSuggestion = false;
    }
  };

  onSuggestionTouchStart = () => {
    this.justSelectedSuggestion = true;
    // TODO: event.preventDefault when https://github.com/facebook/react/issues/2043
    // TODO: gets released so onSuggestionMouseDown won't fire in chrome
  };

  onSuggestionTouchMove = () => {
    this.justSelectedSuggestion = false;
    this.pressedSuggestion = null;
    this.input.focus();
  };

  itemProps = ({ sectionIndex, itemIndex }) => {
    return {
      "data-section-index": sectionIndex,
      "data-suggestion-index": itemIndex,
      onMouseEnter: this.onSuggestionMouseEnter,
      onMouseLeave: this.onSuggestionMouseLeave,
      onMouseDown: this.onSuggestionMouseDown,
      onTouchStart: this.onSuggestionTouchStart,
      onTouchMove: this.onSuggestionTouchMove,
      onClick: this.onSuggestionClick
    };
  };

  getQuery() {
    const { inputProps } = this.props;
    const { value } = inputProps;
    const { valueBeforeUpDown } = this.state;

    return (valueBeforeUpDown === null ? value : valueBeforeUpDown).trim();
  }

  renderSuggestionsContainer = ({ containerProps, children }) => {
    const { renderSuggestionsContainer } = this.props;

    return renderSuggestionsContainer({
      containerProps,
      children,
      query: this.getQuery()
    });
  };

  render() {
    const {
      suggestions,
      renderInputComponent,
      onSuggestionsFetchRequested,
      renderSuggestion,
      inputProps,
      isSingleSelection,
      multiSection,
      renderSectionTitle,
      id,
      getSectionSuggestions,
      getSuggestionValue,
      alwaysRenderSuggestions,
      highlightFirstSuggestion,
      renderSuggestionSelected,
      hasError,
      formGroupClassModifiers,
      label
    } = this.props;
    const {
      isFocused,
      isFetching,
      isCollapsed,
      highlightedSectionIndex,
      highlightedSuggestionIndex,
      valueBeforeUpDown
    } = this.state;
    const shouldRenderSuggestions = alwaysRenderSuggestions
      ? alwaysTrue
      : this.props.shouldRenderSuggestions;      
    const { value, onFocus, onKeyDown } = inputProps;
    const willRenderSuggestions = AutoSuggest.willRenderSuggestions(this.props);
    const isOpen =
      alwaysRenderSuggestions ||
      (isFocused && !isCollapsed && willRenderSuggestions);
    const items = isOpen ? suggestions : [];
    const suggestionInputProps = {
      ...inputProps,
      onFocus: event => {
        if (
          !this.justSelectedSuggestion &&
          !this.justClickedOnSuggestionsContainer
        ) {
          const shouldRender = shouldRenderSuggestions(value);

          this.setState({
            isFocused: true,
            isCollapsed: !shouldRender
          });

          onFocus && onFocus(event);

          if (shouldRender) {
            onSuggestionsFetchRequested({ value, reason: "input-focused" });
          }
        }
      },
      onBlur: event => {
        if (this.justClickedOnSuggestionsContainer) {
          this.input.focus();
          return;
        }

        this.blurEvent = event;

        if (!this.justSelectedSuggestion) {
          this.onBlur();
          this.onSuggestionsClearRequested();
        }
      },
      onChange: event => {
        const { value } = event.target;
        const shouldRender = shouldRenderSuggestions(value);

        this.maybeCallOnChange(event, value, "type");

        this.setState({
          ...(highlightFirstSuggestion
            ? {}
            : {
                highlightedSectionIndex: null,
                highlightedSuggestionIndex: null,
                highlightedSuggestion: null
              }),
          valueBeforeUpDown: null,
          isCollapsed: !shouldRender
        });

        if (shouldRender) {
          onSuggestionsFetchRequested({ value, reason: "input-changed" });
        } else {
          this.onSuggestionsClearRequested();
        }
      },
      onKeyDown: (event, data) => {
        const { keyCode } = event;

        switch (keyCode) {
          case 40: // ArrowDown
          case 38: // ArrowUp
            if (isCollapsed) {
              if (shouldRenderSuggestions(value)) {
                onSuggestionsFetchRequested({
                  value,
                  reason: "suggestions-revealed"
                });
                this.revealSuggestions();
              }
            } else if (suggestions.length > 0) {
              const {
                newHighlightedSectionIndex,
                newHighlightedItemIndex
              } = data;

              let newValue;

              if (newHighlightedItemIndex === null) {
                // valueBeforeUpDown can be null if, for example, user
                // hovers on the first suggestion and then pressed Up.
                // If that happens, use the original input value.
                newValue =
                  valueBeforeUpDown === null ? value : valueBeforeUpDown;
              } else {
                newValue = this.getSuggestionValueByIndex(
                  newHighlightedSectionIndex,
                  newHighlightedItemIndex
                );
              }

              this.updateHighlightedSuggestion(
                newHighlightedSectionIndex,
                newHighlightedItemIndex,
                value
              );
              this.maybeCallOnChange(
                event,
                newValue,
                keyCode === 40 ? "down" : "up"
              );
            }

            event.preventDefault(); // Prevents the cursor from moving

            this.justPressedUpDown = true;

            setTimeout(() => {
              this.justPresseacceptNotFounddUpDown = false;
            });

            break;
          // Enter
          case 13: {
            // See #388
            if (event.keyCode === 229) {
              break;
            }
            const highlightedSuggestion = this.getHighlightedSuggestion();
            if (isOpen && !alwaysRenderSuggestions) {
              this.closeSuggestions();
            }
            let newValue = this.getQuery();
            if (highlightedSuggestion != null) {
              newValue = getSuggestionValue(highlightedSuggestion);
              this.maybeCallOnChange(event, newValue, AutoSuggest.ACTION.ENTER);
              this.onSuggestionSelected(event, {
                suggestion: highlightedSuggestion,
                suggestionValue: newValue,
                suggestionIndex: highlightedSuggestionIndex,
                sectionIndex: highlightedSectionIndex,
                method: AutoSuggest.ACTION.ENTER
              });
              this.justSelectedSuggestion = true;
              setTimeout(() => {
                this.justSelectedSuggestion = false;
              });
            } else
              this.maybeCallOnChange(event, newValue, AutoSuggest.ACTION.ENTER);

            break;
          }
          // Escape
          case 27: {
            if (isOpen) {
              // If input.type === 'search', the browser clears the input
              // when Escape is pressed. We want to disable this default
              // behaviour so that, when suggestions are shown, we just hide
              // them, without clearing the input.
              event.preventDefault();
            }

            const willCloseSuggestions = isOpen && !alwaysRenderSuggestions;

            if (valueBeforeUpDown === null) {
              // Didn't interact with Up/Down
              if (!willCloseSuggestions) {
                const newValue = "";

                this.maybeCallOnChange(event, newValue, "escape");

                if (shouldRenderSuggestions(newValue)) {
                  onSuggestionsFetchRequested({
                    value: newValue,
                    reason: "escape-pressed"
                  });
                } else {
                  this.onSuggestionsClearRequested();
                }
              }
            } else {
              // Interacted with Up/Down
              this.maybeCallOnChange(event, valueBeforeUpDown, "escape");
            }

            if (willCloseSuggestions) {
              this.onSuggestionsClearRequested();
              this.closeSuggestions();
            } else {
              this.resetHighlightedSuggestion();
            }

            break;
          }
          default:
          //do nothing
        }

        onKeyDown && onKeyDown(event);
      }
    };
    const renderSuggestionData = {
      query: this.getQuery()
    };
    let inputWrapperState = "sds-input-wrapper sds-input--autocomplete";
    let classesModifiers = formGroupClassModifiers;
    if (isFocused) {
      classesModifiers += " sds-form-group--active";
    }

    return (
      <FormGroup hasError={hasError}
                 classModifiers={classesModifiers}>
        {label && <Label value={label}/>}
        <div className={inputWrapperState}>
          {!isFetching && (
            <i className="material-icons sds-input__icon-static">search</i>
          )}
          {isFocused && isFetching && <LoadingIcon />}
          <Suggestion
            multiSection={multiSection}
            items={items}
            renderInputComponent={renderInputComponent}
            renderItemsContainer={this.renderSuggestionsContainer}
            renderItem={renderSuggestion}
            renderItemData={renderSuggestionData}
            renderSectionTitle={renderSectionTitle}
            getSectionItems={getSectionSuggestions}
            highlightedSectionIndex={highlightedSectionIndex}
            highlightedItemIndex={highlightedSuggestionIndex}
            inputProps={suggestionInputProps}
            itemProps={this.itemProps}
            renderSuggestionSelected={renderSuggestionSelected}
            isSingleSelection={isSingleSelection}
            id={id}
            ref={this.storeSuggestionRef}
          />
        </div>
      </FormGroup>
    );
  }
}

export default AutoSuggest;
