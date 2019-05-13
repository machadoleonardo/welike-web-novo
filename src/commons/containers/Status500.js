import React from 'react';
import { compose } from 'redux';
import { injectIntl, FormattedMessage } from 'react-intl';

const Status500 = () => {
  return (
    <section className="sds-page-centered">
      <img className="sds-margin-vertical" width="272px" height="179px" src={`${process.env.PUBLIC_URL}/assets/imgs/500.svg`} alt="Imagem de um alerta dentro de um computador" />
      <div className="sds-container">
        <p className="sds-p"><FormattedMessage id='LABELS.MESSAGES.COMMONS.STATUS_500' /></p>
      </div>
    </section>
  );
}

export default compose(injectIntl)(Status500);
