import _ from "lodash";
import React, { Component, Fragment } from "react";
import { Router, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { IntlProvider } from "react-intl";
import { connect } from "react-redux";
import { compose } from "redux";

import { getIntlProviderConfig } from "../commons/i18n/intl";
import { ROUTES } from "../commons/routes/routes";
import { usuarioActions, usuarioTypes } from "../redux/modules/usuario";
import {
  actions as flowActions,
  selectors as flowSelectors
} from "../redux/modules/flow";

import Manutencao from "../commons/containers/Manutencao";
import Loading from "../commons/components/Loading";
import PrivateRoute from "../commons/containers/PrivateRoute";
import AlertMessage from "./AlertMessage";
import ModalMessage from "./ModalMessage";

class App extends Component {
  componentWillUnmount() {
    this.props.reset(usuarioTypes.USUARIO_CONSULTAR);
  }

  componentDidMount() {
    this.props.consultarUsuario();
  }

  renderRoutes() {
    return _.chain(ROUTES)
      .map((route, i) => {
        return <PrivateRoute key={i} {...route} />;
      })
      .value();
  }

  render() {
    const { sucesso, done, loading, history } = this.props;

    if (loading || !done) {
      // não terminou de carregar as informações do usuário
      return <Loading />;
    }

    if (!sucesso) {
      // o backend não respondeu com sucesso
      return <Manutencao />;
    }

    const intlProviderProps = getIntlProviderConfig();

    return (
      <Fragment>
        <IntlProvider textComponent={Fragment} {...intlProviderProps}>
          <ConnectedRouter history={history}>
            <Router history={history}>
              <Switch>{this.renderRoutes()}</Switch>
            </Router>
          </ConnectedRouter>
        </IntlProvider>
        <AlertMessage />
        <ModalMessage />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: flowSelectors.isLoadingByType(
      state,
      usuarioTypes.USUARIO_CONSULTAR
    ),
    done: flowSelectors.isDoneByType(state, usuarioTypes.USUARIO_CONSULTAR),
    sucesso: flowSelectors.isSuccessByType(
      state,
      usuarioTypes.USUARIO_CONSULTAR
    )
  };
}

const mapDispatchToProps = {
  consultarUsuario: usuarioActions.consultarUsuario,
  reset: flowActions.reset
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(App);