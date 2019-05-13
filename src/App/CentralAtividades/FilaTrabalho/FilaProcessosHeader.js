import _ from "lodash";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { compose } from "redux";
import connect from "react-redux/es/connect/connect";

import { filaTypes } from "../../../redux/modules/fila";
import { selectors as flowSelectors } from "../../../redux/modules/flow";
import { getItem } from "../../../commons/helpers/storage-helper";

import FilaFormHeader from "./FilaFormHeader";
import Col from "../../../commons/components/Col";
import Container from "../../../commons/components/Container";

const LOCAL_STORAGE_PRIMEIRO_ACESSO =
	"br.com.softplan.ungp.cpa.frontend.primeiro-acesso";

class FilaProcessosHeader extends Component {
	onClickRecarregar = () => { 
		window.location.reload(); 
	}
	
	isPrimeiroAcesso = () => {
		const primeiroAcesso = getItem(LOCAL_STORAGE_PRIMEIRO_ACESSO);
		return _.isNull(primeiroAcesso);
	}

	render() {
		const { title, location } = this.props;

		return (
			
			<header className="sds-page__header">
				<Container>
					<header className="sds-page__title sds-row sds-between-xs">
						<Col xs={9} md={6}>
							<h6><FormattedMessage id={title} /></h6>
						</Col>

						<Col xs={3} md={6} classModifiers="sds-align-right">
							{/* {!loading &&
								!this.isPrimeiroAcesso() && (
									<button
										className="sds-btn sds-btn--outlined sds-btn--primary sds-waves-effect"
										onClick={this.onClickRecarregar}
									>
										Recarregar
									</button>
							)} */}
						</Col>
					</header>

					<FilaFormHeader location={location} />
				</Container>
			</header>
		);
	}
}

const mapStateToProps = state => ({
	loading: flowSelectors.isLoadingByType(state, filaTypes.CARREGAR),
})

export default connect(mapStateToProps)(FilaProcessosHeader);
