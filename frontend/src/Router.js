import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom'
import {Redirect} from "react-router";


const Router = (props) =>{
    const {HomePage, routes, NavBar, Footer} = props;

    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                <Route exact path={"/"}><HomePage /></Route>
                {routes &&
                    Object.keys(routes).map((route) =>{
                        return(
                            <Route exact path={routes[route].routePath}>{routes[route].component}</Route>
                        )
                    })
                }
                <Redirect to={'/'} />
            </Switch>
            <Footer />
        </BrowserRouter>
    )
};

export default Router;