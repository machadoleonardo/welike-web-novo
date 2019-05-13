import React from 'react';
import classnames from 'classnames';

const Fila = ({ children, ativo }) => (
    <article className={classnames("sds-fila", {'sds-fila--full': !ativo})}>
        { children }
    </article>
);

export default Fila;