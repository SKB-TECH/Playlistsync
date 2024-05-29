'use client';

import React from 'react';
import {useAppContext} from "@/context/ContextProvider";
import Image from "next/image";



const SidebarLeft =()=> {
    const {currentMode}=useAppContext()
    return (
        <section className={`min-w-[20%] dark:bg-dark-m  border-r-2 border-gray-200 dark:border-r-1 dark:border-gray-600 h-screen  fixed shadow-md z-50 md:flex flex-col hidden`}>
            <div className={"w-full px-4 py-4 flexStart gap-3"}>
                <Image src={"/logo.png"} alt={"logo"}  width={40} height={40}/>
                <h2 className={'bold-20 font-lazer text-trose01'}>PlayListSync</h2>
            </div>

        </section>
    );
};


export default SidebarLeft;