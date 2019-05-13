import _ from "lodash";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { addFieldFormik, removeFieldFormik } from '../../../../commons/helpers/formik-helper';
import { removeItemSelect } from '../../../../commons/helpers/filtro-helper';
import { msg } from "../../../../commons/i18n/intl";
import { injectIntl } from "react-intl";
import { compose } from "redux";
import { connect } from "react-redux";
import { interessadoActions, interessadoSelectors, interessadoTypes } from "../../../../redux/modules/interessado";
import { selectors as flowSelectors } from "../../../../redux/modules/flow";
import AutoSuggest from "../../../../commons/components/AutoSuggest";
import Chips from "../../../../commons/components/Chips";

const ID_ENDPOINT =  'cdInteressado';

class AutoCompleteInteressado extends PureComponent {

  state = { input: '', selecionados: [], items: [] };

  static getDerivedStateFromProps(nextProps){
    return removeItemSelect(nextProps, 'interessadosSugeridos', 'interessadosSelecionados', ID_ENDPOINT);
  }

  onInputChange = (event, { newValue, method }) => {
    if(method !== AutoSuggest.ACTION.ENTER){
      this.setState({ input: newValue });
      return;
    }
  };

  onSuggestionSelected = (event, { suggestion }) => {
    addFieldFormik(suggestion, this.props, ID_ENDPOINT);
    this.props.adicionarSelecionado( suggestion );
    this.atualizarSelecionados([...this.props.interessadosSelecionados, suggestion]);
  }

  atualizarSelecionados = selecionados => {
    this.setState({ input: '', selecionados: selecionados });
  }

  onInterestedSuggestionsFetchRequested = ({ value }) => {
    if(value.replace(' ', '').length > 0){
      this.props.filtrarInteressados({
        data: value,
        selecionados: this.props.interessadosSelecionados
      });
      return;
    }

    this.props.zerarFiltroInteressados();
  }

  renderInterestedSugestion = suggestion => {
    const identificadorFormatado = `<${suggestion['identificadorFormatado']}>`;
    const nome = suggestion['nomeInteressado'] != null ? suggestion['nomeInteressado'] : '';
    
    return (
      <div className="sds-list__link sds-list__link--column" title={`${nome} ${identificadorFormatado}`}>
        <p className="sds-text-ellipsis sds-p">
          <b>{nome}</b>
        </p>
        
        <p className="sds-p-small sds-color-gray" style={{color: '#666'}}>
          {identificadorFormatado}
        </p>
      </div>
    );
  };

  getSuggestionValue = suggestion => 
    suggestion['nomeInteressado'] + ` <${suggestion['identificadorFormatado']}>`;
  
  renderInteressadosSelecionados = () => {
    if(_.isEmpty(this.props.interessadosSelecionados)) return;

    return this.props.interessadosSelecionados.map((item, index) => {
      if(item){
        let nome = item['nomeInteressado'] || '';
        let identificadorFormatado = item['identificadorFormatado'];
        let chipValue = `
          <div class="sds-text-ellipsis sds-p" title="${nome + '&nbsp;&lt;' + identificadorFormatado + '&gt;'}">
            <b>${nome}</b>
            <span>&nbsp;&lt;${identificadorFormatado}&gt;</span>
          </div>`;
        return (
          <Chips
            key={`${Chips.KEY}${nome.replace(' ', '')}-${index}`}
            value={chipValue}
            onCloseClick={() => this.removeChip(item) }
          />
        );
      }
      return '';
    });
  };

  removeChip = item => {
    removeFieldFormik(item, this.props, ID_ENDPOINT);
    this.props.removerSelecionados(item);
    this.setState({ selecionados: _.remove(this.props.interessadosSelecionados, i => i !== item) });    
  }

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
        label={label}
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
      />
    );
  }
}

AutoCompleteInteressado.propTypes = {
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  hasError: PropTypes.string,
  formGroupClassModifiers: PropTypes.string,
  label: PropTypes.string
};

AutoCompleteInteressado.defaultProps = {
  multiple: true,
  disabled: false
};

const mapStateToProps = state => ({
  interessadosSelecionados: interessadoSelectors.getSelecionados(state),
  interessadosSugeridos: interessadoSelectors.getInteressadosSugeridos(state),
  loading: flowSelectors.isLoadingByType(state, interessadoTypes.FILTRAR_INTERESSADOS),
});

const mapDispatchToProps = {
  filtrarInteressados: interessadoActions.filtrarInteressados,
  zerarFiltroInteressados: interessadoActions.zerarFiltroInteressados,
  removerSelecionados: interessadoActions.removeSelecionado,
  adicionarSelecionado: interessadoActions.adicionaSelecionado
};

export default compose(connect(mapStateToProps, mapDispatchToProps), injectIntl)(AutoCompleteInteressado);