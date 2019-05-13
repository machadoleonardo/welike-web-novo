import _ from 'lodash';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { msg } from '../../../../commons/i18n/intl';
import { selectors as flowSelectors } from '../../../../redux/modules/flow';

import Chips from '../../../../commons/components/Chips';
import AutoSuggest from '../../../../commons/components/AutoSuggest';
import { processoActions, processoSelectors, processoTypes } from "../../../../redux/modules/processo";

const INITIAL_STATE = {
  input: '',
  selecionados: []
};

class ComponenteProcesso extends PureComponent {

  state = INITIAL_STATE;

  componentDidUpdate(prevProps) {
    if (prevProps.disabled === this.props.disabled) {
      return;
    }
    this.setState(INITIAL_STATE);
  }

  onProcessSuggestionsFetchRequested = ({ value }) => {
    this.props.filtrarProcessos({ data: value });
  };

  onInputChange = (event, { newValue }) => {
    this.setState({ input: newValue });
  };

  onSuggestionSelected = (event, { suggestion }) => {
    this.setState({ input: '', selecionados: [...this.state.selecionados, suggestion] }, this.callbackOnChange);
  };

  callbackOnChange = () => {
    this.props.onChange(this.state.selecionados);
  };

  renderProcessSugestionsSelected = () => {
    if (_.isEmpty(this.state.selecionados)) {
      return;
    }

    return this.state.selecionados.map((item, index) => {
      return (<Chips key={`${Chips.KEY}${item}-${index}`} value={`<b>${item.nuProcessoFormatado}</b>`}
        onCloseClick={() => {
          this.setState({ selecionados: _.remove(this.state.selecionados, i => i !== item) });
        }} />);
    });
  };

  renderProcessSuggestion = (suggestion) => {
    return <div className="sds-list__link">{suggestion.nuProcessoFormatado}</div>;
  };

  formatarProcesso = (processo) => {
    return processo.nuProcessoFormatado;
  };

  render() {
    const {
      input,
      selecionados
    } = this.state;

    const {
      loading,
      processos,
      disabled,
      multiple,
      zerarfiltroProcessos,
      hasError,
      formGroupClassModifiers,
      label
    } = this.props;

    const placeholder = _.isEmpty(selecionados) ? msg('COMPONENTE_PROCESSO.PLACEHOLDER') : '';
    const inputProps = {
      placeholder: placeholder,
      value: input,
      disabled: disabled,
      onChange: this.onInputChange
    };

    return (
      <AutoSuggest
        suggestions={processos}
        onSuggestionsFetchRequested={this.onProcessSuggestionsFetchRequested}
        onSuggestionsClearRequested={zerarfiltroProcessos}
        getSuggestionValue={this.formatarProcesso}
        renderSuggestion={this.renderProcessSuggestion}
        onSuggestionSelected={this.onSuggestionSelected}
        renderSuggestionSelected={this.renderProcessSugestionsSelected}
        isFetching={loading}
        inputProps={inputProps}
        isSingleSelection={!multiple}
        hasError={hasError}
        formGroupClassModifiers={formGroupClassModifiers}
        label={label}/>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: flowSelectors.isLoadingByType(state, processoTypes.FILTRAR_PROCESSOS),
    processos: processoSelectors.getProcessosSugeridos(state)
  };
}

const mapDispatchToProps = {
  filtrarProcessos: processoActions.filtrarProcessos,
  zerarfiltroProcessos: processoActions.zerarfiltroProcessos
};

ComponenteProcesso.propTypes = {
  onChange: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  hasError: PropTypes.string,
  formGroupClassModifiers: PropTypes.string,
  label: PropTypes.string
};

export default compose(connect(mapStateToProps, mapDispatchToProps), injectIntl)(ComponenteProcesso);