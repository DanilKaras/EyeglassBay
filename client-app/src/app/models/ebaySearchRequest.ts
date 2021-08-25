export interface EbayRequest {
    searchString: string;
    originalPrice: number;
    coefficient: number;
}

export interface EbayProductItem{
    productName: string;
    price: number;
    url: string;
    image: string;
    isFreeDelivery: boolean;
    isDeliveryNotSpecified: boolean;
    deliveryPrice: number;
    shopName: string;
    isMyShop: boolean;
    totalPrice: number;
    profit: number;
}