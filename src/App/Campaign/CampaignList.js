import React, {useEffect, useState} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import service from "../../commons/services/campaign";
import {Link} from 'react-router-dom';
import Container from "../../commons/components/Template/Container";
import _ from "lodash";

function CampaignList() {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        async function fetchData() {
            setCampaigns(await service.list());
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
        Header: 'Status',
        accessor: 'status',
        className: 'text-center'
    }, {
        Header: 'Ação',
        accessor: 'action',
        className: 'text-center'
    }];

    function startCampaign(id) {
        service.start(id);
    }

    function statusToString(status) {
        if (_.isNil(status)) {
            return "Não iniciada";
        } else if (status) {
            return 'Finalizada';
        } else {
            return 'Em processamento';
        }
    }

    const toData = () => {
        return campaigns.map((campaign) => {
            return {
                icon: <i className="fa fa-rocket"></i>,
                name: <Link to={'/campanha/info/' + campaign._id}>{campaign.name}</Link>,
                status: statusToString(campaign.result),
                action: <button type="button" onClick={() => startCampaign(campaign._id)} className="btn btn-raised btn-sm btn-success">
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
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )

} export default CampaignList;