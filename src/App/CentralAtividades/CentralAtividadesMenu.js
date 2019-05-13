import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import classnames from 'classnames';
import IconMaterial from '../../commons/components/IconMaterial';

const MenuList = ({ routes, path }) => (
    <ul className="sds-list">
        <li className={classnames('sds-list__item', { 'sds-list__item--active': (path === routes.FILA_MEUS.path) })}>
            <Link className="sds-list__link" to={routes.FILA_MEUS.path}>                
                <IconMaterial icon="assignment_ind" classModifiers="sds-list__icon" />
                <strong className="sds-hide-down-md"><FormattedMessage id="FILA_PROCESSOS_TAREFAS.MEUS" /></strong>
            </Link>
        </li>

        <li className={classnames('sds-list__item', { 'sds-list__item--active': (path === routes.FILA_OUTROS.path) })} >
            <Link className="sds-list__link" to={routes.FILA_OUTROS.path}>                
                <IconMaterial icon="library_books" classModifiers="sds-list__icon" />
                <strong className="sds-hide-down-md"><FormattedMessage id="FILA_PROCESSOS_TAREFAS.OUTROS" /></strong>
            </Link>
        </li>
    </ul>
)

export default MenuList;

