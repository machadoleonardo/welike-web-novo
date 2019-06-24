import React, {Component} from 'react';
import ReactTable from "react-table";
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import {influencerActions, influencerSelectors} from "../../redux/modules/influencer";
import service from "../../commons/services/selected";
import {Button} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class InfluencersSelecteds extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.deleteInfluencersSelecteds();
        this.init();
    }

    init = async () => {
        const influencersSelectes = await service.info(id);
        this.props.insertInfluencersSelecteds(influencersSelectes);
    };

    save = async () => {
        await service.save(this.props.influencersSelecteds());
        alert("salvo com sucesso!");
    };

    render() {
        const columns = [{
            Header: 'Foto',
            accessor: 'foto',
            headerClassName: 'align-middle',
            className: 'text-center'
        }, {
            Header: 'Nome',
            accessor: 'name',
            className: 'text-center'
        }, {
            Header: 'Username',
            accessor: 'username',
            className: 'text-center'
        }, {
            Header: 'Referências',
            accessor: 'references',
            className: 'text-center'
        }, {
            Header: 'Seguidores',
            accessor: 'followedBy',
            className: 'text-center'
        }, {
            Header: 'Seguindo',
            accessor: 'follows',
            className: 'text-center'
        }];

        const toData = () => {
            return this.props.influencersSelecteds().map((influencer) => {
                return {
                    foto: <img alt={'img'} src={influencer.profilePicture} />,
                    name: influencer.fullName,
                    username: <a href={'https://www.instagram.com/' + influencer.userName} target="_blank">@{influencer.userName}</a>,
                    references: influencer.references,
                    followedBy: influencer.followedBy,
                    follows: influencer.follows,
                }
            });
        };

        return (
            <div className="row">
                <div className="col-md-12">
                    <section className="boxs">
                        <div className="boxs-header dvd dvd-btm">
                            <h1 className="custom-font">Influenciadores selecionados</h1>
                        </div>
                        <div className="boxs-body">
                            <div className="row">
                                <div className="col-sm-12">
                                    <ReactTable
                                        data={toData()}
                                        columns={columns}
                                        defaultPageSize={5}
                                        filterable={true}
                                        previousText={'Anterior'}
                                        nextText={'Próxima'}
                                        loadingText={'Carregando...'}
                                        noDataText={'Nenhum registro encontrado'}
                                        pageText={'Página'}
                                        ofText={'de'}
                                        rowsText={'linhas'}
                                        pageJumpText={'Pular para próxima página'}
                                        rowsSelectorText={'linhas por página'}
                                    />
                                </div>
                            </div>
                        </div>
                        <Row>
                            <Col md={12} xs={12}>
                                <Button className={'btn-raised'} onClick={this.save} type="button">Salvar</Button>
                            </Col>
                        </Row>
                    </section>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        influencersSelecteds: () => {
            return influencerSelectors.getInfluencersSelecteds(state)
        },
    };
}

const mapDispatchToProps = {
    updateInfluencersSelecteds: influencerActions.updateInfluencersSelecteds,
    insertInfluencersSelecteds: influencerActions.insertInfluencersSelecteds,
    deleteInfluencersSelecteds: influencerActions.deleteInfluencersSelecteds,
};


export default compose(connect(mapStateToProps, mapDispatchToProps))(InfluencersSelecteds);