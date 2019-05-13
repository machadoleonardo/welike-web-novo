import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class Iframe extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      height: 0
    };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({
      height: window.innerHeight - 60,
    });
  };

  render() {
    return (
      <iframe
        id={this.props.id}
        title={this.props.title}
        src={this.props.url}
        height={this.state.height}
        width={this.props.width ? this.props.width : "100%"}
        frameBorder="0"/>
    );
  }
}

Iframe.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
  width: PropTypes.number,
  id: PropTypes.string,
  onLoad: PropTypes.func,
  onClose: PropTypes.func,
};

export default Iframe;
