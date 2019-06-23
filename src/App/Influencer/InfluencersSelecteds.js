import React, {useEffect, useState} from 'react';
import ReactTable from "react-table";
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import {influencerSelectors} from "../../redux/modules/influencer";

function RankInfluencer(props) {
    const [influencers, setInfluencers] = useState(props.influencersSelecteds);

    useEffect(() => {
        console.log("aqui");
        setInfluencers(props.influencersSelecteds);
    }, [props.influencersSelecteds]);

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
        console.log(influencers);
        return influencers.map((influencer) => {
            return {
                foto: <img alt={'img'} src={influencer.foto.props.src} />,
                name: influencer.name,
                username: <a href={'https://www.instagram.com/' + influencer.username.props.children[1]} target="_blank">@{influencer.username.props.children[1]}</a>,
                references: influencer.references,
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
                </section>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        influencersSelecteds: influencerSelectors.getInfluencersSelecteds(state),
    };
}


export default compose(connect(mapStateToProps, null))(RankInfluencer);