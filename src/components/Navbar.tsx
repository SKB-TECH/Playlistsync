"use client";

import React from 'react';
import {Avatar,Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList} from "@chakra-ui/react";
import {useTheme} from "next-themes";
import {FiSun,FiMoon} from "react-icons/fi"
import {useSelector} from "react-redux";
import {RootState} from "@/settings/store";
import {EditIcon, QuestionOutlineIcon} from "@chakra-ui/icons";
import {CiSettings} from "react-icons/ci";
import {HiOutlineDocumentText} from "react-icons/hi";


const Navbar = () => {

    const {setTheme,resolvedTheme}=useTheme()
    const {pseudo}=useSelector((state:RootState) => state.user.user);


    return (
        <section className={"md:ml-[290px] md:min-w-[80%]  h-14 min-w-full border-b-2 dark:border-b-1 dark:border-gray-600 border-gray-20 bg-white dark:bg-dark-m fixed z-10 gap-10 flexEnd px-4"}>
            <div className={"flex items-center justify-between"}>
                {
                    resolvedTheme==="light" ? <FiSun size={24} onClick={()=>setTheme("dark")} color={"#000"}/>:<FiMoon size={24} onClick={()=>setTheme("light")} color={"#fff"}/>
                }
            </div>
            <div>

                <Menu>
                    <MenuButton>
                        <Avatar size={"sm"} name={`${pseudo}`} />
                    </MenuButton>
                    <MenuList>
                        <MenuGroup title='Mon Profile'>
                            <MenuItem icon={<EditIcon />}>Infos Personnelles</MenuItem>
                            <MenuItem icon={<CiSettings size={20} className={"-ml-1"}/>}>Paramètres </MenuItem>
                        </MenuGroup>
                        <MenuDivider />
                        <MenuGroup title='Aide'>
                            <MenuItem icon={<HiOutlineDocumentText size={20} className={"-ml-1"}/>}>Documentation</MenuItem>
                            <MenuItem icon={<QuestionOutlineIcon/>}>FAQ</MenuItem>
                        </MenuGroup>
                    </MenuList>
                </Menu>

            </div>
        </section>
    );
};



export default Navbar;