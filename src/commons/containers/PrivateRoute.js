import React, { PureComponent } from 'react';
import { Route } from "react-router-dom";
import { compose } from 'redux';
import { connect } from 'react-redux';

import { usuarioSelectors } from '../../redux/modules/usuario'
import Status404 from './Status404';

class PrivateRoute extends PureComponent {

  render() {
    const { possuiAcesso, component: Component, ...rest } = this.props;

    // se o usuário não estiver autorizado à rota, redirecionar para o 404
    return (
      <Route {...rest} render={(props) => (
        (possuiAcesso === true)
          ? <Component {...props} />
          : <Status404 />
      )} />);
  }
}

function mapStateToProps(state, props) {
  return {
    possuiAcesso: usuarioSelectors.isPossuiAcessoTela(state, props.path),
  };
}

export default compose(connect(mapStateToProps))(PrivateRoute);