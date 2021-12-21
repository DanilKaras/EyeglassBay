import {observer} from "mobx-react-lite";
import {useStore} from "../../app/stores/store";
import {useEffect, useState} from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import {Button, Form } from "semantic-ui-react";
import {Formik} from "formik";
import * as Yup from "yup";
import MyTextInput from "../../app/common/form/MyTextInput";
import {SettingsModel} from "../../app/models/settingsModel";

const SettingsPage = () =>{
    const { settingsStore } = useStore();
    const { settings, loading, loadingInitial, updateSettings } = settingsStore;

    useEffect(() => {
        if(!loadingInitial){
            const loadSettings = async () => {
                await settingsStore.loadSettings();
            }
            loadSettings();
        }        
    }, [settings])

    const validationSchema = Yup.object().shape({
        settings: Yup.array().of(
            Yup.object().shape({
                value: Yup.string().required()
            })
        ),
    })
    
    const handleFormSubmit = async (request: SettingsModel[]) => {
        await updateSettings(request);
    }
    

    return(
        <>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={{settings:settings}}
                onSubmit={(values: any) => handleFormSubmit(values)}
            >
                {({ handleSubmit, isValid, isSubmitting, errors, dirty}) => (
        
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <Form.Group widths='4'>
                            <MyTextInput name={'settings[0].value'} label={'Calculation Coefficient'} placeholder={'Coefficient'} type={'text'}/>
                        </Form.Group>
                        <Button
                            disabled={loading || !isValid}
                            loading={loading}
                            positive
                            type='submit'
                            floated={'left'}
                            content='Save' />
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default observer(SettingsPage);