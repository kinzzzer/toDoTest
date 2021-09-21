import React, {useContext} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {publickRoutes, privatRoutes} from "../../router/routes";
import {AuthContext} from "../../context/useContext";
import Loader from "./Loader/Loader";

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);
    console.log(isAuth)

    if(isLoading) {
        return <Loader />
    }
    return (
        isAuth
            ?<Switch>
                {privatRoutes.map(route =>
                    <Route
                    component={route.component}
                    path={route.path}
                    exact={route.path}
                    key = {route.path}
                    />
                    )}
                <Redirect to="/posts"/>
            </Switch>
            :<Switch>
                {publickRoutes.map(route =>
                    <Route
                        component={route.component}
                        path={route.path}
                        exact={route.path}
                        key = {route.path}
                    />
                )}
                <Redirect to="/login"/>
            </Switch>

    );
};

export default AppRouter;