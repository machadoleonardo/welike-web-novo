import React from 'react';
import {Link} from 'react-router-dom';

class Menu extends React.Component {
    render() {
        return (

            <aside id="leftmenu">
                <div id="leftmenu-wrap">
                    <div className="panel-group slim-scroll" role="tablist">
                        <div className="panel panel-default">
                            <div id="leftmenuNav" className="panel-collapse collapse in" role="tabpanel">
                                <div className="panel-body">
                                    <ul id="navigation">
                                        <li>
                                            <Link to="/">
                                                <i className="fa fa-dashboard"></i>
                                                <span>Dashboard</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/campaigns">
                                                <i className="fa fa-rocket"></i>
                                                <span>Campanhas</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/reference-youtube">
                                                <i className="fa fa-youtube-play"></i>
                                                <span>Referências no YouTube</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/search-reference">
                                                <i className="fa fa-search"></i>
                                                <span>Buscar Referências</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <a href="monitoring.html">
                                                <i className="fa fa-eye"></i>
                                                <span>Monitoramento</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="panel settings panel-default">

                            <div className="panel-heading" role="tab">
                                <h4 className="panel-title">
                                    <a href="#">Status da pesquisa
                                        <i></i>
                                    </a>
                                </h4>
                            </div>
                            {/*<div className="milestone-sidbar">*/}
                            {/*    <StatusCampaign></StatusCampaign>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </aside>
        );
    }
}
export default Menu;