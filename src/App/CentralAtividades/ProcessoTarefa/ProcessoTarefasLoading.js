import React from 'react';

const ProcessoTarefasLoading = () => {
  return (
    <div className="sds-processo-card sds-processo-card__skeleton">
      <span className="sds-text-invisible" >Carregando o processo...</span>
      <div className="sds-processo-card__processo">
        <header className="sds-processo-card__header">
          <i className="material-icons sds-icon-skeleton">menu</i>
          <div className="sds-processo-card__overflow-text">
            <span className="sds-overline sds-text-skeleton">
              Classificação do processo.
            </span>
          </div>
          <div className="sds-overline sds-text-skeleton">
            <span>Entrada</span>
          </div>
        </header>
        <article className="sds-processo-card__title">
          <div className="sds-processo-card__overflow-text">
            <h6><span className="sds-title-skeleton">Interessado do processo</span></h6>
          </div>
          <p className="sds-p-small"><span className="sds-text-skeleton">Número do processo</span></p>
        </article>
        <footer className="sds-processo-card__footer">
          <p className="sds-p">
            <span className="sds-text-skeleton">Detalhamento do processo. Detalhamento do processo. Detalhamento do processo.</span>
          </p>
        </footer>
      </div>
      <div className="sds-processo-card__expand-btn">
        <i className="material-icons sds-icon-skeleton">menu</i>
      </div>
      <div className="sds-processo-card__tarefas sds-processo-card__tarefas--closed sds-processo-card__tarefas--empty">
        <header className="sds-processo-card__header">
          <article className="sds-processo-card__tarefas-title sds-processo-card__overflow-text">
            <i className="sds-title-skeleton">123</i>
          </article>
        </header>
      </div>
    </div>
  );
}

export default ProcessoTarefasLoading;
