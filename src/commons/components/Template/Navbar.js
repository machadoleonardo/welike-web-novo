import React, {Component} from 'react';
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import {injectIntl} from "react-intl";
import {withRouter} from "react-router";
import {noticationActions, notificationSelectors} from "../../../redux/modules/notification";

class NavBar extends Component {

    componentDidMount() {
        this.interval = setInterval(async () => {
            this.props.atualizarNotificacoes();
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div id="wrap" className="animsition">
                <section id="header">
                    <header className="clearfix">
                        <div className="branding">
                            <img src={`${process.env.PUBLIC_URL}/assets/welike/images/logo-we-like_branco.png`} alt="Smiley face" className="welikeLogo" height="42" />
                        </div>

                        <div className="overlay"></div>
                        <ul className="nav-right pull-right list-inline">
                            <li className="dropdown nav-profile">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <img src={`${process.env.PUBLIC_URL}/assets/welike/images/profile-photo.jpg`} alt="" className="0 size-30x30" />
                                </a>
                                <ul className="dropdown-menu" role="menu">
                                    <li>
                                        <div className="user-info">
                                            <div className="user-name">Fernanda</div>
                                        </div>
                                    </li>
                                    <li>
                                        <a href="index.html" role="button" tabIndex="0">
                                            <i className="fa fa-sign-out"></i>Logout</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="dropdown notifications">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="fa fa-bell"></i>
                                    {
                                        this.props.campaigns.length > 0 ?
                                            <div className="notify">
                                                <span className="heartbit"></span>
                                                <span className="point"></span>
                                            </div>
                                            : null
                                    }
                                </a>
                                {
                                    this.props.campaigns.length > 0 ?
                                        <div className="dropdown-menu pull-right with-arrow panel panel-default ">
                                            <ul className="list-group">
                                                <li className="list-group-item">
                                                    <a role="button" tabIndex="0" className="media">
                                                <span className="pull-left media-object media-icon">
                                                    <i className="fa fa-rocket"></i>
                                                </span>
                                                        <div className="media-body">
                                                            <span className="block">A sua campanha Welike está pronta!</span>
                                                            <small className="text-muted">12 minutes ago</small>
                                                        </div>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        : null
                                }
                            </li>
                            <li className="dropdown messages">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="fa fa-cloud"></i>
                                    <div className="notify">
                                        <span></span>
                                        <span id="serverStatusIcon" className="point"></span>
                                    </div>
                                </a>
                                <div className="dropdown-menu pull-right with-arrow panel panel-default" role="menu">
                                    <ul className="list-group">
                                        <li className="list-group-item">
                                            <a id="serverStatusLink" role="button" tabIndex="0" className="media heartbitGreen">
                                                <span className="pull-left media-object ">
                                                    <i className="fa fa-cloud"></i>
                                                </span>
                                                <div className="media-body">
                                                    <span id="serverStatusMessage" className="block heartbitGreen">Teste</span>
                                                    <small id="serverStatusMessageSmall" className="text-muted">9 minutes ago</small>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </header>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    campaigns: notificationSelectors.getCampaigns(state),
});

const mapDispatchToProps = {
    atualizarNotificacoes: noticationActions.atualizarNotificacoes,
};

export default compose(connect(mapStateToProps, mapDispatchToProps), injectIntl, withRouter)(NavBar);