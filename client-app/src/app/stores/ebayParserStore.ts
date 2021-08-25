import {makeAutoObservable} from "mobx";
import agent from "../api/agent";
import {EbayProductItem, EbayRequest} from "../models/ebaySearchRequest";


export default class EbayParserStore{
    
    minItem: EbayProductItem = {} as EbayProductItem;
    ebayItems: EbayProductItem[] = [];
    
    constructor() {
        makeAutoObservable(this);
    }

    getMinItemByRequest = async (request: EbayRequest) => {
        try{
            this.minItem = await agent.EbayParser.getMinItem(request);
        }catch (error){
            console.log(error)
        }
    }

    getAllItemByRequest = async (request: EbayRequest) => {
        try{
            this.ebayItems = await agent.EbayParser.getItems(request);
        }catch (error){
            console.log(error)
        }
    }
    
    
}