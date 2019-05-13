import React, { PureComponent } from 'react';
import FilaProcessos from './FilaTrabalho/FilaProcessos';
import Page from '../../commons/components/Page';
import CentralMenuContainer from './CentralMenuContainer';

class CentralAtividades extends PureComponent {
  render(){
    const { pathname } = this.props.location;
    
    return (
      <Page>
        <CentralMenuContainer path={pathname} />
        <FilaProcessos />
      </Page>
    );
  }
}

export default CentralAtividades;
