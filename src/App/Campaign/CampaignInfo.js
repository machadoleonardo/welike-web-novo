import React, {useEffect, useState} from 'react';
import RankInfluencer from './../Influencer/RankInfluencer'
import service from "../../commons/services/campaign";
import Container from "../../commons/components/Template/Container";


function CampaignInfo(props) {
    const [campaign, setCampaign] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const { id } = props.match.params;
            setCampaign(await service.info(id));
        }
        fetchData();
    }, []);

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
                                <h5> <i className="fa fa-user text-primary"></i> Mínimo de seguidores: {campaign.minSeguidores} </h5>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <div className="col-sm-12">
                <RankInfluencer campaign={campaign} />
            </div>
            <div className="col-sm-12">
                <RankInfluencer campaign={campaign} />
            </div>
        </Container>
    );
} export default CampaignInfo;