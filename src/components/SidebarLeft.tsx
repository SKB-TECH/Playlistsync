//@ts-nocheck
'use client';

import React from 'react';
import {useAppContext} from "@/context/ContextProvider";
import Image from "next/image";
// @ts-ignore
import {Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/tabs";
import {COLORS, dataUser, URL_API} from "@/utils";
import {useTheme} from "next-themes";
import {FaUserPlus} from "react-icons/fa";
import { IoShareSocial } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import {Options, Participants, Share} from "@/components";
import {useSelector} from "react-redux";
import {RootState} from "@/settings/store";
import {toast} from "react-toastify";
import axios from "axios";
import {getData, removeItem} from "@/storage";
import {errorHandel} from "@/helpers";
import {useRouter} from "next/navigation";
import {router} from "next/client";



const SidebarLeft =()=> {
    const {currentMode}=useAppContext()
    const {setTheme,resolvedTheme}=useTheme();
    const {user,token}=useSelector((state:RootState) => state.userInfo);
    const {sessionData,sessionDetail,participant}=useSelector((state:RootState) => state.session);
    const router = useRouter();
    // quitter la session
    const QuitteSession = async (data:any) => {
        if (sessionDetail?.accessCode != "") {
            const response= await toast.promise(
                axios.delete(`${URL_API}sessions/quit`,{data:data}),{
                    pending:"Traitement en cours ...",
                    error: {
                        render({ data }) {
                            return errorHandel(data);
                        },
                    },
                })
            if (response.status == 200) {
                router.push("/")
                removeItem("sessionData")
                removeItem("sessionDetail")

            }
        }
    };


    //fermer la session
    const FermerSession = async () => {
        if (sessionData?.accessCode!= "") {
            const TOKEN=getData("token")||token;
            const response= await toast.promise(
                axios.patch(`${URL_API}sessions/${sessionData?.id}/close`,{},{
                    headers: {
                        Authorization:`Bearer ${TOKEN}`,
                    }
                    }
                ),{
                    pending: "Encours de fermeture ...",
                    error: {
                        render({ data }) {
                            return errorHandel(data);
                        },
                    },
                })
            if (response.status == 200) {
                removeItem("sessionData")
                removeItem("sessionDetail")
                removeItem("session")
                // sessionDetail?.data?.dj?.id === sessionData?.djId ? router.push("/home"): router.push("/")
            }
        }
    };





    return (
        <section className={`min-w-[16%] ${sessionData?.id && "min-w-[24%"}  dark:bg-dark-m bg-white border-r-2 border-gray-200 dark:border-r-1 dark:border-gray-600 h-screen  fixed shadow-md z-50 md:flex flex-col hidden`}>
            <div className={"w-full px-4 py-4 flexStart gap-3"}>
                <Image src={"/logo.png"} alt={"logo"}  width={40} height={40}/>
                <h2 className={'bold-20 font-lazer text-trose01'}>PlayListSync</h2>
            </div>
            {sessionDetail?.length !=0 &&
                <div className={"bg-light-m dark:bg-dark-m py-4  w-full h-full flex flex-col"}>
                    <Tabs variant='line'>
                        <TabList>
                            {sessionDetail?.data?.length !== 0 && <Tab _selected={{color: `white`, bg: `${COLORS.bleu02}`}}>
                                <div className={"flex items-center gap-1"}>
                                    <FaUserPlus size={15}
                                                color={resolvedTheme == "dark" ? "white" : `${COLORS.rose01}`}/>
                                    <h6 className={`${resolvedTheme == "dark" ? "text-white" : "text-trose01"}`}>Participants</h6>
                                </div>
                            </Tab>}
                            {sessionDetail?.data?.length !== 0 &&
                                <Tab _selected={{color: `white`, bg: `${COLORS.bleu02}`}}>
                                    <div className={"flex items-center gap-1"}>
                                        <IoShareSocial size={15}
                                                       color={resolvedTheme == "dark" ? "white" : `${COLORS.rose01}`}/>
                                        <h6 className={`${resolvedTheme == "dark" ? "text-white" : "text-trose01"}`}>Partager</h6>
                                    </div>
                                </Tab>}
                            {
                                //@ts-ignore
                                sessionData?.djId &&  //@ts-ignore
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
                            {sessionDetail?.data?.length != 0 && <TabPanel>
                                <div className={"flex flex-col gap-10 items-center md:h-[60rem]"}>
                                    {sessionDetail?.data?.participants?.length > 0 ? <div
                                        className={"flex flex-col gap-1 items-center max-h-full w-[100%]  overflow-y-auto customer-scrollbar"}>
                                        {
                                            sessionDetail?.data?.participants?.map((item: any, index: number) => (
                                                <Participants pseudo={item.pseudo || item?.user?.pseudo} key={index}/>
                                            ))
                                        }
                                    </div> : (
                                        <div
                                            className={"flex flex-col gap-5 justify-center items-center h-96 w-[100%] mt-20"}>
                                            <Image src={"/empty.png"} alt={"empty"} width={200} height={200}
                                                   className={"animate-bounce"}/>
                                            <h3 className={"text-black/50 dark:text-gray-300"}>
                                                {"Vous n'avez aucun Participant "}
                                            </h3>
                                        </div>
                                    )}
                                </div>
                            </TabPanel>}
                           <TabPanel>
                                <Share/>
                            </TabPanel>
                            {sessionData?.djId && <TabPanel>
                                <Options/>
                            </TabPanel>}
                        </TabPanels>
                    </Tabs>
                    {sessionDetail?.data?.length != 0 && <div className={"w-full h-16 flex  z-50 justify-center items-center  "}>
                        <button className={"bg-red-500 text-white text-center text-lg h-12 rounded-lg p-2  w-44 "}
                                onClick={sessionDetail?.data?.dj?.id == sessionData?.djId ? FermerSession : () => QuitteSession({
                                    accessCode: sessionDetail?.accessCode || getData("sessionDetail")?.accessCode,
                                    participantId: participant?.id || getData("participant")?.id
                                })}>
                            {sessionDetail?.data?.dj?.id == sessionData?.djId ? "Fermer la session" : "Quitter la session"}
                        </button>
                    </div>}
                </div>}

        </section>
    );
};


export default SidebarLeft;