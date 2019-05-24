import React, {useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "../../commons/components/Template/Container";
import {Formik} from "formik";
import service from "../../commons/services/campaign";
import {withRouter} from "react-router";
import {compose} from "redux";

function CampaignForm(props) {

    const [start, setStart] = useState(false);

    const save = (values) => {
        if (start) {
            service.saveAndStart(values);
        } else {
            service.save(values);
        }
        props.history.push("/campanha");
    };

    return (
        <Container>
            <div className={"container-fluid"}>
                <div className="page page-forms-common">
                    <div className="bg-light lter b-b wrapper-md mb-10">
                        <div className="row">
                            <div className="col-sm-6 col-xs-12">
                                <h1 className="font-thin h3 m-0 text-primary">Criar Campanha</h1>
                                <small>Preencha todos os campos e obtenha melhores resultados</small>
                            </div>
                        </div>
                    </div>
                    <Formik
                        initialValues={{
                            name: '', minFollowers: 0, seguidores: '', seguindo: ''
                        }}
                        onSubmit={(values) => {
                            save(values);
                        }}
                        render={({
                                     handleSubmit,
                                     handleChange
                                 }) => (
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={10} xs={10}>
                                        <Form.Group controlId="formGroupName">
                                            <Form.Label>Nome</Form.Label>
                                            <Form.Control onChange={handleChange} name={'name'} type="text" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={2} xs={2}>
                                        <Form.Group controlId="formGroupName">
                                            <Form.Label>Mínimo de seguidores</Form.Label>
                                            <Form.Control onChange={handleChange} name={'minFollowers'} type="number" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12} xs={12}>
                                        <Form.Group controlId="formGroupLocalizacao">
                                            <Form.Label>Quem seguiu os perfis de: (arrobas separados por vírgula)</Form.Label>
                                            <Form.Control onChange={handleChange} name="seguidores" type="text" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12} xs={12}>
                                        <Form.Group controlId="formGroupMinSeguidores">
                                            <Form.Label>Quem os perfis seguem: (arrobas separados por vírgula)</Form.Label>
                                            <Form.Control onChange={handleChange} name={'seguindo'} type="text" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Button className={'btn-raised'} type="submit">Salvar</Button>
                                <Button className={'btn-raised'} onClick={() => setStart(true)} type="submit">Salvar/Start</Button>
                            </Form>
                        )}
                    />
                </div>
                {/*<MapModal isOpen={this.state.isOpen} toggleModal={this.toggleModal} map={<Map location={this.refs.location} radius={this.refs.radius}/>} />*/}
            </div>
        </Container>
    );
} export default compose(withRouter)(CampaignForm);