import React, {Fragment} from 'react';
import SideBar from "./SideBar";

class Container extends React.Component {
    render() {
        return (
            <Fragment>
                <div className="row">
                    <div className="col-md-2">
                        <SideBar/>
                    </div>
                    <div className="col-md-10 h-100 d-inline-block" style={{"paddingLeft": "50px"}}>
                        {this.props.children}
                    </div>
                </div>
            </Fragment>
        );
    }
}
export default Container;