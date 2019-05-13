import React, { PureComponent } from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { selectors as flowSelectors } from '../../../redux/modules/flow';
import { filtroActions, filtroTypes, filtroSelectors } from "../../../redux/modules/filtros";
import Row from '../../../commons/components/Row';
import Col from '../../../commons/components/Col';
import SearchInput from '../../../commons/components/SearchInput';
import SelectWithMessage from '../../../commons/components/SelecWithMessage';
import { ordenar } from '../../../commons/contantes';
import OutlinedButton from '../../../commons/components/OutlinedButton';
import IconMaterial from '../../../commons/components/IconMaterial';

class BasicForm extends PureComponent {
    executeToggle = () => this.props.toogleFiltro();

    render() {
        const { initialValues } = this.props;

        return (
            <Formik
                enableReinitialize
                initialValues={initialValues}
                render={({
                    values,
                    touched,
                    errors,
                    handleSubmit,
                    setFieldValue,
                    setFieldTouched
                }) => (
                        <form onSubmit={handleSubmit} className="sds-margin-bottom-sm">
                            <Row classModifiers="sds-bottom-md">
                                <Col xs={12} md={6} lg={4}>
                                    <SelectWithMessage
                                        label="FILTROS_SIMPLES.LABEL.ORDERNAR_POR"
                                        name="ordenacao"
                                        items={ordenar}
                                        value={values.ordenacao}
                                        selection={values.ordenacao}
                                        onBlur={setFieldTouched}
                                        error={errors.ordenacao}
                                        touched={touched.ordenacao}
                                        onChange={(name, value) => {
                                            setFieldValue(name, value);
                                            this.props.setaOrdenar(value);
                                        }}
                                    />
                                </Col>

                                <Col xs={12} md={6} lg={7} classModifiers="sds-first-xs sds-last-md sds-col-lg-offset-1">
                                    <div className="sds-fila__filters sds-middle-xs">
                                        <SearchInput
                                            value={values.palavraChave}
                                            onBlur={setFieldTouched}
                                            error={errors.palavraChave}
                                            touched={touched.palavraChave}
                                            loading={this.props.loadingProcesso}
                                            type="text"
                                            name="palavraChave"
                                            placeholder="FILTROS.INPUT.PALAVRA_CHAVE.PLACEHOLDER"
                                            classModifiers="sds-fila__search-input"
                                            onChange={(name, value) => {
                                                setFieldValue(name, value);
                                                this.props.setaBuscarPorPalavra(value);
                                            }}
                                        />

                                        <div className="sds-margin-bottom">
                                            <OutlinedButton waves primary onClick={this.executeToggle} classModifiers="sds-hide-down-lg">
                                                <IconMaterial icon="filter_list" classModifiers="sds-btn__icon sds-btn__icon--right" />
                                                Filtro avançado
                                            </OutlinedButton>

                                            <OutlinedButton waves primary onClick={this.executeToggle} classModifiers="sds-hide-up-lg">
                                                <IconMaterial icon="filter_list" classModifiers="sds-btn__icon sds-btn__icon--right" />
                                            </OutlinedButton>
                                        </div>

                                    </div>
                                </Col>
                            </Row>
                        </form>
                    )}
            />
        )
    }
}

const mapStateToProps = state => ({
    loadingProcesso: flowSelectors.isLoadingByType(state, filtroTypes.FILTRO_SIMPLES),
    initialValues: filtroSelectors.getCamposSimples(state)
})

const mapDispatchToProps = {
    filtroSimples: filtroActions.filtroSimples,
    setaOrdenar: filtroActions.ordenar,
    setaBuscarPorPalavra: filtroActions.buscarPorPalavra,
    toogleFiltro: filtroActions.toggleFiltro
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicForm);