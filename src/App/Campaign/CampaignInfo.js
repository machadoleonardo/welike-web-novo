import React, {useEffect, useState} from 'react';
import RankInfluencer from './../Influencer/RankInfluencer';
import InfluencersSelecteds from './../Influencer/InfluencersSelecteds';
import service from "../../commons/services/campaign";
import Container from "../../commons/components/Template/Container";
import Row from "react-bootstrap/Row";


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
                <div className="col-sm-12">
                    <RankInfluencer campaign={campaign} />
                </div>
            </Row>
            <Row>
                <div className="col-sm-12">
                    <InfluencersSelecteds/>
                </div>
            </Row>
        </Container>
    );
} export default CampaignInfo;