import EyeglassStore from "./eyeglassStore";
import {createContext, useContext} from "react";
import CommonStore from "./commonStore";

interface Store{
    eyeglassStore: EyeglassStore;
    commonStore: CommonStore;
}

export const store: Store = {
    eyeglassStore: new EyeglassStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}