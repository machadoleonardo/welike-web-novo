import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import ButtonIcon from "../ButtonIcon";

class SnackBar extends PureComponent {

  constructor(props){
    super(props);
    this.timer = null;
  }

  getTypeStyle = () => ( {
   ERROR: "sds-snackbar--error",
   WARNING:  "sds-snackbar--warning"
  })

  onClose = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  setTimer =() => {
    if(this.props.timer){
      let seconds = this.props.timer * 1000;
      this.timer = setTimeout(() => {
        this.onClose();
      }, seconds);
    }
  }

  componentWillUnmount(){
    clearTimeout(this.timer);
  }

  render() {
    this.setTimer();
    let snackTypeClass = this.getTypeStyle()[this.props.type]
    const typeSnackBar = this.props.type;
    return (
      <div className={classnames(`sds-snackbar ${snackTypeClass}`,
        {"sds-snackbar--hide": !this.props.isOpen},
        {"sds-snackbar--show ": this.props.isOpen}
        )}>
        {typeSnackBar === 'ERROR' && 
           <ButtonIcon 
            icon="error"
            classModifiersIcon="sds-snackbar__icon"
          innerInput={false}            
            readonly
           />
        }
        {typeSnackBar === 'WARNING' && 
        <ButtonIcon 
          icon="warning"
          classModifiersIcon="sds-snackbar__icon"
          innerInput={false}
          readonly
          />
        }
        <div className="sds-label sds-snackbar__label">{this.props.children}</div>
        <div className="sds-snackbar__align">
          {
            this.props.renderDesfazer &&
            <button onClick={this.props.onDesfazer} className="sds-btn sds-btn--flat sds-btn--dark-primary sds-waves-effect">Desfazer</button>
          }
          <div onClick={this.onClose} className="sds-btn sds-btn--icon sds-btn--dark-secondary">
            <i className="material-icons">close</i>
          </div>
        </div>
      </div>
    );
  }
}

SnackBar.propTypes = {
  onClose: PropTypes.func,
  onDesfazer: PropTypes.func,
  renderDesfazer: PropTypes.bool,
  isOpen: PropTypes.bool,
};

export default SnackBar;