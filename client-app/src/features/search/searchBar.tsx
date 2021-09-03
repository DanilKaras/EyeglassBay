import {observer} from "mobx-react-lite";
import {EbayRequest} from "../../app/models/ebaySearchRequest";
import {Button, Form} from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import {Formik} from "formik";
import {useStore} from "../../app/stores/store";
import {useState} from "react";
import * as Yup from "yup";


const SearchBar = () => {
    const { ebayParserStore, requestStore } = useStore();
    const { getAllItemByRequest, loading } = ebayParserStore;
    const { requestFromStorage } = requestStore;
    const [ebayRequest] = useState<EbayRequest>(requestFromStorage);

    const validationSchema = Yup.object({
        searchString: Yup.string().required('The search string is required'),
        originalPrice: Yup.number().typeError('Number is required').required('Price is required').moreThan(0, 'Price must be greater than 0'),
        coefficient: Yup.number().typeError('Number is required').required('Coefficient is required').moreThan(0, 'Coefficient must be greater than 0')
    })


    
    const handleFormSubmit = async (request: EbayRequest) => {
        await getAllItemByRequest(request);
    }
    return (
        <>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={ebayRequest}
                onSubmit={(values: EbayRequest) => handleFormSubmit(values)}
            >
                {({ handleSubmit, isValid, isSubmitting, errors, dirty}) => (
                    <Form onSubmit={handleSubmit} autoComplete='off'>
                        <Form.Group widths='equal'>
                            <MyTextInput name={'searchString'} placeholder={'Search'} type={'text'} width={10}/>
                            <MyTextInput name={'originalPrice'} placeholder={'Price'} type={'text'} width={4} />
                            <MyTextInput name={'coefficient'} placeholder={'Coefficient'} type={'text'} width={4} />
                        </Form.Group>
                        <Button
                            disabled={loading || !isValid}
                            loading={loading}
                            positive
                            type='submit'
                            floated={'right'}
                            content='Submit' />
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default observer(SearchBar);