import _ from 'lodash';
import React, { PureComponent } from 'react';
import { addFieldFormik, removeFieldFormik } from '../../../../commons/helpers/formik-helper';
import { removeItemSelect } from '../../../../commons/helpers/filtro-helper';

import { connect } from 'react-redux';
import { selectors as flowSelectors } from '../../../../redux/modules/flow';
import { tarefaActions, tarefaTypes, tarefaSelectors } from '../../../../redux/modules/tarefa';

import AutoSuggest from '../../../../commons/components/AutoSuggest';
import Chips from '../../../../commons/components/Chips';
import { msg } from '../../../../commons/i18n/intl';

const ID_ENDPOINT = 'cdTipoTarefa';

class AutoCompleteTarefa extends PureComponent {
	state = { input: "", selecionados: [], items: [] }

	static getDerivedStateFromProps(nextProps) {
		return removeItemSelect(nextProps, 'tarefas', 'tarefasSelecionadas', ID_ENDPOINT);
	}

	// Buscar no Servidor ao digitar;
	onInterestedSuggestionsFetchRequested = ({ value }) => {
		this.props.filtrarTarefa({ id: this.props.id, data: value });
	};

	// html para redenrizar dentro da sugestao.
	renderInterestedSugestion = suggestion =>
		<div className="sds-list__link">{`${suggestion.deTipoTarefa}`}</div>

	renderHtmlChips = chip =>
		<Chips key={chip[ID_ENDPOINT]} value={`${chip.deTipoTarefa}`} onCloseClick={() => this.removeChip(chip)} />

	// Pega valor
	getSuggestionValue = suggestion => suggestion[ID_ENDPOINT]

	// Cria os chips
	renderChipsSelecionados = () =>
		this.props.tarefasSelecionadas.map(item => this.renderHtmlChips(item, this.props.template))

	// callback para remover o chip
	removeChip = item => {
		removeFieldFormik(item, this.props, ID_ENDPOINT);
		this.props.removeSelecionado(item);
		this.setState({ selecionados: _.remove(this.props.tarefasSelecionadas, i => i !== item) });
	}

	onSuggestionSelected = (e, { suggestion }) => {
		addFieldFormik(suggestion, this.props, ID_ENDPOINT);
		this.props.adicionaSelecionado(suggestion);
		this.setState({ input: '', selecionados: [...this.props.tarefasSelecionadas, suggestion] });
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
			zerarfiltroTarefa,
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
				onSuggestionsClearRequested={zerarfiltroTarefa}
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
	loading: flowSelectors.isLoadingByType(state, `${tarefaTypes.FILTRAR_TAREFA}/${props.id}`),
	tarefas: tarefaSelectors.getTarefasSugeridas(state),
	tarefasSelecionadas: tarefaSelectors.getTarefasSelecionadas(state)
})

const mapDispatchToProps = {
	filtrarTarefa: tarefaActions.filtrarTarefa,
	zerarfiltroTarefa: tarefaActions.zerarfiltroTarefa,
	adicionaSelecionado: tarefaActions.adicionaSelecionado,
	removeSelecionado: tarefaActions.removeSelecionada
};

export default connect(mapStateToProps, mapDispatchToProps)(AutoCompleteTarefa);