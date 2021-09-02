import {makeAutoObservable} from "mobx";
import agent from "../api/agent";
import {EbayProductItem, EbayRequest} from "../models/ebaySearchRequest";
import {store} from "./store";
import {serverTimeoutToast} from "../common/utils/toasterMessage";
const TIMEOUT: number = 90;

export default class EbayParserStore{
    
    minItem: EbayProductItem = {} as EbayProductItem;
    ebayItems: EbayProductItem[] = [];
    loading: boolean = false;
    initialLoad: boolean = true;
    timeout: any;
    constructor() {
        makeAutoObservable(this);
    }

    get isMyStoreMin () {
        if(this.ebayItems?.length > 0){
            return this.ebayItems[0].isMyShop;
        }
        return false;
    }
    
    get hasItems(){
        return this.ebayItems.length > 0;
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
            this.checkIfRequestTimedOut();
            this.ebayItems = await agent.EbayParser.getItems(request);
            this.toggleLoad(false);
        }catch (error){
            this.toggleLoad(true, error);
        }
    }
    
    toggleLoad = (loading: boolean, error: any = null) => {
        if(!loading){
            clearTimeout(this.timeout);
        }
        this.initialLoad = false;
        this.loading = loading;
        if(error){
            console.log(error);
        }
    }    
    
    checkIfRequestTimedOut(){
        this.timeout = setTimeout(() => {
            if(this.loading){
                serverTimeoutToast();
                this.ebayItems = [];
                this.toggleLoad(false);
            }
        }, TIMEOUT * 1000)
    }
}