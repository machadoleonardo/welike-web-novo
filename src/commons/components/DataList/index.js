import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import Button from '../Button';
import Caption from '../Caption';
import Paragraph from '../Paragraph';
import classnames from 'classnames'

class DataList extends React.Component {
  render() {
    const { label, value, editable, ...props } = this.props;
    delete props[value];
    return (
      <div className={classnames("sds-data", {"sds-data__row": editable })}>
        <div className="sds-data-list">
        <Caption>{<FormattedMessage id={label} />}</Caption>
        <Paragraph as={"div"} >
          {value}
        </Paragraph>
        </div>
        {editable && (
          <Button classModifiers={"sds-btn--icon sds-btn--secondary sds-data__btn"} {...props}>
            <i className="sds-data__icon material-icons">edit</i>
          </Button>
        )}
      </div>
    );
  }
}

DataList.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  editable: PropTypes.bool
};

DataList.defaultProps = {
  editable: false
};

export default DataList;
