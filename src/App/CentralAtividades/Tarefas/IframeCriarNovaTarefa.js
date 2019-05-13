import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Iframe from "../../../commons/components/Iframe";

class IframeCriarNovaTarefa extends PureComponent {

  constructor(props) {
    super(props);
    window.reloadPageAndShowMessageSucess = props.onReloadPageAndShowMessageSucess;
  }

  render() {
    return (
      <Iframe
        id={this.props.id}
        url={this.props.url}
        title={this.props.title}
      />
    );
  }
}

IframeCriarNovaTarefa.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string,
  onReloadPageAndShowMessageSucess: PropTypes.func.isRequired,
};

export default IframeCriarNovaTarefa;
