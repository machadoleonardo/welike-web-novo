import React, {Fragment, PureComponent} from 'react';
import {connect} from 'react-redux';
import { modalMessageSelectors, modalMessageActions } from '../redux/modules/modal-message';
import Dialog from '../commons/components/Dialog/dialog';

class ModalMessage extends PureComponent {

  handleCancelar = () => {
    const { optionsModal, closeModal } = this.props;
    const { cancelar } = optionsModal;

    cancelar();
    closeModal();
  };

  render() {

    const { optionsModal } = this.props;
    const { titulo, mensagem, isOpen, confirmar } = optionsModal;

    return (
      <Dialog
        title={titulo}
        message={mensagem}
        isOpen={isOpen}
        onCancelar={this.handleCancelar}
        onConfirmar={confirmar}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    optionsModal: modalMessageSelectors.getOptionsModal(state)
  };
}

const mapDispatchToProps = {
  closeModal: modalMessageActions.closeModal
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalMessage);