import _ from 'lodash';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { selectors as flowSelectors } from '../../../../redux/modules/flow';
import { classificacaoActions, classificacaoTypes, classificacaoSelectors } from '../../../../redux/modules/classificacao';

import { addFieldFormik, removeFieldFormik } from '../../../../commons/helpers/formik-helper';
import { removeItemSelect } from '../../../../commons/helpers/filtro-helper';

import AutoSuggest from '../../../../commons/components/AutoSuggest';
import Chips from '../../../../commons/components/Chips';
import { msg } from '../../../../commons/i18n/intl';

const ID_ENDPOINT = 'nuClasse';
const ID_ENDPOINT_REMOVE = 'cdClasse';

class AutoCompleteClassificacao extends PureComponent {
	state = { input: "", selecionados: [], items: [] }

	static getDerivedStateFromProps(nextProps) {
		return removeItemSelect(nextProps, 'classificacoes', 'classificacoesSelecionadas', ID_ENDPOINT_REMOVE);
	}

	onInterestedSuggestionsFetchRequested = ({ value }) => {
		this.props.filtrarClassificacao({ id: this.props.id, data: value });
	};

	renderInterestedSugestion = suggestion =>
		<div className="sds-list__link">{`${suggestion[ID_ENDPOINT]} - ${suggestion.nmClasse}`}</div>

	renderHtmlChips = chip =>
		<Chips
			key={chip[ID_ENDPOINT]}
			value={`${chip[ID_ENDPOINT]} - ${chip.nmClasse}`}
			onCloseClick={() => this.removeChip(chip)}
		/>

	getSuggestionValue = suggestion => suggestion[ID_ENDPOINT]

	renderChipsSelecionados = () =>
		this.props.classificacoesSelecionadas.map(item => this.renderHtmlChips(item, this.props.template))

	removeChip = item => {
		removeFieldFormik(item, this.props, ID_ENDPOINT_REMOVE);
		this.props.removeSelecionado(item);
		this.setState({ selecionados: _.remove(this.state.selecionados, i => i !== item) });
	}

	onSuggestionSelected = (e, { suggestion }) => {
		addFieldFormik(suggestion, this.props, ID_ENDPOINT_REMOVE);
		this.props.adicionaSelecionado(suggestion);
		this.setState({ input: '', selecionados: [...this.state.selecionados, suggestion] });
	};

	onInputChange = (e, { newValue }) => this.setState({ input: newValue });

	render() {
		const {
			input,
			items
		} = this.state;

		const {
			loading,
			label,
			placeholder,
			zerarfiltroClassificacao
		} = this.props

		const inputProps = {
			placeholder: msg(placeholder),
			value: input,
			onChange: this.onInputChange
		};

		return (
			<AutoSuggest
				label={label}
				multiple={true}
				suggestions={items}
				onSuggestionsFetchRequested={this.onInterestedSuggestionsFetchRequested}
				onSuggestionsClearRequested={zerarfiltroClassificacao}
				getSuggestionValue={this.getSuggestionValue}
				renderSuggestion={this.renderInterestedSugestion}
				onSuggestionSelected={this.onSuggestionSelected}
				renderSuggestionSelected={this.renderChipsSelecionados}
				inputProps={inputProps}
				isFetching={loading}
			/>
		)
	}
}

// State Propos
const mapStateToProps = (state, props) => ({
	loading: flowSelectors.isLoadingByType(state, `${classificacaoTypes.FILTRAR_CLASSIFICACAO}/${props.id}`),
	classificacoes: classificacaoSelectors.getClassificacoesSugeridas(state),
	classificacoesSelecionadas: classificacaoSelectors.getClassificacoesSelecionadas(state)
})

const mapDispatchToProps = {
	filtrarClassificacao: classificacaoActions.filtrarClassificacao,
	zerarfiltroClassificacao: classificacaoActions.zerarfiltroClassificacao,
	adicionaSelecionado: classificacaoActions.adicionaSelecionado,
	removeSelecionado: classificacaoActions.removeSelecionada
};

export default connect(mapStateToProps, mapDispatchToProps)(AutoCompleteClassificacao);