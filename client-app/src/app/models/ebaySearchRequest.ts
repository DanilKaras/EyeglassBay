export interface EbayRequest {
    searchString: string;
    originalPrice: number | null;
    coefficient: number | null;
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
    isDiscounted: boolean;
    discount: number | null;
    priceNoDiscount: number | null;
    stock: string;
}