import React, { PureComponent } from 'react'
import LeadingIcon from '../LeadingIcon';

import FormGroup from '../FormGroup';
import ButtonIcon from '../ButtonIcon';
import InputWrapper from '../InputWrapper';
import Input from '../Input';

class SearchInput extends PureComponent {
    state = { focus: false }

    handleChange = event => {
        const value = event.target.value;

        this.hasWords(value);
        this.props.onChange(this.props.name, value);
    };

    handleBlur = () => this.props.onBlur(this.props.name, true);

    hasWords = value => value ? this.setState({ focus: true }) : this.setState({ focus: false });

    handleClean = () => {
        this.setState({ focus: false });
        this.props.onChange(this.props.name, '');
    }

    render() {
        const { value, placeholder, error, loading } = this.props;
        const { focus } = this.state;

        return (
            <FormGroup
                hasError={error}
                classModifiers={"sds-fila__search-input"}
            >
                <InputWrapper>
                    <LeadingIcon loading={loading} />

                    <Input
                        value={value}
                        placeholder={placeholder}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        focus={focus}
                    />

                    {focus && <ButtonIcon onClick={this.handleClean} icon="close" />}
                </InputWrapper>
            </FormGroup>
        )
    }
};

export default SearchInput;