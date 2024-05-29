"use client";
import React from 'react';
import {ThemeProvider} from "next-themes";

const ProviderThemes =({children}:{children:React.ReactNode})=> {
    return (
        <ThemeProvider attribute={"class"} defaultTheme='system' enableSystem={true}>
            {children}
        </ThemeProvider>
    );
};



export default ProviderThemes;