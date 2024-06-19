//@ts-nocheck
'use client';

import React from 'react';
import {useAppContext} from "@/context/ContextProvider";
import Image from "next/image";
// @ts-ignore
import {Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/tabs";
import {COLORS, dataUser} from "@/utils";
import {useTheme} from "next-themes";
import {FaUserPlus} from "react-icons/fa";
import { IoShareSocial } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import {Options, Participants, Share} from "@/components";
import {useSelector} from "react-redux";
import {RootState} from "@/settings/store";
import {userInfo} from "node:os";
import participants from "@/components/Participants";


const SidebarLeft =()=> {
    const {currentMode}=useAppContext()
    const {setTheme,resolvedTheme}=useTheme();
    const {user}=useSelector((state:RootState) => state.userInfo);
    const {sessionData,sessionDetail}=useSelector((state:RootState) => state.session);


    console.log( sessionDetail?.data?.djId === sessionData?.djI)
    return (
        <section className={`min-w-[16%] ${sessionData?.id && "min-w-[24%"}  dark:bg-dark-m bg-white border-r-2 border-gray-200 dark:border-r-1 dark:border-gray-600 h-screen  fixed shadow-md z-50 md:flex flex-col hidden`}>
            <div className={"w-full px-4 py-4 flexStart gap-3"}>
                <Image src={"/logo.png"} alt={"logo"}  width={40} height={40}/>
                <h2 className={'bold-20 font-lazer text-trose01'}>PlayListSync</h2>
            </div>
            {sessionDetail?.length !=0 && <div className={"bg-light-m dark:bg-dark-m py-4  w-full h-full"}>
                <Tabs variant='line'>
                    <TabList>
                        <Tab _selected={{color: `white`, bg: `${COLORS.bleu02}`}}>
                            <div className={"flex items-center gap-1"}>
                                <FaUserPlus size={15} color={resolvedTheme == "dark" ? "white" : `${COLORS.rose01}`}/>
                                <h6 className={`${resolvedTheme == "dark" ? "text-white" : "text-trose01"}`}>Participants</h6>
                            </div>
                        </Tab>
                       {  sessionDetail?.data?.length!==0 && <Tab _selected={{color: `white`, bg: `${COLORS.bleu02}`}}>
                            <div className={"flex items-center gap-1"}>
                                <IoShareSocial size={15}
                                               color={resolvedTheme == "dark" ? "white" : `${COLORS.rose01}`}/>
                                <h6 className={`${resolvedTheme == "dark" ? "text-white" : "text-trose01"}`}>Partager</h6>
                            </div>
                        </Tab>}
                        {
                            //@ts-ignore
                            sessionDetail?.data?.dj?.id === sessionData?.djId &&  //@ts-ignore
                            <Tab _selected={{color: `white`, bg: `${COLORS.bleu02}`}}>
                                <div className={"flex items-center gap-1"}>
                                    <CiSettings size={15}
                                                color={resolvedTheme == "dark" ? "white" : `${COLORS.rose01}`}/>
                                    <h6 className={`${resolvedTheme == "dark" ? "text-white" : "text-trose01"}`}>Options</h6>
                                </div>
                            </Tab>
                        }
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <div className={"flex flex-col gap-10 items-center md:h-[60rem]"}>
                                {sessionDetail?.data?.participants?.length>0 ? <div
                                    className={"flex flex-col gap-1 items-center max-h-full w-[100%]  overflow-y-auto customer-scrollbar"}>
                                    {
                                        sessionDetail?.data?.participants?.map((item: any, index: number) => (
                                            <Participants pseudo={item.pseudo||item?.user?.pseudo} key={index}/>
                                        ))
                                    }
                                </div>:(
                                    <div className={"flex flex-col gap-5 justify-center items-center h-96 w-[100%] mt-20"}>
                                        <Image src={"/empty.png"} alt={"empty"}  width={200} height={200} className={"animate-bounce"}/>
                                        <h3 className={"text-black/50 dark:text-gray-300"}>
                                            {"Vous n'avez aucun Participant "}
                                        </h3>
                                    </div>
                                )}
                            </div>
                        </TabPanel>
                       {  sessionDetail?.data?.length!=0 && <TabPanel>
                            <Share/>
                        </TabPanel>}
                       {<TabPanel>
                            <Options/>
                        </TabPanel>}
                    </TabPanels>
                </Tabs>
            </div>}
        </section>
    );
};


export default SidebarLeft;