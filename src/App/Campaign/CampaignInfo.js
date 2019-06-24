import React, {useEffect, useState} from 'react';
import RankInfluencer from './../Influencer/RankInfluencer';
import InfluencersSelecteds from './../Influencer/InfluencersSelecteds';
import service from "../../commons/services/campaign";
import selectedService from "../../commons/services/selected";
import Container from "../../commons/components/Template/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Button} from "react-bootstrap";
import {influencerSelectors} from "../../redux/modules/influencer";
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";


function CampaignInfo(props) {
    const [campaign, setCampaign] = useState({});

    useEffect(() => {
        findCampaign();
    }, []);


    async function findCampaign() {
        const { id } = props.match.params;
        const campaignService = await service.info(id);
        setCampaign(campaignService);
    }

    const save = async () => {
        let selecteds = props.influencersSelecteds();

        selecteds.forEachSync((selected) => {
            selected.campaign = campaign;
        });

        await selectedService.save(selecteds);
        alert("salvo com sucesso!");
    };

    return (
        <Container>
            <div className="page page-forms-common">
                <div className="bg-light lter b-b wrapper-md mb-10">
                    <div className="row">
                        <div className="col-sm-6 col-xs-12">
                            <h1 className="font-thin h3 m-0">Campanha {campaign.name}</h1>
                            <small className="text-muted">Tudo sobre sua campanha</small>
                        </div>
                    </div>
                </div>
            </div>
            <Row>
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-md-12">
                            <section className="boxs">
                                <div className="boxs-header dvd dvd-btm">
                                    <h1 className="custom-font">Informações</h1>
                                </div>
                                <div className="boxs-body">
                                    {/*<h5> <i className="fa fa-map-marker text-primary"></i> Localização: {campaign.location} </h5>*/}
                                    <h5> <i className="fa fa-user text-primary"></i> Total seguidores: {campaign.totalFollowers} </h5>
                                    <h5> <i className="fa fa-user text-primary"></i> Total influenciadores: {campaign.totalInfluencers} </h5>
                                    <h5> <i className="fa fa-user text-primary"></i> Total referências: {campaign.totalReference} </h5>
                                    <h5> <i className="fa fa-user text-primary"></i> Mínimo de seguidores: {campaign.minFollowers} </h5>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </Row>
            <Row>
                <Col md={12} xs={12}>
                    <RankInfluencer campaign={campaign} />
                </Col>
            </Row>
            <Row>
                <Col md={12} xs={12}>
                    <InfluencersSelecteds campaign={campaign} />
                </Col>
            </Row>
            <Row>
                <Col md={12} xs={12}>
                    <Button className={'btn-raised'} onClick={save} type="button">Salvar</Button>
                </Col>
            </Row>
        </Container>
    );
}

function mapStateToProps(state) {
    return {
        influencersSelecteds: () => {
            return influencerSelectors.getInfluencersSelecteds(state)
        },
    };
}


export default compose(connect(mapStateToProps, null))(CampaignInfo);