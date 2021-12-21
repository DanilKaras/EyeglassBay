import EyeglassStore from "./eyeglassStore";
import {createContext, useContext} from "react";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import EbayParserStore from "./ebayParserStore";
import SearchStore from "./searchStore";
import SettingsStore from "./settingsStore";

interface Store{
    eyeglassStore: EyeglassStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    ebayParserStore: EbayParserStore;
    requestStore: SearchStore;
    settingsStore: SettingsStore;
}

export const store: Store = {
    eyeglassStore: new EyeglassStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    ebayParserStore: new EbayParserStore(),
    requestStore: new SearchStore(),
    settingsStore: new SettingsStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}