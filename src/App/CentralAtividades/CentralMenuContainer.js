import React, { Fragment } from 'react';
import { ROUTES } from '../../commons/routes/routes';
import CentralAtividadesMenu from './CentralAtividadesMenu';

const CentralMenuContainer = ({ path })=> (
  <Fragment>
    <nav className="sds-sidemenu sds-sidemenu--fixed">
      <div className="sds-sidemenu__list">
        <CentralAtividadesMenu path={path} routes={ ROUTES } />
      </div>
    </nav>

    <nav className="sds-bottom-navigation">
      <CentralAtividadesMenu path={path} routes={ ROUTES } />
    </nav>
  </Fragment>
);

export default CentralMenuContainer;