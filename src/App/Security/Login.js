import React from 'react';
import {usuarioActions} from "../../redux/modules/usuario";
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import {injectIntl} from "react-intl";
import {Formik} from "formik";
import { withRouter } from "react-router";

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    login = (values) => {
        const { login } = this.props;
        login({...values});
        this.props.history.push("/dashboard");
    };

    componentWillMount() {
        document.body.classList.remove('main_Wrapper');
        document.body.classList.add('signup-page');
    }

    render() {
        return (
            <div className="wrapper">
                <div className="header header-filter" style={{ backgroundImage: "url(assets/welike/images/login-bg-people-playing-pb.png)", backgroundSize: "cover", backgroundPosition: "top center" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 text-center">
                                <div className="card card-signup">
                                    <Formik
                                        initialValues={{
                                            user: '', password: ''
                                        }}
                                        onSubmit={(values) => {
                                            this.login(values);
                                        }}
                                        render={({
                                             handleSubmit,
                                             isSubmitting,
                                             handleChange
                                         }) => (
                                        <form onSubmit={handleSubmit}>
                                            <div className="header header-primary text-center">
                                                <img src="assets/welike/images/logo-we-like_branco.png" alt="Smiley face" height="42" />
                                            </div>
                                            <h3 className="mt-0">Welcome</h3>
                                            <p className="help-block">Login</p>
                                            <div className="content">
                                                <div className="form-group">
                                                    <input name="user" type="text" onChange={handleChange} className="form-control underline-input normalText" placeholder="Enter Your Email" />
                                                </div>
                                                <div className="form-group">
                                                    <input name="password" type="password" onChange={handleChange} placeholder="Password..." className="form-control underline-input normalText" />
                                                </div>
                                            </div>
                                            <div className="footer text-center">
                                                <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-raised">Login<div className="ripple-container"></div></button>
                                            </div>
                                            <a href="forgotpass.html" className="btn btn-primary btn-wd btn-lg">FORGOT PASSWORD?</a>
                                        </form>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer className="footer">
                        <div className="container">
                            <div className="col-lg-12 text-center">
                                {/* <a href="signup.html" className="text-uppercase text-white">Create an account</a> */}
                                <div className="copyright"> &copy; 2017, made with <i className="fa fa-heart heart"></i> in Porto Alegre </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    login: usuarioActions.login,
};

export default compose(connect(null, mapDispatchToProps), injectIntl, withRouter)(Login);