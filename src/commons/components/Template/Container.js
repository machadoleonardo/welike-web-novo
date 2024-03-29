import React, {Fragment} from 'react';
import SideBar from "./SideBar";

class Container extends React.Component {
    render() {
        return (
            <Fragment>
                <div className="row container-full">
                    <div className="col-sm-2 no-padding-right no-margin-right container-full">
                        <SideBar/>
                    </div>
                    <div className="col-sm-10 no-padding-left no-margin-left">
                        {this.props.children}
                    </div>
                </div>
            </Fragment>
        );
    }
}
export default Container;