import { makeAutoObservable } from "mobx"
import {EbayRequest} from "../models/ebaySearchRequest";

export default class SearchStore{

    request: EbayRequest = {} as EbayRequest;
    requestFromStorage: EbayRequest = {} as EbayRequest;
    constructor() {
        makeAutoObservable(this);
        this.loadRequestFromStorage();
    }

    setRequest(request: EbayRequest): void{
        this.request = request;
    }
    
    loadRequestFromStorage(){
        this.requestFromStorage.searchString = localStorage.getItem("searchString") || "";
        this.requestFromStorage.originalPrice = Number(localStorage.getItem("originalPrice")) || null;
        this.requestFromStorage.coefficient = Number(localStorage.getItem("coefficient")) || null;
    }
   
}