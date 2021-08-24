import {observer} from "mobx-react-lite";
import {Grid, Form, Button, Select, Input, Card, Image, Segment, Item, Label, Icon} from 'semantic-ui-react'

const Search = () => {
    return (
        <>
        <Grid centered>
            <Grid.Row>
                <Grid.Column width={16}>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Input
                                width={10}
                                placeholder='Search'
                                name='search'
                            />
                            <Form.Input
                                width={4}
                                placeholder='Price'
                                name='price'
                            />
                            <Form.Input
                                width={4}
                                placeholder='Coefficient'
                                name='Coefficient'
                            />
                            <Form.Button content='Submit' color={'green'} />
                        </Form.Group>
                    </Form>
                </Grid.Column>
            </Grid.Row>
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