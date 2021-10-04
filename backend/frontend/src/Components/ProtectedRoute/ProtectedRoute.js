import React, {useEffect} from 'react';
import {Route} from "react-router-dom";
import {addAlert} from "../../Store/alerts/alertReducer.actions";
import {connect} from "react-redux";
import {Redirect, useHistory} from "react-router";

const ProtectedRoute = ({children, path, addAlert, user}) =>{
    const history = useHistory();
    const {isLoggedIn} = user;

    if(isLoggedIn){
        return(
            <Route exact path={path}>
                {children}
            </Route>
        )
    }else{
        return(
            <Redirect to={'/'} />
        )

    }
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