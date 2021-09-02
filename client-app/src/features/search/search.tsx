import {observer} from "mobx-react-lite";
import {Grid, Item, Icon, Divider, Header, Segment} from 'semantic-ui-react'
import {useStore} from "../../app/stores/store";
import SearchPlaceholder from "./searchPlaceholder";
import SearchBar from "./searchBar";
import SearchResultItem from "./searchResultItem";
import {useEffect} from "react";
import {serverErrorOrNoItemsToast} from "../../app/common/utils/toasterMessage";

const Search = () => {
    const { ebayParserStore } = useStore();
    const { ebayItems, loading, initialLoad, isMyStoreMin, hasItems } = ebayParserStore;
    useEffect(() => {
        if(!initialLoad && ebayItems?.length === 0){
            serverErrorOrNoItemsToast();
        }
    }, [ebayItems])
    return (
        <>
            <Grid centered>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <SearchBar/>
                    </Grid.Column>
                </Grid.Row>
                <Divider horizontal>
                    <Header as='h4' color={!hasItems || loading ? 'black' : isMyStoreMin ? 'green' : 'red'}>
                        <Icon name='tag' />
                        Eyeglasses. Number of items: { !loading ? ebayItems?.length || 0 : 0}
                    </Header>
                </Divider>
                <Grid.Row>
                    <Grid.Column width={16}>
                        {loading && <SearchPlaceholder/>}
                        {!loading && ebayItems && ebayItems.length > 0 &&
                        <Segment>
                            <Item.Group divided>
                                {ebayItems.map((item, index) => (
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