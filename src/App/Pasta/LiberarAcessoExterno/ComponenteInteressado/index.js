import _ from "lodash";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as emailValidator from 'email-validator';
import { msg } from "../../../../commons/i18n/intl";
import { injectIntl } from "react-intl";
import { compose } from "redux";
import { interessadoActions, interessadoSelectors, interessadoTypes } from "../../../../redux/modules/interessado";
import { selectors as flowSelectors } from "../../../../redux/modules/flow";
import connect from "react-redux/es/connect/connect";
import AutoSuggest from "../../../../commons/components/AutoSuggest";
import Chips from "../../../../commons/components/Chips";

const INITIAL_STATE = {
  input: '',
  selecionados: []
};

class ComponenteInteressado extends PureComponent{

  state = INITIAL_STATE;

  componentDidUpdate(prevProps, prevState, snapshot){
    if(_.difference(this.props.interessadosSelecionados, this.state.selecionados).length > 0){
      this.atualizarSelecionados([...this.state.selecionados, ...this.props.interessadosSelecionados])
    }
  }

  onInputChange = (event, { newValue, method }) => {
    if(method !== AutoSuggest.ACTION.ENTER){
      this.setState({ input: newValue });
      return;
    }
    this.adicionarEmailSeValido(newValue);
  };

  onBlurInteressado = (e) => {
    this.adicionarEmailSeValido(e.target.value);
  };

  adicionarEmailSeValido = (newValue) => {
    if(!emailValidator.validate(newValue)){
      this.setState({ input: newValue });
      return;
    }
    // se for ENTER ou onBlur valida se é um email valido
    const { selecionados } = this.state;
    const filtro = _.filter(selecionados, (inter) => {
      return inter.email.toLowerCase() === newValue.toLowerCase();
    });
    let novos = selecionados;
    if(_.isEmpty(filtro)){
      novos = [...novos, { email: newValue }];
    }
    this.atualizarSelecionados(novos);
  }

  onSuggestionSelected = (event, { suggestion }) => {
    this.atualizarSelecionados([...this.state.selecionados, suggestion]);
  };

  atualizarSelecionados = (selecionados) => {
    this.setState({ input: '', selecionados: selecionados }, this.callbackOnChange);
  };

  callbackOnChange = () => {
    this.props.onChange(this.state.selecionados);
  };

  onInterestedSuggestionsFetchRequested = ({ value }) => {
    if(value.replace(' ', '').length > 0){
      this.props.filtrarInteressados({
        data: value,
        selecionados: this.state.selecionados
      });
      return;
    }
    this.props.zerarFiltroInteressados();
  };

  renderInterestedSugestion = (suggestion) => {
    const email = '<' + suggestion['email'] + '>';
    const nome = suggestion['nomeInteressado'] != null ? suggestion['nomeInteressado'] : '';
    return (
          <div className="sds-list__link sds-list__link--column"
               title={nome + ' ' + email}>
            <p className={'sds-text-ellipsis sds-p'}>
                <b>{nome}</b>
              </p>
              <p className={'sds-p-small sds-color-gray'} style={{color: '#666'}}>
                {email}
              </p>
          </div>
    );
  };

  getSuggestionValue = (suggestion) => {
    return suggestion['nomeInteressado'] + ` <${suggestion['email']}>`;
  };

  renderInteressadosSelecionados = () => {
    if(_.isEmpty(this.state.selecionados)){
      return;
    }
    return this.state.selecionados.map((item, index) => {
      if(item){
        let nome = item['nomeInteressado'] || '';
        let email = item['email'];
        let chipValue = `<div title="${nome + '&nbsp;&lt;' + email + '&gt;'}"><b>${nome}</b> <span>&nbsp;&lt;${email}&gt;</span></div>`;
        return (<Chips key={`${Chips.KEY}${nome.replace(' ', '')}-${index}`}
                       value={chipValue}
                       onCloseClick={() => {
                         this.props.removerInteressadosSelecionados({item});
                         return this.atualizarSelecionados(_.remove(this.state.selecionados, i => i !== item))
                       }}/>);
      }
      return '';
    });
  };

  render(){
    const {
      input,
      selecionados,
    } = this.state;
    const {
      loading,
      interessadosSugeridos,
      disabled,
      multiple,
      placeholder,
      zerarFiltroInteressados,
      hasError,
      formGroupClassModifiers,
      label
    } = this.props;
    const msgPlaceHolder = msg(placeholder || 'COMPONENTE_INTERESSADO.PLACEHOLDER' );
    const ph = _.isEmpty(selecionados) ? msgPlaceHolder : '';
    const inputProps = {
      placeholder: multiple ? msgPlaceHolder : ph,
      value: input,
      disabled: disabled,
      onChange: this.onInputChange,
      onBlur: this.onBlurInteressado
    };
    return (
        <AutoSuggest
            suggestions={interessadosSugeridos}
            onSuggestionsFetchRequested={this.onInterestedSuggestionsFetchRequested}
            onSuggestionsClearRequested={zerarFiltroInteressados}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderInterestedSugestion}
            onSuggestionSelected={this.onSuggestionSelected}
            renderSuggestionSelected={this.renderInteressadosSelecionados}
            isFetching={loading}
            inputProps={inputProps}
            isSingleSelection={!multiple}
            hasError={hasError}
            formGroupClassModifiers={formGroupClassModifiers}
            label={label}/>
    );
  }
}

ComponenteInteressado.propTypes = {
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  hasError: PropTypes.string,
  formGroupClassModifiers: PropTypes.string,
  label: PropTypes.string
};

ComponenteInteressado.defaultProps = {
  multiple: false,
  disabled: false
};

const mapStateToProps = (state) => {
  return {
    interessadosSelecionados: interessadoSelectors.getInteressadosSelecionados(state),
    loading: flowSelectors.isLoadingByType(state, interessadoTypes.FILTRAR_INTERESSADOS),
    interessadosSugeridos: interessadoSelectors.getInteressadosSugeridos(state),
  };
};

const mapDispatchToProps = {
  filtrarInteressados: interessadoActions.filtrarInteressados,
  zerarFiltroInteressados: interessadoActions.zerarFiltroInteressados,
  removerInteressadosSelecionados: interessadoActions.removerInteressadosSelecionados
};

export default compose(connect(mapStateToProps, mapDispatchToProps), injectIntl)(ComponenteInteressado);