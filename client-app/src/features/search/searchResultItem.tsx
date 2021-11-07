import {Grid, Icon, Input, Item, Label} from "semantic-ui-react";
import {EbayProductItem} from "../../app/models/ebaySearchRequest";
import ProfitCalculator from "./profitCalculator";


interface Props {
    item: EbayProductItem
}

const SearchResultItem = ({item}: Props) => {
    return (
            <Item>
                <Item.Image
                    size='small'
                    label={item.isMyShop && {
                        color: 'green',
                        corner: 'left',
                        icon: 'check',
                        tooltip: 'Your shop'
                    }}
                    src={item.image}
                />
                <Item.Content>
                    <Item.Header>{item.productName}</Item.Header>
                    <Item.Meta>
                        <Label color={'violet'}>
                            <Icon name='money bill alternate outline' /> {item.price} $
                            <Label.Detail>{item.isDiscounted ? `Discount is ${item.discount} %` : 'No Discount'}</Label.Detail>
                        </Label>
                        <Label color={item.profit > 0 ? 'green' : 'red'}>
                            <Icon name='money bill alternate'/> Profit $ {item.profit} | 15%
                        </Label>
                        </Item.Meta>
                    <Item.Description>
                        <Grid columns={1}>
                            <Grid.Row>
                                <Grid.Column width={12}>
                                    <span>Seller: <b>{item.shopName}</b></span>
                                    {item.isDiscounted &&  <span> | Price with no discount: <b>{item.priceNoDiscount} $</b> </span>}
                                    {(!item.isFreeDelivery || item.isDeliveryNotSpecified) && (<span> | Delivery: <b>{item.deliveryPrice || 'No specified'} $</b> </span>)}
                                    <span> | Total Price <b>{item.totalPrice} $</b></span>
                                    <span> | Stock: <b>{item.stock || 'Not provided'}</b></span>
                                </Grid.Column>
                            </Grid.Row>
                            {item.isMyShop && <ProfitCalculator initPrice={item.priceNoDiscount}/>}
                        </Grid>
                    </Item.Description>
                    <Item.Extra>
                        <Label as='a'
                               color={'blue'}
                               href={item.url}
                               target={'_blank'}>
                            <Icon name={'globe'}/> Visit Page
                        </Label>
                       
                    </Item.Extra>
                </Item.Content>
            </Item>
    )
}

export default SearchResultItem;