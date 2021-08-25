import {observer} from "mobx-react-lite";
import {Grid, Form, Item, Label, Icon, Button, Divider, Header} from 'semantic-ui-react'
import { ErrorMessage, Formik } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';
import {useState} from "react";
import {EbayProductItem, EbayRequest} from "../../app/models/ebaySearchRequest";

const Search = () => {
    const { ebayParserStore } = useStore();
    const {getAllItemByRequest, getMinItemByRequest} = ebayParserStore;
    const [ebayRequest, setEbayRequest] = useState<EbayRequest>(
        {
            searchString: '', 
            originalPrice: 0, 
            coefficient: 0
        } as EbayRequest);

    const validationSchema = Yup.object({
        searchString: Yup.string().required('The search string is required'),
        originalPrice: Yup.number().required('Price is required').moreThan(0),
        coefficient: Yup.number().required('Coefficient is required').moreThan(0)
    })
    
    const handleFormSubmit = async (request: EbayRequest) => {
        debugger;
        await getMinItemByRequest(request);
    }
    
    return (
        <>
        <Grid centered>
            <Grid.Row>
                <Grid.Column width={16}>
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
                                <MyTextInput name={'originalPrice'} placeholder={'Price'} type={'number'} width={4}/>
                                <MyTextInput name={'coefficient'} placeholder={'Coefficient'} type={'number'} width={4}/>
                            </Form.Group>
                            <Button
                                disabled={isSubmitting || !dirty || !isValid}
                                loading={isSubmitting}
                                positive
                                type='submit'
                                floated={'right'}
                                content='Submit' />
                        </Form>
                        )}
                    </Formik>
                </Grid.Column>
            </Grid.Row>
            <Divider horizontal>
                <Header as='h4'>
                    <Icon name='tag' />
                    Eyeglasses
                </Header>
            </Divider>
            <Grid.Row>
                <Grid.Column width={16}>
                    <Item.Group>
                        <Item>
                            <Item.Image 
                                fluid 
                                label={{ color: 'green', corner: 'left', icon: 'check', tooltip: 'Your shop' }} 
                                src={'https://i.ebayimg.com/thumbs/images/g/8FsAAOSw0p9ff6yj/s-l225.jpg'}
                                
                            />
                            <Item.Content>
                                <Item.Header>Versace VE4359 521771 Havana Green Men's Sunglasses 55 mm</Item.Header>
                                <Item.Meta>$ 94.83</Item.Meta>
                                <Item.Description>
                                    <span>Seller: <b>newbranditems</b></span>
                                </Item.Description>
                                <Item.Extra>
                                    <Label as='a' 
                                           color={'blue'} 
                                           href={'https://www.ebay.com/itm/124350508562?epid=4026940978&hash=item1cf3de2e12:g:8FsAAOSw0p9ff6yj'} 
                                           target={'_blank'}>
                                        <Icon name={'globe'}/> Visit Page
                                    </Label>
                                </Item.Extra>
                             </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </>
    )
}
export default observer(Search);