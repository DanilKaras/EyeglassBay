import EyeglassStore from "./eyeglassStore";
import {createContext, useContext} from "react";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import EbayParserStore from "./ebayParserStore";
import SearchStore from "./searchStore";

interface Store{
    eyeglassStore: EyeglassStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    ebayParserStore: EbayParserStore;
    requestStore: SearchStore;
}

export const store: Store = {
    eyeglassStore: new EyeglassStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    ebayParserStore: new EbayParserStore(),
    requestStore: new SearchStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}