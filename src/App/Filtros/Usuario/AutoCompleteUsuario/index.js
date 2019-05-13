import _ from 'lodash';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { selectors as flowSelectors } from '../../../../redux/modules/flow';
import { usuarioActions, usuarioTypes, usuarioSelectors } from '../../../../redux/modules/usuario';

import { addFieldFormik, removeFieldFormik, removeAllFieldFormik } from '../../../../commons/helpers/formik-helper';

import AutoSuggest from '../../../../commons/components/AutoSuggest';
import Chips from '../../../../commons/components/Chips';
import { msg } from '../../../../commons/i18n/intl';

const ID_ENDPOINT = 'cdUsuario';

class AutoCompleteUsuario extends PureComponent {
	state = { input: "", selecionados: [], items: [] }

	componentWillReceiveProps() {
		this.removeItemsJaSelecionado();
	}

	removeItemsJaSelecionado = () => {
		const sugestoes = this.props.usuarios;
		const selecionados = this.state.selecionados;
		const newItems = _.differenceBy(sugestoes, selecionados, ID_ENDPOINT);
		this.setState({ items: newItems });
	}

	componentWillUnmount() {
		removeAllFieldFormik(this.props);
	}

	onInterestedSuggestionsFetchRequested = ({ value }) => {
		this.props.filtrarUsuario({ id: this.props.id, data: value });
	};

	// html para redenrizar dentro da sugestao.
	renderInterestedSugestion = suggestion =>
		<div className="sds-list__link">{`${suggestion.nmUsuario}`}</div>

	renderHtmlChips = chip =>
		<Chips key={chip[ID_ENDPOINT]} value={`${chip.nmUsuario}`} onCloseClick={() => this.removeChip(chip)} />

	// Pega valor
	getSuggestionValue = suggestion => suggestion[ID_ENDPOINT]

	// Cria os chips
	renderChipsSelecionados = () =>
		this.state.selecionados.map(item => this.renderHtmlChips(item, this.props.template))

	// callback para remover o chip
	removeChip = item => {
		removeFieldFormik(item, this.props, ID_ENDPOINT);
		this.setState({ selecionados: _.remove(this.state.selecionados, i => i !== item) });
	}

	onSuggestionSelected = (e, { suggestion }) => {
		addFieldFormik(suggestion, this.props, ID_ENDPOINT);
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
			zerarfiltroUsuario,
			usuarios
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
				onSuggestionsClearRequested={zerarfiltroUsuario}
				getSuggestionValue={this.getSuggestionValue}
				renderSuggestion={this.renderInterestedSugestion}
				onSuggestionSelected={this.onSuggestionSelected}
				renderSuggestionSelected={this.renderChipsSelecionados}
				inputProps={inputProps}
				isFetching={loading}
				focusInputOnSuggestionClick={true}
			/>
		)
	}
}

// State Propos
const mapStateToProps = (state, props) => ({
	loading: flowSelectors.isLoadingByType(state, `${usuarioTypes.FILTRAR_USUARIO}/${props.id}`),
	usuarios: usuarioSelectors.getUsuarioSugeridos(state)
})

const mapDispatchToProps = {
	filtrarUsuario: usuarioActions.filtrarUsuario,
	zerarfiltroUsuario: usuarioActions.zerarfiltroUsuario
};

export default connect(mapStateToProps, mapDispatchToProps)(AutoCompleteUsuario);