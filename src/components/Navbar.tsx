"use client";

import React from 'react';
import { MdLightMode,MdOutlineLightMode  } from "react-icons/md";
import {useAppContext} from "@/context/ContextProvider";
import {Avatar} from "@chakra-ui/react";
import {useTheme} from "next-themes";
import {FiSun,FiMoon} from "react-icons/fi"


const Navbar = () => {

    const {setTheme,resolvedTheme}=useTheme()
    return (
        <section className={"md:ml-[290px] md:min-w-[80%]  h-14 min-w-full border-b-2 dark:border-b-1 dark:border-gray-600 border-gray-20 bg-white dark:bg-dark-m fixed z-10 gap-10 flexEnd px-4"}>
            <div className={"flex items-center justify-between"}>
                {
                    resolvedTheme==="light" ? <FiSun size={24} onClick={()=>setTheme("dark")} color={"#000"}/>:<FiMoon size={24} onClick={()=>setTheme("light")} color={"#fff"}/>
                }
            </div>
            <div>
                <Avatar size={"md"} name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
            </div>
        </section>
    );
};



export default Navbar;