import React from 'react';
import {Link} from 'react-router-dom';

class SideBar extends React.Component {


    render() {
        return (
            <aside id="leftmenu" className={"theme-default aside-fixed"}>
                <div id="leftmenu-wrap">
                    <div className="panel-group slim-scroll" role="tablist">
                        <div className="panel panel-default">
                            <div id="leftmenuNav" className="panel-collapse collapse in" role="tabpanel">
                                <div className="panel-body">
                                    <ul id="navigation">
                                        <li>
                                            <Link to="/dashboard">
                                                <i className="fa fa-dashboard"></i>
                                                <span>Dashboard</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/campanha">
                                                <i className="fa fa-rocket"></i>
                                                <span>Campanhas</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/referencia">
                                                <i className="fa fa-search"></i>
                                                <span>Referências</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        );
    }
}
export default SideBar;