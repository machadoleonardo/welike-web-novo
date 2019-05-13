import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from "classnames";
import FlatButton from '../FlatButton/index';
import Paragraph from '../Paragraph/index';
import Loading from '../Loading/index';

class Dialog extends PureComponent {

  render() {
    const { title, message, isOpen, onCancelar, onConfirmar, isLoading } = this.props;
    return (
      <section className={
        classnames("sds-modal-wrapper", 
            {'sds-modal-wrapper--show': isOpen}
          )
        }
      >
      <article className="sds-modal sds-modal--dialog">
        <header className="sds-modal__header">
          <div className="sds-subtitle">{title}</div>
        </header>
        <div className="sds-modal__body">
        <Paragraph>
          {message}
        </Paragraph>
        </div>
        <footer className="sds-modal__footer">
          <FlatButton
              waves
              classModifiers={"sds-btn--secondary sds-waves-effect"}
              onClick={onCancelar}
            >Cancelar</FlatButton>
            <FlatButton
              waves
              classModifiers={"sds-btn--primary sds-waves-effect"}
              onClick={onConfirmar}
            >Confirmar</FlatButton>
        </footer>
        {
         isLoading &&  <Loading/>
        }
      </article>
      <div className="sds-modal__overlay" />
    </section>
    );
  }
}

Dialog.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string
};

export default Dialog;