import React, { PureComponent, Fragment } from "react";
import classnames from 'classnames';
import { connect } from "react-redux";
import { selectors as flowSelectors } from "../../../redux/modules/flow";
import { filtroSelectors, filtroActions, filtroTypes } from "../../../redux/modules/filtros";
import { checkboxProcesso, checkboxAtribuicao } from '../../../commons/contantes';
import { Formik, Field } from 'formik';
import AutoCompleteClassificacao from '../../Filtros/Classificacao/AutoCompleteClassificacao';
import AutoCompleteTarefas from '../../Filtros/Tarefa/AutoCompleteTarefa';
import AutoCompleteInteressado from '../../Filtros/Interessado/AutoCompleteInteressado';
import AutoCompleteUsuario from '../../Filtros/Usuario/AutoCompleteUsuario';
import Checkbox from "../../../commons/components/Form/checkbox";
import CheckboxGroup from "../../../commons/components/Form/checkboxGroup";
import Radio from "../../../commons/components/Form/radio";
import RadioGroup from "../../../commons/components/Form/radioGroup";
import Button from "../../../commons/components/Button";
import { ROUTES } from "../../../commons/routes/routes";

class FilaFormSidebar extends PureComponent {
	state = { hasScroll: false, inputUsuario: null }

	setInputUsuario = element => {
		this.inputUsuario = element;
	}

	componentDidMount() {
		if (this.props.location === ROUTES.FILA_OUTROS.path)
			this.setState({ atribuicao: true })
	}

	toggleFiltro = () => {
		this.props.toggleFiltro();
	}

	render() {
		const {
			initialValues,
			filtroAberto,
			filtroAtivo,
			toogleFiltro,
			loadingAplicar
		} = this.props;
		const { hasScroll, atribuicao } = this.state;

		return (
			<div className={classnames('sds-fila__advanced-filter sds-sheet-wrapper', { 'sds-sheet-wrapper--open': filtroAberto })}>
				<Formik
					enableReinitialize
					initialValues={initialValues}
					onSubmit={(values, actions) => {
						this.props.addCamposAvancados(values);
						actions.setSubmitting(false);
					}}

					render={
						({
							values,
							handleSubmit,
							setFieldValue,
							setFieldTouched,
							errors,
							touched
						}) => (
								<form onSubmit={handleSubmit} className={classnames('sds-sheet')}>
									<header className="sds-sheet__header sds-margin-bottom-sm">
										<label className="sds-subtitle">Filtro Avançado</label>
										<button
											type="button"
											className="sds-btn sds-btn--icon sds-btn--secondary"
											onClick={() => toogleFiltro()}
										>
											<i className="material-icons">close</i>
										</button>
									</header>

									<article className="sds-sheet__content">
										<AutoCompleteClassificacao
											id="classificacao"
											label="FILTROS_AVANCADO.LABEL.CLASSIFICACAO"
											placeholder="FILTROS.INPUT.FILTRAR_CLASSIFICACAO.PLACEHOLDER"
											value={values.classificacao}
											error={errors.classificacao}
											touched={touched.classificacao}
											onChange={setFieldValue}
											onBlur={setFieldTouched}
										/>

										<AutoCompleteTarefas
											id="tipoTarefa"
											label="FILTROS_AVANCADO.LABEL.TIPO_DE_TAREFA"
											placeholder="FILTROS.INPUT.FILTRAR_TAREFA.PLACEHOLDER"
											value={values.tipoTarefa}
											error={errors.tipoTarefa}
											touched={touched.tipoTarefa}
											onChange={setFieldValue}
											onBlur={setFieldTouched}
										/>

										<AutoCompleteInteressado
											id="interessado"
											label="FILTROS_AVANCADO.LABEL.INTERESSADO"
											value={values.interessado}
											error={errors.interessado}
											touched={touched.interessado}
											onChange={setFieldValue}
											onBlur={setFieldTouched}
										/>

										{atribuicao && (
											<Fragment>
												<RadioGroup
													label="FILTROS.INPUT.ATRIBUICAO.LABEL"
													value={values.atribuido}
													error={errors.atribuido}
													touched={touched.atribuido}
												>
													{checkboxAtribuicao.items.map(item =>
														<Field
															component={Radio}
															name={checkboxAtribuicao.name}
															key={item.id}
															id={item.id}
															label={item.label}
														/>)}
												</RadioGroup>

												{(values.atribuido === 'ATRIBUIDO') ? (
													<AutoCompleteUsuario
														id="usuarioAtribuicao"
														placeholder="FILTROS.INPUT.FILTRAR_USUARIO.PLACEHOLDER"
														value={values.usuarioAtribuicao}
														error={errors.usuarioAtribuicao}
														touched={touched.usuarioAtribuicao}
														onChange={setFieldValue}
														onBlur={setFieldTouched}
													/>
												) : ''}
											</Fragment>
										)}

										<CheckboxGroup
											id="natureza"
											label="FILTROS.CHECKBOX.FILTRAR_USUARIO.NATUREZA_DO_PROCESSO"
											value={values.natureza}
											error={errors.natureza}
											touched={touched.natureza}
											onChange={setFieldValue}
											onBlur={setFieldTouched}
										>
											{checkboxProcesso.items.map(item => (
												<Field
													key={item.id}
													id={item.id}
													name={checkboxProcesso.name}
													label={item.label}
													component={Checkbox}
												/>
											))}
										</CheckboxGroup>
									</article>

									<footer className={classnames('sds-sheet__footer', { 'sds-sheet__footer--divider': hasScroll })}>
										<Button
											type="submit"
											loading={loadingAplicar}
											classModifiers="sds-btn--raised sds-btn--full-width"
											label={!filtroAtivo ? 'FILTROS.BUTTONS.APLICAR_FILTRO' : 'FILTROS.BUTTONS.ATUALIZAR_FILTRO'}
										/>
									</footer>
								</form>
							)
					}
				/>

				<div onClick={() => toogleFiltro()} className="sds-sheet__overlay"></div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	initialValues: filtroSelectors.getCamposAvancado(state),
	filtroAberto: filtroSelectors.getFiltroAberto(state),
	filtroAtivo: filtroSelectors.getFiltroAtivo(state),
	loadingAplicar: flowSelectors.isLoadingByType(state, filtroTypes.ADD_CAMPOS_AVANCADOS),
})

const mapDispatchToProps = {
	toogleFiltro: filtroActions.toggleFiltro,
	addCamposAvancados: filtroActions.addCamposAvancados,
	aplicarFiltro: filtroActions.filtroAvancado
}

export default connect(mapStateToProps, mapDispatchToProps)(FilaFormSidebar);