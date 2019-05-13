import React, { PureComponent } from 'react';

class Manutencao extends PureComponent {
  render() {
    return (
      <section className="sds-page-centered">
        <img className="sds-margin-vertical" width="272px" height="179px" src={`${process.env.PUBLIC_URL}/assets/imgs/manutencao.svg`} alt="imagem de um alerta dentro de um computador" />
        <div className="sds-container">
          <p className="sds-p"><b>O sistema está temporariamente fora do ar para manutenção.</b></p>
          <p className="sds-p">Pedimos desculpas pelos transtornos e informamos que estamos trabalhando o mais rápido possível para retornar à normalidade.</p>
        </div>
      </section>
    );
  }
}

export default Manutencao;
