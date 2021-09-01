import {makeAutoObservable} from "mobx";
import agent from "../api/agent";
import {EbayProductItem, EbayRequest} from "../models/ebaySearchRequest";
import {store} from "./store";


export default class EbayParserStore{
    
    minItem: EbayProductItem = {} as EbayProductItem;
    ebayItems: EbayProductItem[] = [];
    loading: boolean = false;
    
    constructor() {
        makeAutoObservable(this);
    }

    getMinItemByRequest = async (request: EbayRequest) => {
        try{
            this.toggleLoad(true);
            store.requestStore.setRequest(request);
            this.minItem = await agent.EbayParser.getMinItem(request);
            this.toggleLoad(false);
        }catch (error){
            this.toggleLoad(true, error);
        }
    }

    getAllItemByRequest = async (request: EbayRequest) => {
        try{
            this.toggleLoad(true);
            store.requestStore.setRequest(request);
            this.ebayItems = await agent.EbayParser.getItems(request);
            this.toggleLoad(false);
        }catch (error){
            this.toggleLoad(true, error);
        }
    }
    
    toggleLoad = (loading: boolean, error: any = null) => {
        this.loading = loading;
        if(error){
            console.log(error);
        }
    }    
}