/* eslint-disable react-hooks/rules-of-hooks */
//@ts-nocheck
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
import { CgLivePhoto } from "react-icons/cg";
import { FaUsers } from "react-icons/fa";
import {COLORS} from "@/utils";
import { CiLogout } from "react-icons/ci";
import {removeAll} from "@/storage";
import {useRouter} from "next/navigation"




const Navbar = () => {
    const router=useRouter();
    const {setTheme,resolvedTheme}=useTheme()
    const {user}=useSelector((state:RootState) => state.userInfo);
    const {sessionData,sessionDetail}=useSelector((state:RootState) => state.session);

    // @ts-ignore

    const deconnexion=()=>{
        removeAll()
        router.push("/");
    }
    return (
        <section className={`flex justify-end items-center md:mr-10 ${sessionData?.length>0 && "md:ml-[350px] md:min-w-[80%] justify-around"}  md:min-w-[100%] h-14 min-w-full border-b-2 dark:border-b-1 dark:border-gray-600 border-gray-20 bg-white dark:bg-dark-m fixed z-10 gap-10 md:px-10 px-4`}>

                <div className={"flex h-full items-center gap-2"}>
                    {sessionData?.length>0 &&<h3 className={"text-trose01 font-digital01 truncate w-24"} title={`${sessionData?.name}`}>
                        Thème: {sessionData?.name}
                    </h3>}
                </div>


            {sessionData?.length>0 && <div className={"flex justify-between h-full items-center gap-2 md:w-56 w-24"}>
                <div className={"flex items-center gap-2"}>
                    <CgLivePhoto size={22} color={COLORS.rose01} className={"animate-pulse"}/>
                    <h3 className={"text-trose01 font-digital01"}>
                        Live
                    </h3>
                </div>
                <div className={"flex items-center gap-2"}>
                    <FaUsers size={22} color={COLORS.rose01}/>
                    <h3 className={"text-trose01 font-digital01"}>
                        26
                    </h3>
                </div>
            </div>}

            <div className={"flexEnd h-full gap-5"}>
                <div className={"flex items-center justify-between"}>
                    {
                        resolvedTheme === "light" ? <FiSun size={24} onClick={() => setTheme("dark")} color={"#000"}/> :
                            <FiMoon size={24} onClick={() => setTheme("light")} color={"#fff"}/>
                    }
                </div>
                <div>
                    { sessionDetail?.data?.dj?.id==sessionData?.djId &&
                        <Menu>
                            <MenuButton>
                                <Avatar size={"sm"} name={`${user?.pseudo}`}/>
                            </MenuButton>
                            <MenuList>
                                <MenuGroup title='Mon Profile'>
                                    <MenuItem icon={<EditIcon/>}>Infos Personnelles</MenuItem>
                                    <MenuItem icon={<CiSettings size={20} className={"-ml-1"}/>}>Paramètres </MenuItem>
                                </MenuGroup>
                                <MenuDivider/>
                                <MenuGroup title='Aide'>
                                    <MenuItem icon={<HiOutlineDocumentText size={20}
                                                                           className={"-ml-1"}/>}>Documentation</MenuItem>
                                    <MenuItem icon={<QuestionOutlineIcon size={20}/>}>FAQ</MenuItem>
                                </MenuGroup>
                                <MenuGroup title='Autres'>
                                    <MenuItem icon={<CiLogout  size={20} className={"-ml-1"}/>} onClick={deconnexion}>
                                        Déconnexion
                                    </MenuItem>
                                </MenuGroup>
                            </MenuList>
                        </Menu>}

                </div>
            </div>
        </section>
    );
};


export default Navbar;