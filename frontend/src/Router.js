import React, {useEffect} from 'react';
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
import styled from 'styled-components';

const Router = (props) =>{
    const {HomePage, NavBar, Footer, clearAlert} = props;
    const { showAlert, alertMessage, alertType } = props.alerts;

    useEffect(() => {
        if (showAlert) {
            setTimeout(() => {
                clearAlert();
            }, 3000);
        }
    }, [showAlert, alertMessage, alertType]);

    const CustomBrowserRouter = styled(BrowserRouter)`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
    `;

    return (
        <CustomBrowserRouter>
            <NavBar />
            <Switch>
                <Route exact path={"/"}><HomePage /></Route>
                <Route exact path={"/login"}><Login /></Route>
                <Route exact path={'/signup'}><Signup /></Route>
                <Redirect to={'/'} />
            </Switch>
            {showAlert ? <Alert type={alertType} details={alertMessage} /> : null}
            <Footer />
        </CustomBrowserRouter>
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