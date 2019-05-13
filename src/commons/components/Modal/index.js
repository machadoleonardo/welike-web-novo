import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

class Modal extends PureComponent {

  componentDidMount() {
    if (this.props.onLoadComponent) {
      this.props.onLoadComponent();
    }
  }

  render() {
    return (
      <div className={classnames("sds-modal-wrapper sds-modal-wrapper--gray", { 'sds-modal-wrapper--show': this.props.openModal })}>
        <div className={"sds-modal sds-modal--" + this.props.type}>
          {this.props.title &&
          <header className="sds-modal__header">
            <div className="sds-subtitle-small">{this.props.title}</div>
            <button className="sds-btn sds-btn--flat sds-btn--secondary sds-waves-effect sds-modal-btn__desktop" onClick={this.props.onClose}>
              Fechar
              <i className="material-icons sds-btn__icon sds-btn--right">close</i>
            </button>
            <button className="sds-btn sds-btn--icon sds-btn--secondary sds-modal-btn__mobile" onClick={this.props.onClose}>
              <i className="material-icons">close</i>
            </button>
          </header>
          }

          {this.props.children}

          {this.props.footer &&
          <div className="sds-modal__footer">
            {this.props.footer}
          </div>
          }
        </div>
        <div className="sds-modal__overlay"></div>
      </div>
    );
  }
}

Modal.propTypes = {
  type: PropTypes.string.isRequired,
  openModal: PropTypes.bool.isRequired,
  title: PropTypes.string,
  onClose: PropTypes.func,
  body: PropTypes.object,
  footer: PropTypes.object,
  onLoadComponent: PropTypes.func,
};

export default Modal;