"use client";

import { Provider } from "react-redux";
import { store } from "../store";
import React from "react";
import { ToastContainer } from "react-toastify";
import { ContextProvider } from "@/context/ContextProvider";

export function ProvidersState({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <ContextProvider>
                {children}
                <ToastContainer />
            </ContextProvider>
        </Provider>
    );
}
