import React, {useState, useEffect} from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import _ from "lodash";
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import {influencerActions} from "../../redux/modules/influencer";

function RankInfluencer(props) {

    const [influencers, setInfluencers] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        init();
    });

    const init = () => {
        let influencersFetchData = [];
        let campaign = {...props.campaign};

        if (!_.isEmpty(campaign) && _.isEmpty(influencers)) {
            // LOOP SÍNCRONO
            for (let reference of props.campaign.references) {
                _.merge(influencersFetchData, reference.influencers);
            }
            setInfluencers(influencersFetchData);
        }
    };

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
        return influencers.map((influencer) => {
            return {
                foto: <img alt={'img'} src={influencer.profilePicture} />,
                name: influencer.fullName,
                username: <a href={'https://www.instagram.com/' + influencer.userName} target="_blank">@{influencer.userName}</a>,
                references: props.campaign.name,
                followedBy: influencer.followedBy,
                follows: influencer.follows
            }
        });
    };

    return (
        <div className="row">
            <div className="col-md-12">
                <section className="boxs">
                    <div className="boxs-header dvd dvd-btm">
                        <h1 className="custom-font">Ranking de Influenciadores</h1>
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
                                    getTrProps={
                                        (state, rowInfo) => {
                                            if (rowInfo && rowInfo.row) {
                                                return {
                                                    onDoubleClick: (e) => {
                                                        setSelected(rowInfo.index);
                                                        props.updateInfluencersSelecteds(rowInfo.original);
                                                    },
                                                    style: {
                                                        background: rowInfo.index === selected ? '#994c65' : '#4d4e64',
                                                    }
                                                }
                                            } else {
                                                return {}
                                            }
                                        }
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

const mapDispatchToProps = {
    updateInfluencersSelecteds: influencerActions.updateInfluencersSelecteds,
};

export default compose(connect(null, mapDispatchToProps))(RankInfluencer);