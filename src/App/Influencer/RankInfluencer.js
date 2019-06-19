import React from 'react';
import ReactTable from "react-table";
import {usuarioActions} from "../../redux/modules/usuario";
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import {influencerActions} from "../../redux/modules/influencer";

function RankInfluencer(props) {

    const [influencers, setInfluencers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let influencersFetchData = [];
            props.campaign.references.forEach((reference) => {
                influencersFetchData.push(reference.influencers);
            });
            setInfluencers(influencersFetchData);
        }
        fetchData();
    }, []);

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
        Header: 'Bio',
        accessor: 'bio',
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
                username: <a href={'https://www.instagram.com/' + influencer.username} target="_blank">@{influencer.username}</a>,
                bio: influencer.bio,
                references: this.props.campaign.userNames,
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
                                                    onClick: (e) => {
                                                        console.log(rowInfo);
                                                        props.updateInfluencersSelecteds(rowInfo);
                                                    },
                                                    style: {
                                                        background: rowInfo.index === this.state.selected ? '#00afec' : 'white',
                                                        color: rowInfo.index === this.state.selected ? 'white' : 'black'
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