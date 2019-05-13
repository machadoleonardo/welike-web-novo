import React, { PureComponent } from "react";
import classnames from "classnames";
import Label from '../Label'
import FormGroup from '../FormGroup'
import Select from "../Select";

class SelectWithMessage extends PureComponent {
    handleChange = event => {
        const value = event.target.value;        
        this.props.onChange(this.props.name, value);
    };

    handleBlur = () => this.props.onBlur(this.props.name, true);;

    render() {
        const {
            name,
            error,
            label,
            className,
            items,
            value,
            selection
        } = this.props;
        
        const classes = classnames(
            'sds-form-group',
            {
            'sds-form-group--error': !!error,
            'completed': !error
            },
            className
        );

        return (
            <FormGroup className={classes} hasError={error}>
                <Label value={label} htmlFor={name} error={error}>{label}</Label>
                
                <Select
                    name={name}                    
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    selection={selection}
                    items={items}
                    value={value}                   
                />
            </FormGroup>
        )
    }
}

export default SelectWithMessage;