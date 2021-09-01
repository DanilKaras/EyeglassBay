import { makeAutoObservable } from "mobx"
import {EbayRequest} from "../models/ebaySearchRequest";

export default class SearchStore{

    request: EbayRequest = {} as EbayRequest;
    constructor() {
        makeAutoObservable(this);
    }

    setRequest(request: EbayRequest): void{
        this.request = request;
    }
   
}