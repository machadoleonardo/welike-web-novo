import React, {Fragment} from 'react';
import SideBar from "./SideBar";

class Container extends React.Component {
    render() {
        return (
            <Fragment>
                <div className="row">
                    <div className="col-sm-2">
                        <SideBar/>
                    </div>
                    <div className="col-sm-10">
                        {this.props.children}
                    </div>
                </div>
            </Fragment>
        );
    }
}
export default Container;