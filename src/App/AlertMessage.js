import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {alertMessageActions, alertMessageSelectors} from '../redux/modules/alert-message';
import SnackBar from '../commons/components/SnackBar';

class AlertMessage extends PureComponent {

    timer = null;

    onClose = (id) => {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        this.props.dismissAlert(id);
    };

    onDismiss = (id) => {
        this.props.dismissAlert(id);
    };

    render() {
        const {nextAlertSuccess} = this.props;
        if (nextAlertSuccess === undefined) {
            return null;
        }

        if (_.isEmpty(nextAlertSuccess)) {
            return <SnackBar isOpen={false}/>;
        }

        const {id, type} = nextAlertSuccess;

        if (this.timer) {
            clearInterval(this.timer);
        }

        this.timer = setTimeout(() => {
            this.onClose(id)
        }, 5000);

        return (
            <SnackBar
                type={type}
                isOpen={true}
                onClose={() => {
                    this.onDismiss(id)
                }
                }>
                {nextAlertSuccess.message}
            </SnackBar>
        );
    }
}

function mapStateToProps(state) {
    return {
        nextAlertSuccess: alertMessageSelectors.getNextAlertSuccess(state),
        alerts: alertMessageSelectors.getAlerts(state)
    };
}

const mapDispatchToProps = {
    dismissAlert: alertMessageActions.dismissAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertMessage);