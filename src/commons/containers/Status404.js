import React from 'react';
import {compose} from 'redux';
import {injectIntl, FormattedMessage} from 'react-intl';

const Status404 = () => {
    return (
        <div className={"align-middle"}>
            <section className="sds-page-centered">
                <img className="sds-margin-vertical" width="272px" height="179px"
                     src={`${process.env.PUBLIC_URL}/assets/imgs/404.svg`}
                     alt="Imagem de uma tempestade dentro de um computador"/>
                <div className="sds-container">
                    <p className="sds-p"><FormattedMessage id='LABELS.MESSAGES.COMMONS.STATUS_404'/></p>
                </div>
            </section>
        </div>
    );
}

export default compose(injectIntl)(Status404);
