import React from 'react';
import Col from '../../../commons/components/Col';
import IconMaterial from '../../../commons/components/IconMaterial';
import ButtonIcon from '../../../commons/components/ButtonIcon';
import Button from '../../../commons/components/Button';
import Row from '../../../commons/components/Row';
import { msg } from '../../../commons/i18n/intl';

const FilaHeadline = ({ labelAcao, title, icone, onClick }) => (
  <Row classModifiers="sds-between-xs sds-middle-xs sds-margin-bottom-lg">
    <Col xs={9} md={6}>
      <p className="sds-p">{msg(title)}</p>
    </Col>

    <Col xs={3} md={6} classModifiers="sds-align-right">
      <Button onClick={onClick} classModifiers="sds-btn--flat sds-hide-down-md" secondary>
        <IconMaterial icon={icone} classModifiers="sds-btn__icon sds-btn__icon--right" />
        {msg(labelAcao)}
      </Button>

      <ButtonIcon
        secondary
        icon={icone}
        innerInput={false}
        onClick={onClick}
        classModifiers="sds-hide-up-md"
      />
    </Col>
  </Row>
)

export default FilaHeadline;