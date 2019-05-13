import React from 'react';
import Loading from '../../../../commons/components/Loading';

const FilaLoadingWrapper = ({ children, loadingFiltros, loadingOrdenar, loadingLimparFiltro }) => (
    <div className="sds-fila__loading-wrapper">
        {children}
        {loadingOrdenar && <Loading label="FILTROS.LOADING.LABEL.ORDERNAR_PROCESSO" />}
        {loadingFiltros && <Loading label="FILTROS.LOADING.LABEL.APLICANDO_FILTRO" />}
        {loadingLimparFiltro && <Loading label="FILTROS.LOADING.LABEL.LIMPAR_FILTRO" />}
    </div>
);

export default FilaLoadingWrapper;