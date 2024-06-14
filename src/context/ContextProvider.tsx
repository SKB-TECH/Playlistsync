"use client";
import React, { createContext, ReactNode, useState } from "react";
import {setData} from "@/storage";



interface ContextProps {
    isclick: boolean;
    setIsclick: React.Dispatch<React.SetStateAction<boolean>>;
    user:any;
    setUser: React.Dispatch<React.SetStateAction<any>>;
}

interface ContextProviderProps {
    children: ReactNode;
}


const ContextApi = createContext<ContextProps | undefined>(undefined);

export const ContextProvider: React.FC<ContextProviderProps> = ({
                                                                    children,
                                                                }) => {
    // Define your state and methods here
    const [isclick, setIsclick] = useState(false);
    const [user, setUser] = useState([{}]);


    return (
        <ContextApi.Provider value={{isclick, setIsclick, user, setUser}}>
            {children}
        </ContextApi.Provider>
    );
};

export default ContextApi;

export function useAppContext(){
    const context = React.useContext(ContextApi);

    if (context === undefined) {
        throw new Error(
            "useAppContext must be used within a AppContextProvider"
        );
    }
    return context;
}