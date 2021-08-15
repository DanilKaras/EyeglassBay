import React, {useEffect} from 'react';
import {Container, List} from "semantic-ui-react";
import {EyeGlass} from "../models/eyeGlass";
import NavBar from "./NavBar";
import {useStore} from "../stores/store";
import {observer} from "mobx-react-lite";
import LoadingComponent from "./LoadingComponent";

function App() {

    const {eyeglassStore} = useStore();
    
    useEffect(() => {
        const loadEyeglasses = async () => {
            await eyeglassStore.loadEyeglasses();
        }
        loadEyeglasses();
    }, [eyeglassStore])

    if (eyeglassStore.loadingInitial) return <LoadingComponent content='Loading app'/>
    return (
        <>
            <NavBar/>
            <Container style={{marginTop: '7em'}}>
                <List>
                    {eyeglassStore.eyeGlasses.map((eyeGlass: EyeGlass) => (
                        <List.Item key={eyeGlass.id}>
                            {eyeGlass.productName}
                        </List.Item>
                    ))}
                </List>
            </Container>
        </>
    );
}

export default observer(App);
