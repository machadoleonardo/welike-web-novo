import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import compareObjects from "./compareObjects";

export default class SectionTitle extends PureComponent {
  static propTypes = {
    section: PropTypes.any.isRequired,
    renderSectionTitle: PropTypes.func.isRequired,
    sectionKeyPrefix: PropTypes.string.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return compareObjects(nextProps, this.props);
  }

  render() {
    const { section, renderSectionTitle, sectionKeyPrefix } = this.props;
    const sectionTitle = renderSectionTitle(section);

    if (!sectionTitle) {
      return null;
    }

    return <div>{sectionTitle}</div>;
  }
}
