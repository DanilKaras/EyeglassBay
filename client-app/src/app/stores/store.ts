import EyeglassStore from "./eyeglassStore";
import {createContext, useContext} from "react";

interface Store{
    eyeglassStore: EyeglassStore
}

export const store: Store = {
    eyeglassStore: new EyeglassStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}