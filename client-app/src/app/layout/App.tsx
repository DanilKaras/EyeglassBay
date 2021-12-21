import React, {useEffect} from 'react';
import {Container} from "semantic-ui-react";
import NavBar from "./NavBar";
import {observer} from "mobx-react-lite";
import {Route, Switch} from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import PrivateRoute from "./PrivateRoute";
import {useStore} from "../stores/store";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";
import EyeglassList from '../../features/eyeglass/EyeglassList';
import DocumentUpload from "../../features/document/DocumentUpload";
import TestErrors from '../../features/errors/TestError';
import ServerError from '../../features/errors/ServerError';
import NotFound from '../../features/errors/NotFound';
import Search from '../../features/search/search';
import {ToastContainer} from "react-toastify";
import SettingsPage from "../../features/settings/SettingsPage";

function App() {

    const { commonStore, userStore, settingsStore} = useStore();


    useEffect(() => {
        commonStore.token 
            ? userStore.getUser().finally(() => {
                settingsStore.getCalculationCoefficient();
                commonStore.setAppLoaded();
            })
            : commonStore.setAppLoaded();
        
    }, [commonStore, userStore, settingsStore])

    if(!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />
    return (
        <>
            <ToastContainer position={'bottom-right'}  hideProgressBar/>
            <ModalContainer />
            <Route exact path='/' component={HomePage} />
            <Route
                path={'/(.+)'}
                render={() => (
                    <>
                        <NavBar />
                        <Container style={{ marginTop: '7em' }}>
                            <Switch>
                                <PrivateRoute exact path='/' component={HomePage} />
                                <PrivateRoute path='/search' component={Search} />
                                <PrivateRoute path='/eyeglasses' component={EyeglassList} />
                                <PrivateRoute path='/document-upload' component={DocumentUpload} />
                                <PrivateRoute path={'/errors'} component={TestErrors}/>
                                <PrivateRoute path={'/settings'} component={SettingsPage}/>
                                <Route path='/server-error' component={ServerError}/>
                                <Route component={NotFound} />
                            </Switch>
                        </Container>
                    </>
                )}
            />
            
        </>
    );
}

export default observer(App);
