import React from 'react';
import {Container, Menu} from "semantic-ui-react";
import NavBar from "./NavBar";
import {observer} from "mobx-react-lite";
import {Route} from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import EyeglassList from "../../features/Eyeglass/EyeglassList";
import Search from "../../features/Search/Search";
import DocumentUpload from "../../features/DocumentUpload/DocumentUpload";

function App() {
    return (
        <>
            <NavBar/>
            <Container style={{marginTop: '7em'}}>
                <Route exact path='/' component={HomePage} />
                <Route path='/search' component={Search} />
                <Route path='/eyeglasses' component={EyeglassList} />
                <Route path='/document-upload' component={DocumentUpload} />
            </Container>
        </>
    );
}

export default observer(App);
