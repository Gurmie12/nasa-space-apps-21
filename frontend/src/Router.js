import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom'
import {Redirect} from "react-router";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { clearAlert } from "./Store/alerts/alertReducer.actions";
import { connect } from "react-redux";
import Alert from './Components/Alert/Alert';
const Router = (props) =>{
    const {HomePage, NavBar, Footer} = props;
    const { showAlert, alertMessage, alertType } = props.alerts;


    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                <Route exact path={"/"}><HomePage /></Route>
                <Route exact path={"/login"}><Login /></Route>
                <Route exact path={'/signup'}><Signup /></Route>
                <Redirect to={'/'} />
            </Switch>
            {showAlert ? <Alert type={alertType} details={alertMessage} /> : null}
            <Footer />
        </BrowserRouter>
    )
};

const mapStateToProps = (state) => {
    return {
        alerts: state.alerts,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearAlert: () => dispatch(clearAlert()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Router);