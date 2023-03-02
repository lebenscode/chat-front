import React, { useEffect, useState }  from "react";
import {Router, Switch, Route, Redirect} from "react-router-dom";
import { createBrowserHistory } from "history";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import socket from "libs/socket";

// global styles
import "layouts/layout.css";

// layouts
import MainLayout from "layouts/MainLayout";

// containers
import ChatContainer from "containers/ChatContainer";
import LoginPage from "containers/LoginPage";

import { fetchUserData } from "./store";

const customHistory = createBrowserHistory();

export default function App() {
    const [isLoading, setLoading] = useState(true);
    const [isAuth, setAuth] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        // setup socket connection
        // socket();

        dispatch(fetchUserData()).then(unwrapResult).then(profile => {
            console.log(`Authorized with user ${profile.id}`);
            setAuth(true);
            setLoading(false);
        }).catch(err => {
            console.error("Error fetching user data:", err.code, err.message);
            setLoading(false);
        });
    }, []);

    return (
        !isLoading
        ? <Router history={customHistory}>
            <Switch>
                <AuthRoute exact path="/" component={ChatContainer} isAuth={isAuth} />
                <GuestRoute exact path="/login" component={LoginPage} isAuth={isAuth} />
                {/*<Redirect to={'/'} />*/}
            </Switch>
        </Router>
        : <div className="loader_wrap">
            <div className="loader" />
        </div>
    );
};

const AuthRoute = ({component: Component, isAuth, ...rest}) => {
    return (
        isAuth ? <Route {...rest} render={props => (
            <MainLayout>
                <Component {...props} />
            </MainLayout>
        )} /> : <Redirect to={'/login'} />
    );
};

const GuestRoute = ({component: Component, isAuth, ...rest}) => {
    return (
        !isAuth ? <Route {...rest} render={props => (
            <MainLayout>
                <Component {...props} />
            </MainLayout>
        )} /> : <Redirect to={'/'} />
    );
};