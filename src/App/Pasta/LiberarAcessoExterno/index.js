/* eslint-disable jsx-a11y/anchor-is-valid */
import _ from 'lodash';
import React, { Fragment, PureComponent } from 'react';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import qs from 'qs';
import moment from 'moment';
import classnames from 'classnames';
import { selectors as flowSelectors } from '../../../redux/modules/flow';
import { acessoExternoActions, acessoExternoTypes } from '../../../redux/modules/acesso-externo';
import { interessadoActions, interessadoSelectors } from '../../../redux/modules/interessado';
import connect from 'react-redux/es/connect/connect';
import { msg } from '../../../commons/i18n/intl';

import FormGroup from '../../../commons/components/FormGroup';
import DatePicker from '../../../commons/components/DatePicker';
import Loading from '../../../commons/components/Loading';
import SwitchButton from '../../../commons/components/SwitchButton';
import RaisedButton from '../../../commons/components/RaisedButton';
import AlertError from '../../../commons/components/AlertError';
import ComponenteProcesso from './ComponenteProcesso';
import ComponenteInteressado from './ComponenteInteressado';


const INITIAL_STATE = {
  isLoading: true,
  errorPageMessage: null,
  /*
   * Processo
   * */
  processoSelecionado: [],
  isLiberadoAcessoPedido: true,

  /*
   * Interessados
   * */
  erroInputInteressado: null,
  interessadosSelecionados: [],
  /*
   * Validade do acesso
   * */
  dataValidade: '',
  dataInvalidaError: null
};

class LiberarAcessoExterno extends PureComponent {

  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  getParam(key) {
    return qs.parse(this.props.location.search, { ignoreQueryPrefix: true })[key];
  }

  liberarAcessoPedido = () => {
    this.setState({
      isLiberadoAcessoPedido: !this.state.isLiberadoAcessoPedido,
      processoSelecionado: []
    });
  };

  componenteProcessoOnChange = (processos) => {
    this.props.carregarInteressados({ data: processos[0].cdProcesso });
    this.setState({ processoSelecionado: processos });
  };


  componenteInteressadoOnChange = (interessados) => {
    this.setState({ interessadosSelecionados: interessados });
  };

  limparValidacao = (value) => {
    this.setState({ dataValidade: value, dataInvalidaError: null });
  };

  getDocumentos = () => {
    const documentos = [];
    //eslint-disable-next-line
    const parentWindow = parent.window;
    if (parentWindow.pastadigital) {
      const parsedDocs = qs.parse(parentWindow.pastadigital.getItensSelecionados());
      for (let i in parsedDocs) {
        documentos.push(qs.parse(parsedDocs[i]));
      }
    }
    return documentos;
  };

  liberarAcessoDocumentos = () => {
    const { isLiberadoAcessoPedido, dataValidade, interessadosSelecionados, processoSelecionado } = this.state;
    let erroInputInteressado = null, erroInputProcesso = null, dataInvalidaError = null;
    this.setState({ erroInputInteressado, erroInputProcesso, dataInvalidaError });
    const data = {};
    data['dtValidade'] = null;
    if (dataValidade !== '') {
      const date = moment(dataValidade);
      const now = moment().toDate();
      if (!date.isAfter(now, 'day')) {
        dataInvalidaError = 'PASTA.ERRO.LIBERAR_ACESSO_EXTERNO_DATA';
      }
      data['dtValidade'] = moment(dataValidade).format('YYYY-MM-DDTHH:mm:ss.sssZ');
    }
    if (_.isEmpty(interessadosSelecionados)) {
      erroInputInteressado = 'PASTA.ERRO.LIBERAR_ACESSO_EXTERNO_INTERESSADO';
    }
    const interessados = interessadosSelecionados;
    data['cdProcesso'] = this.getParam('cdProcesso');
    if (isLiberadoAcessoPedido && _.isEmpty(processoSelecionado)) {
      erroInputProcesso = 'PASTA.ERRO.LIBERAR_ACESSO_EXTERNO_PROCESSO_PEDIDO';
    }
    if (!_.isEmpty(processoSelecionado)) {
      data['cdProcessoPedido'] = processoSelecionado[0]['cdProcesso'];
    }
    data['interessados'] = [];
    for (let i in interessados) {
      const interessado = {
        'cdInteressado': interessados[i]['cdInteressado'] || null,
        'deEmailInteressado': interessados[i]['email']
      };
      data['interessados'].push(interessado);
    }
    if (erroInputInteressado != null || erroInputProcesso != null || dataInvalidaError != null) {
      this.setState({ erroInputInteressado, erroInputProcesso, dataInvalidaError });
      return;
    }
    data['documentos'] = this.getDocumentos();
    let answer = true;
    if (this.getParam('sigiloso') === 'S') {
      // eslint-disable-next-line
      answer = confirm(msg('PASTA.ALERT.LIBERAR_ACESSO_EXTERNO_CONFIRMAR_SIGILO'));
    }

    if (!answer) {
      this.fecharModal('');
      return;
    }
    this.props.liberarAcessoExterno({ data, callback: this.callbackLiberar });
  };

  callbackLiberar = () => {
    this.fecharModal(msg('PASTA.ALERT.ACESSO_EXTERNO_LIBERADO_SUCESSO'));
  };

  fecharModal = (msg) => {
    // eslint-disable-next-line
    const parentWindow = parent.window;
    if (parentWindow.pastadigital) {
      parentWindow.document.getElementById('sds-modal-result').value = msg;
      parentWindow.document.getElementById('sds-modal-close').click();
    }
  };

  render() {
    const {
      isLiberadoAcessoPedido,
      erroInputInteressado,
      erroInputProcesso,
      dataValidade,
      dataInvalidaError
    } = this.state;
    const { isLoading, errorPageMessage } = this.props;

    if (isLoading) {
      return (
        <Loading />
      );
    }
    return (
      <Fragment>
        {errorPageMessage != null && <AlertError message={errorPageMessage['message'] || errorPageMessage} />}
        <FormGroup>
          <SwitchButton
            componentId="swith-liberar-acesso"
            isChecked={isLiberadoAcessoPedido}
            handleOnClick={this.liberarAcessoPedido}
            label={'PASTA.LABELS.LIBERAR_ACESSO_EXTERNO_DOCUMENTOS'} />
        </FormGroup>
        {/* Numero do processo de pedido de vistas */}
        <ComponenteProcesso
          hasError={erroInputProcesso}
          formGroupClassModifiers={classnames({ 'sds-form-group--disabled': !isLiberadoAcessoPedido })}
          onChange={this.componenteProcessoOnChange}
          disabled={!isLiberadoAcessoPedido} />

        {/* Interessados do processo */}
        <ComponenteInteressado
          hasError={erroInputInteressado}
          label={'PASTA.LABELS.LIBERAR_ACESSO_EXTERNO_DOCUMENTOS_PARA'}
          onChange={this.componenteInteressadoOnChange}
          multiple={true} />
        {/* Liberar acesso até: */}
        <DatePicker
          componentId="liberar-acesso-ate"
          value={dataValidade}
          onDateChanged={this.limparValidacao}
          hasError={dataInvalidaError}
          label={'PASTA.LABELS.LIBERAR_ACESSO_EXTERNO_DOCUMENTOS_ATE'} />
        {/*Salvar e enviar email */}
        <FormGroup>
          <RaisedButton classModifiers="sds-btn--full-width"
            label={'PASTA.LABELS.LIBERAR_ACESSO_EXTERNO_CONFIRMAR'}
            onClick={this.liberarAcessoDocumentos} />
        </FormGroup>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: flowSelectors.isLoadingByType(state, acessoExternoTypes.LIBERAR_ACESSO_EXTERNO),
    errorPageMessage: flowSelectors.getErrorByType(state, acessoExternoTypes.LIBERAR_ACESSO_EXTERNO),
    interessadosSelecionados: interessadoSelectors.getInteressadosSelecionados(state)
  };
}

const mapDispatchToProps = {
  liberarAcessoExterno: acessoExternoActions.liberarAcessoExterno,
  carregarInteressados: interessadoActions.carregarInteressados
};

export default compose(connect(mapStateToProps, mapDispatchToProps), injectIntl)(LiberarAcessoExterno);