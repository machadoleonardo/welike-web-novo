import React, {useEffect, useState} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import service from "../../commons/services/campaign";
import {Link} from 'react-router-dom';
import Container from "../../commons/components/Template/Container";

function CampaignList() {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        async function fetchData() {
            setCampaigns(await service.get());
        }
        fetchData();
    }, []);

    const columns = [{
        Header: '#',
        accessor: 'icon',
        headerClassName: 'align-middle',
        className: 'text-center'
    }, {
        Header: 'Nome',
        accessor: 'name',
        className: 'text-center'
    }, {
        Header: 'Ação',
        accessor: 'action',
        className: 'text-center'
    }];

    const toData = () => {
        return campaigns.map((campaign) => {
            return {
                icon: <i className="fa fa-rocket"></i>,
                name: <Link to={'/dashboard'}>{campaign.name}</Link>,
                action: <button type="button" className="btn btn-raised btn-sm btn-success">
                    <i className="fa fa-play"></i>
                </button>
            }
        });
    };

    return(
        <Container>
            <div className={"container-fluid"}>
                <div className="page page-forms-common">
                    <div className="bg-light lter b-b wrapper-md mb-10">
                        <div className="row">
                            <div className="col-sm-6 col-xs-12">
                                <h1 className="font-thin h3 m-0 text-primary">Campanhas</h1>
                                <Link to="/campanha/form"><small className="text-muted text-default">Criar nova campanha</small></Link>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <section className="boxs">
                                <div className="boxs-body">
                                    <ReactTable
                                        data={toData()}
                                        columns={columns}
                                    />
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )

} export default CampaignList;