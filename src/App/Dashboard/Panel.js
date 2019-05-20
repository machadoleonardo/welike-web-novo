import React, {Fragment, PureComponent} from 'react';
import service from "../../commons/services/dashboard";
import {injectIntl} from "react-intl";
import {compose} from "redux";
import SideBar from "../../commons/components/Template/SideBar";
import NavBar from "../../commons/components/Template/Navbar";

class Dashboard extends PureComponent {
    constructor() {
        super();
        this.state = {
            dashboard: {}
        }
    }

    componentDidMount() {
        this.setState({
            dashboard: service.getDashboard()
        });
    }

    render() {
        const dashboard = this.state.dashboard;

        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-6 col-xs-12 col-lg-12">
                        <div className="row stats row-sm text-center">
                            <div className="col-md-6 col-sm-6 col-xs-12 col-lg-3">
                                <div className="block panel padder-v item">
                                    <span id="campaignsCount" className="text-info font-thin h1 block">{0}</span>
                                    <span className="text-muted text-xs text-xs">Campaigns</span>
                                    <span className="bottom text-right w-full"><i className="fa fa-rocket text-muted m-r-sm"></i></span>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-12 col-lg-3">
                                <div className="block panel padder-v bg-amethyst item">
                                    <span id="usersCount" className="text-'white' font-thin h1 block">{0}</span>
                                    <span className="text-muted text-xs text-'white'">References</span>
                                    <span className="bottom text-right w-full">
                                        <i className="fa fa-user text-muted m-r-sm"></i></span>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-12 col-lg-3">
                                <div className="block panel padder-v bg-info item">
                                    <span id="followersCount" className="text-'white' font-thin h1 block">{0}</span>
                                    <span className="text-muted text-xs text-'white'">Followers</span>
                                    <span className="bottom text-right w-full"><i className="fa fa-user text-muted m-r-sm"></i> </span>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-12 col-lg-3">
                                <div className="block panel padder-v item">
                                    <span id="friendsCount" className="font-thin h1 block">{0}</span>
                                    <span className="text-muted text-xs">Friends</span>
                                    <span className="bottom text-right w-full"><i className="icon-user-following text-muted m-r-sm"></i></span>
                                </div>
                            </div>
                            <div className="col-xs-12">
                                <div className="block panel padder-v bg-lightgray item">
                                    <div className="col dk padder-v">
                                        <div id="postsCount" className="font-thin h1 text-darkgray"><span>{0}</span></div>
                                        <span className="text-muted text-xs">Posts</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Dashboard;