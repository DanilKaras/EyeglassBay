import {observer} from "mobx-react-lite";
import {Grid, Item, Icon, Divider, Header, Segment} from 'semantic-ui-react'
import {useStore} from "../../app/stores/store";
import SearchPlaceholder from "./searchPlaceholder";
import SearchBar from "./searchBar";
import SearchResultItem from "./searchResultItem";

const Search = () => {
    const {ebayParserStore} = useStore();

    return (
        <>
            <Grid centered>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <SearchBar/>
                    </Grid.Column>
                </Grid.Row>
                <Divider horizontal>
                    <Header as='h4'>
                        <Icon name='tag'/>
                        Eyeglasses
                    </Header>
                </Divider>
                <Grid.Row>
                    <Grid.Column width={16}>
                        {ebayParserStore.loading && <SearchPlaceholder/>}
                        {!ebayParserStore.loading && ebayParserStore.ebayItems && ebayParserStore.ebayItems.length > 0 &&
                        <Segment>
                            <Item.Group divided>
                                {ebayParserStore.ebayItems.map((item, index) => (
                                    <SearchResultItem item={item} key={item.shopName + index}/>))
                                }
                            </Item.Group>
                        </Segment>
                        }
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
}
export default observer(Search);