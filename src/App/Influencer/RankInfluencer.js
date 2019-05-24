import React from 'react';

class RankInfluencer extends React.Component {

    render() {
        let influencers = [];

        if (this.props.campaign.influencers) {
            influencers = this.props.campaign.influencers.map((influencer, key) => {
                return (
                    <tr key={key}>
                        <td><img alt={'img'} src={influencer.profilePicture} /></td>
                        <td>{influencer.fullName}</td>
                        <td><a href={'https://www.instagram.com/' + influencer.username} target="_blank">@{influencer.username}</a></td>
                        <td>{influencer.bio}</td>
                        <td>{this.props.campaign.userNames}</td>
                        <td>{influencer.followedBy}</td>
                        <td>{influencer.follows}</td>
                    </tr>
                );
            });
        }

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
                                    <table id="searchTextResults" data-filter="#filter" data-page-size="100" className="footable table table-custom">
                                        <thead>
                                            <tr>
                                                <th>Foto</th>
                                                <th>Nome</th>
                                                <th>Username</th>
                                                <th>Bio</th>
                                                <th>Referências</th>
                                                <th>Seguidores</th>
                                                <th>Seguindo</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {influencers}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
} export default RankInfluencer;