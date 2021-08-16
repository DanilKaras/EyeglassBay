import React from 'react';
import {Container} from "semantic-ui-react";
import NavBar from "./NavBar";
import {observer} from "mobx-react-lite";
import {Route, Switch} from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import EyeglassList from "../../features/Eyeglass/EyeglassList";
import Search from "../../features/Search/Search";
import DocumentUpload from "../../features/DocumentUpload/DocumentUpload";
import TestErrors from "../../features/Errors/TestError";
import {ToastContainer} from "react-toastify";
import NotFound from "../../features/Errors/NotFound";
import ServerError from "../../features/Errors/ServerError";

function App() {
    return (
        <>
            <ToastContainer position={'bottom-right'}  hideProgressBar/>
            <NavBar/>
            <Container style={{marginTop: '7em'}}>
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route path='/search' component={Search} />
                    <Route path='/eyeglasses' component={EyeglassList} />
                    <Route path='/document-upload' component={DocumentUpload} />
                    <Route path={'/errors'} component={TestErrors}/>
                    <Route path={'/server-error'} component={ServerError}/>
                    <Route component={NotFound}/>
                </Switch>
               
            </Container>
        </>
    );
}

export default observer(App);
