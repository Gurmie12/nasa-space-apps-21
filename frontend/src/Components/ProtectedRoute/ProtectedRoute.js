import React, {useEffect} from 'react';
import {Route} from "react-router-dom";
import {addAlert} from "../../Store/alerts/alertReducer.actions";
import {connect} from "react-redux";
import {useHistory} from "react-router";

const ProtectedRoute = ({children, path, addAlert, user}) =>{
    const history = useHistory();
    const {isLoggedIn} = user;

    useEffect(() =>{
        if(!isLoggedIn){
            addAlert({alertType: 'error', alertMessage: 'Please login to access ' + path});
            history.push('/');
        }
    }, []);

    return(
        <Route exact path={path}>
            {children}
        </Route>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addAlert: (payload) => dispatch(addAlert(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);