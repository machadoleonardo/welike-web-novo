import _ from 'lodash';
import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import FormGroup from '../FormGroup';
import Label from '../Label';

const defaultFormat = 'YYYY-MM-DD';

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      hasError: null,
      formClassModifiers: ''
    };
  }

  componentDidMount() {
    this.setState({ inputValue: moment(this.props.value).format(defaultFormat), hasError: this.props.hasError });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (!moment(nextProps.value).isSame(moment(this.state.inputValue))) {
      this.setState({ inputValue: moment(nextProps.value).format(defaultFormat) });
    }
    if (this.state.hasError !== nextProps.hasError) {
      this.setState({ hasError: nextProps.hasError });
    }
  }

  setDateChanged = event => {
    this.removeFormClassModifiers();
    if (!_.isEmpty(event.target.validationMessage) && event.target.validity.badInput) {
      this.setState({ hasError: event.target.validationMessage });
      return;
    }
    if (this.props.onDateChanged) {
      this.props.onDateChanged(this.state.inputValue);
    }
  };

  setInputValue = event => {
    this.setState({ inputValue: event.target.value, hasError: null });
  };

  setFormClassModifiers = event => {
    this.setState({
      formClassModifiers: 'sds-form-group--active'
    })
  };

  removeFormClassModifiers = event => {
    this.setState({
      formClassModifiers: ''
    })
  }

  render() {
    const { componentId, onClick, label } = this.props;
    const { inputValue, hasError, formClassModifiers } = this.state;
    return (
      <FormGroup hasError={hasError} classModifiers={formClassModifiers} >
        {label != null && <Label labelFor={componentId} value={label} />}
        <div className="sds-input-wrapper sds-input--datepicker">
          <button className="sds-input__icon">
            <i className="material-icons">event</i>
          </button>
          <input
            id={componentId}
            className="sds-input"
            type="date"
            value={inputValue}
            onFocus={this.setFormClassModifiers}
            onChange={this.setInputValue}
            onBlur={this.setDateChanged}
            onClick={onClick} />
        </div>
      </FormGroup>
    );
  }
}

DatePicker.propTypes = {
  componentId: PropTypes.string,
  value: PropTypes.any,
  onDateChanged: PropTypes.func,
  onClick: PropTypes.func,
  hasError: PropTypes.string,
  label: PropTypes.string
};

export default DatePicker;
