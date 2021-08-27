import {Icon, Item, Label} from "semantic-ui-react";
import {EbayProductItem} from "../../app/models/ebaySearchRequest";


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
                        <Label color={'teal'}>
                            <Icon name='money' /> {item.totalPrice} $
                            <Label.Detail>{item.isDiscounted ? `Discount is ${item.discount} %` : 'No Discount'}</Label.Detail>
                        </Label>
                        </Item.Meta>
                    <Item.Description>
                        <span>Seller: <b>{item.shopName}</b></span>  {item.isDiscounted &&  <span> | Price with no discount: <b>{item.priceNoDiscount} $</b> </span>   }
                    </Item.Description>
                    <Item.Extra>
                        <Label as='a'
                               color={'blue'}
                               href={item.url}
                               target={'_blank'}>
                            <Icon name={'globe'}/> Visit Page
                        </Label>
                        {item.isMyShop &&
                        <Label color={item.profit > 0 ? 'green' : 'red'}>
                            <Icon name='money'/> Profit $ {item.profit}
                        </Label>}
                    </Item.Extra>
                </Item.Content>
            </Item>
    )
}

export default SearchResultItem;