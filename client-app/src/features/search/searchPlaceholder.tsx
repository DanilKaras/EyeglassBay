import React from 'react';
import {Item, Placeholder, Segment} from 'semantic-ui-react';


const SearchPlaceholder = () => {
        return (
            <>
                <Segment >
                    <Item.Group divided>
                            <Item>
                                <Item.Image size={'small'}>
                                    <Placeholder>
                                        <Placeholder.Image rectangular />
                                    </Placeholder>
                                </Item.Image>
                                <Item.Content>
                                    <Placeholder fluid>
                                        <Placeholder.Line />
                                        <Placeholder.Line />
                                        <Placeholder.Line />
                                    </Placeholder>
                                </Item.Content>
                            </Item>
                    </Item.Group>
                </Segment>         
                
            </>
        )
}

export default  SearchPlaceholder;