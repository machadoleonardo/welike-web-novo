import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import classnames from "classnames";


class Checkbox extends PureComponent {
    
    handleChange = event => {
        const value = event.target.value;
        this.props.onChange(this.props.name, value);
    };

    handleBlur = () => this.props.onBlur(this.props.name, true);;

    render() {
        const { 
            label, 
            name, 
            labelFor, 
            classModifiers,             
        } = this.props;
        
        return (
            <div className={ classnames("sds-checkbox sds-checkbox-custom", classModifiers) }>  
                <input id={labelFor} type="checkbox" name={name} value={label} onChange={this.handleChange} onBlur={ this.handleBlur} />
                <label htmlFor={labelFor}>
                    <i className="material-icons icon">check</i> 
                    { label && <FormattedMessage id={label} /> }
                </label>
            </div>
        )
    }
};

Checkbox.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    labelFor: PropTypes.string.isRequired
};

export default Checkbox;
