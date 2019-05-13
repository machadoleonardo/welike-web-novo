/* eslint-disable jsx-a11y/anchor-is-valid */
import _ from 'lodash';
import React, { Fragment, PureComponent } from 'react';
import { compose } from 'redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { selectors as flowSelectors } from '../../../redux/modules/flow';
import connect from 'react-redux/es/connect/connect';
import qs from 'qs';
import Loading from '../../../commons/components/Loading';
import Label from '../../../commons/components/Label';
import CollapseList from '../../../commons/components/CollapseList';
import CollapseItem from '../../../commons/components/CollapseList/CollapseItem';
import OutlinedButton from '../../../commons/components/OutlinedButton';
import DataList from '../../../commons/components/DataList';
import Row from '../../../commons/components/Row';
import Col from '../../../commons/components/Col';
import Caption from '../../../commons/components/Caption';
import moment from 'moment';
import DatePicker from '../../../commons/components/DatePicker';
import AlertError from '../../../commons/components/AlertError';
import { msg } from '../../../commons/i18n/intl';
import {
  acessoExternoActions,
  acessoExternoSelectors,
  acessoExternoTypes
} from '../../../redux/modules/acesso-externo';

class GestaoAcessoExterno extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      cdProcesso: '',
      activeClickedItems: [0],
      errorPageMessage: null,
      cancelandoLiberacao: null
    };
  }

  getParam = (key) => {
    return qs.parse(this.props.location.search, { ignoreQueryPrefix: true })[key];
  };

  componentDidMount() {
    this.setState({
      nuProcessoFormatado: this.getParam('nuProcessoFormatado'),
      cdProcesso: this.getParam('cdProcesso')
    }, function () {
      this.props.carregar({ data: this.state.cdProcesso });
    });
  }

  joinItenteressado = (separator, array) => {
    const arr = array.map(a => {
      const nome = a['nmInteressado'] || '';
      return `${nome} <${a['deEmailInteressado']}>`;
    });
    return arr.join(separator).toString();
  };

  joinItemByKey = (key, separator, array) => {
    const arr = array.map(a => {
      return a[key];
    });
    return arr.join(separator).toString();
  };

  renderDataValidade = (item) => {
    let value = item['dtValidade'] != null ? moment(item['dtValidade']).format('DD/MM/YYYY') : msg('PASTA.LABELS.SEM_VALIDADE');

    if (item['tpSituacao'] === 'C' // ou se tpSituacao é Cancelado
      || moment(item['dtValidade']).isBefore(new Date(), 'day')) { // ou esta expirado
      return (<DataList
        label={msg('PASTA.LABELS.ACESSO_TERMINA')}
        value={value} />);
    }

    if (this.state.liberacaoEditando == null // Verifica se esta editando algum item
      || this.state.liberacaoEditando['cdLiberacaoAcessoExterno'] !== item['cdLiberacaoAcessoExterno']) {// se o item sendo editado é igual ao que esta sendo renderizado
      return (<DataList
        label={'Acesso termina em'}
        value={value}
        editable={true}
        onClick={() => {
          this.habilitarEditarDataValidade(item);
        }} />);
    }

    // habilita edição da data de validade, caso não tenha data valida no item adiciona 1 dia a data atual
    const dataEditando = this.state.liberacaoEditando.dtValidade == null ?
      moment().add(1, 'days').format('YYYY-MM-DD') :
      moment(this.state.liberacaoEditando.dtValidade, 'YYYY-MM-DDTHH:mm:ss.sssZ').format('YYYY-MM-DD');
    return (<DataList
      label={'Acesso termina em'}
      value={
        <DatePicker
          componentId="liberar-acesso-ate"
          value={dataEditando}
          hasError={this.state.liberacaoEditando.erroData}
          onDateChanged={(value) => {
            this.salvarDataValidade(value, item);
          }} />
      }
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === 'Tab') {
          this.salvarDataValidade(e.target.value, item);
        }
      }} />);
  };

  onExpand = (item) => {
    if (this.state.liberacaoEditando != null && item['cdLiberacaoAcessoExterno'] !== this.state.liberacaoEditando['cdLiberacaoAcessoExterno']) {
      this.setState({ liberacaoEditando: null });
    }
  };

  renderSituacao = (item) => {

    if (item['tpSituacao'] === 'C') {
      return (<DataList
        label={'PASTA.LABELS.GESTAO_ACESSO_EXTERNO_SITUACAO'}
        value={msg('PASTA.LABELS.GESTAO_ACESSO_EXTERNO_SITUACAO_CANCELADO')} />);
    }

    if (item['tpSituacao'] !== 'A') {
      return msg('PASTA.LABELS.SITUACAO_NAO_SUPORTADA');
    }

    if (moment(item['dtValidade']).isBefore(new Date(), 'day')) {
      return (<DataList
        label={'PASTA.LABELS.GESTAO_ACESSO_EXTERNO_SITUACAO'}
        value={msg('PASTA.LABELS.GESTAO_ACESSO_EXTERNO_SITUACAO_EXPIRADO')} />);
    }

    return (<DataList
      label={'PASTA.LABELS.GESTAO_ACESSO_EXTERNO_SITUACAO'}
      value={msg('PASTA.LABELS.GESTAO_ACESSO_EXTERNO_SITUACAO_ATIVO')} />);

  };

  cancelarAcesso = (item) => {
    this.setState({ cancelandoLiberacao: item }, () => {
      this.props.cancelar({ data: item, callback: this.cancelarAcessoCallback });
    });
  };

  cancelarAcessoCallback = () => {
    this.setState({ cancelandoLiberacao: null });
  };

  habilitarEditarDataValidade = (item) => {
    this.setState({ liberacaoEditando: item });
  };

  salvarDataValidade = (value, item) => {
    let liberacaoEditando = this.validaEdicao(value, item);
    if (liberacaoEditando != null) {
      this.setState({ liberacaoEditando: null });
      this.props.editar({ data: liberacaoEditando });
    }
  };

  validaEdicao = (value, item) => {
    let liberacaoEditando = this.state.liberacaoEditando;
    // Se data digitada for inválida seta como nulo para ser zerada no servidor
    if (value === '' || value == null) {
      liberacaoEditando.dtValidade = null;
      return liberacaoEditando;
    }
    const date = moment(value, 'YYYY/MM/DD');
    const now = moment().toDate();
    // Se data digitada for menor que a data atual mostra o erro
    if (!date.isAfter(now, 'day')) {
      this.setState({
        liberacaoEditando: {
          ...liberacaoEditando,
          erroData: msg('PASTA.ERRO.GESTAO_ACESSO_DATA_TERMINO_INVALIDA')
        }
      });
      return;
    }
    // Se data digitada for igual anterior não faz nada
    if (date === item.dtValidade) {
      return;
    }
    liberacaoEditando.dtValidade = moment(value, 'YYYY/MM/DD').format('YYYY-MM-DDTHH:mm:ss.sssZ');
    return liberacaoEditando;
  };

  renderItem = (item) => {
    const { cancelandoLiberacao } = this.state;
    const isCancelando = (cancelandoLiberacao != null && item['cdLiberacaoAcessoExterno'] === cancelandoLiberacao['cdLiberacaoAcessoExterno']);
    return (
      <CollapseItem
        onExpand={(index) => {
          this.onExpand(item);
        }}
        key={item['cdLiberacaoAcessoExterno']}
        title={
          this.renderItemHeader(item, isCancelando)
        }
        expanded={this.state.activeClickedItems.includes(item)}>
        {
          this.renderItemContent(item, isCancelando)
        }
      </CollapseItem>);
  };

  renderItemContent = (item, cancelando) => {
    const dtUltimaAtualizacao = item['dtAtualizacao'] != null ? item['dtAtualizacao'] : item['dtCadastro'];
    const usuarioUltimaAtualizacao = item['usuarioAtualizacao'] != null ? item['usuarioAtualizacao'] : item['usuarioCadastro'];
    const anexos = this.joinItemByKey(['deDocumento'], ', ', item['documentos']);
    const interessados = this.joinItenteressado(', ', item['interessados']);
    return (
      <Row>
        {cancelando &&
          (<Col xs={12}>
            <Loading label={'PASTA.LABELS.GESTAO_ACESSO_EXTERNO_LABEL_CANCELANDO'} />
          </Col>)
        }
        <Col xs={12}>
          <DataList
            label={'PASTA.LABELS.GESTAO_ACESSO_EXTERNO_LINK_ENVIADO'}
            value={interessados} />
        </Col>
        <Col xs={12}>
          <DataList
            label={'PASTA.LABELS.GESTAO_ACESSO_EXTERNO_ANEXO_LIBERADO'}
            value={anexos} />
        </Col>
        <Col xs={12} style={{ marginBottom: 10 }}>
          <Caption>Dados atualizados
            em {moment(dtUltimaAtualizacao).format('DD/MM/YYYY HH:mm')} por {usuarioUltimaAtualizacao['nome']}</Caption>
        </Col>
        {item['tpSituacao'] === 'A' &&
          <Col xs={12}>
            <OutlinedButton
              classModifiers={'sds-btn--secondary'}
              label={'PASTA.LABELS.GESTAO_ACESSO_EXTERNO_LABEL_CANCELAR'}
              onClick={() => this.cancelarAcesso(item)} />
          </Col>
        }
      </Row>
    );
  };

  redirecionaparaProcesso = (cdProcesso) => {
    //eslint-disable-next-line
    parent.window.location.href = `${window.location.protocol + '//' + window.location.host}/cpav/visualizarProcesso.do?cdProcesso=${cdProcesso}`;
  };

  renderItemHeader = (item, cancelando) => {
    return (<Row>
      {cancelando &&
        (<Col xs={12}>
          <Loading label={'PASTA.LABELS.GESTAO_ACESSO_EXTERNO_LABEL_CANCELANDO'} />
        </Col>)
      }
      <Col xs={6}
        md={4}
        lg={2}>
        <DataList
          label={'PASTA.LABELS.GESTAO_ACESSO_EXTERNO_DATA_LIBERACAO'}
          value={moment(item['dtCadastro']).format('DD/MM/YYYY')} />
      </Col>
      <Col xs={6}
        md={4}
        lg={3}>
        {this.renderDataValidade(item)}
      </Col>
      <Col xs={12}
        md={4}
        lg={3}>
        <div className="sds-data">
          <div className="sds-caption">{<FormattedMessage
            id={'PASTA.LABELS.GESTAO_ACESSO_EXTERNO_PEDIDO_VISTAS'} />}</div>
          <p className="sds-link"
            onClick={() => {
              this.redirecionaparaProcesso(item.cdProcessoPedido);
            }}>
            {item['nuPedidoFormatado']}
          </p>
        </div>
      </Col>
      <Col xs={12}
        md={4}
        lg={2}>
        {this.renderSituacao(item)}
      </Col>
      <Col xs={12}
        md={4}
        lg={2}>
        <DataList
          label={'PASTA.LABELS.GESTAO_ACESSO_EXTERNO_USUARIO_LIBERACAO'}
          value={item['usuarioCadastro']['nome']} />
      </Col>
    </Row>);
  };

  render() {
    const {
      errorPageMessage
    } = this.state;
    const {
      acessosLiberados,
      isLoading
    } = this.props;
    if (isLoading) {
      return <Loading />;
    }
    if (_.isEmpty(acessosLiberados)) {
      return (<Fragment>
        {errorPageMessage != null && <AlertError message={errorPageMessage} />}
        <h6>
          <Label value={'PASTA.LABELS.GESTAO_ACESSO_EXTERNO_TITULO_SEM_ACESSO'} />
        </h6>
      </Fragment>);
    }
    return (
      <Fragment>
        {errorPageMessage != null && <AlertError message={errorPageMessage} />}
        <h6>
          <Label value={'PASTA.LABELS.GESTAO_ACESSO_EXTERNO_SUBTITULO'} />
        </h6>
        <CollapseList>
          {acessosLiberados.map(this.renderItem)}
        </CollapseList>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: flowSelectors.isLoadingByType(state, acessoExternoTypes.LIBERAR_ACESSO_EXTERNO, acessoExternoTypes.CARREGAR_ACESSO_LIBERADOS),
    errorPageMessage: flowSelectors.getErrorByType(state, acessoExternoTypes.LIBERAR_ACESSO_EXTERNO, acessoExternoTypes.CARREGAR_ACESSO_LIBERADOS, acessoExternoTypes.EDITAR_ACESSO_LIBERADOS),
    acessosLiberados: acessoExternoSelectors.getAcessosLiberados(state)
  };
}

const mapDispatchToProps = {
  carregar: acessoExternoActions.carregarAcessoExterno,
  cancelar: acessoExternoActions.cancelarAcessoExterno,
  editar: acessoExternoActions.editarAcessoExterno
};

export default compose(connect(mapStateToProps, mapDispatchToProps), injectIntl)(GestaoAcessoExterno);
