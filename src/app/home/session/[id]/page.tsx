//@ts-nocheck
"use client"

import React, {useEffect, useState} from 'react';
import {Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, useDisclosure} from "@chakra-ui/react";
import {AddIcon, MinusIcon} from "@chakra-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/settings/store";
import {sessionService} from "@/settings/services/session";
import {removeItem, setData} from "@/storage";
import {Lecteur, New_url, SidebarRight} from "@/components";
import axios from "axios";
import ReactPlayer from "react-player";
import {MdOutlineAddLink, MdOutlineCallEnd} from "react-icons/md";
import {FaUserPlus} from "react-icons/fa";
import {BiMusic} from "react-icons/bi";
import {BsCaretLeft, BsCaretRight} from "react-icons/bs";
import {toast} from "react-toastify";
import {URL_API} from "@/utils";
import {router} from "next/client";
import useSocket from "@/socket";
import {updateSessionInfo} from "@/settings/slices/session";


const Page =({params}:{params:{id:string}})=> {

    const dispatch = useDispatch<AppDispatch>();
    const {sessionData,sessionDetail}=useSelector((state:RootState) => state.session);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const socket = useSocket("sessions");


    // // get all informations of session
    useEffect(() => {
        const sessionData = async () => {
            const res = await dispatch(sessionService.SessionInfo(params?.id))
            if (res.meta.requestStatus === "fulfilled") {
                setData("sessionDetail", res?.payload?.data)
            }
        }
        sessionData();
    }, [dispatch,params?.id]);

    useEffect(() => {
        if (!socket) return
        socket.emit('joinSessionRoom',params?.id);
        socket.on('userJoined',(data)=>{
            dispatch(updateSessionInfo({data:data?.session}))
        })
        socket.on('userRejoined',(data)=>{
            dispatch(updateSessionInfo({data:data?.session}))
        })

        socket.on('musicAdded',(data)=>{
            dispatch(updateSessionInfo({data:data?.session}))
            console.log("Data Url****",data)
        })

        socket.on('messageSent',(data)=>{
            console.log("Message***8",data);
            dispatch(updateSessionInfo({data:data?.session}))
        })
    },[socket]);


    const handleEnd = () => {
        setCurrentVideoIndex((currentVideoIndex + 1) % sessionDetail?.data?.playlist?.musics?.length);
    };


    // quitter la session
    const QuitteSession = async () => {
        if (sessionData?.accessCode!= "") {
           const response= await toast.promise(
                axios.post(`${URL_API}sessions/quit`,{
                    "accessCode":sessionData?.accessCode,
                }))
                if (response.status == 201) {
                    removeItem("sessionData")
                    removeItem("sessionDetail")
                    removeItem("session")
                    router.push("/home")
                }
        }
    };

    return (
        <section  className={`flex flex-row justify-start md:ml-32 ${sessionData?.id && "md:ml-56"}   md:padding-container md:min-w-[100%] bg-light-m dark:bg-dark-m w-[100%] md:min-h-full`}>
            <div className={"md:min-w-[50%] flex flex-col  md:gap-10 gap-4 bg-light-m dark:bg-dark-m md:min-h-full md:mt-0 w-full mt-14 "}>
                    {
                        //@ts-ignore
                        sessionDetail?.data?.playlist?.musics?.length>0 ?
                        (<ReactPlayer
                        url={sessionDetail?.data?.playlist?.musics[currentVideoIndex]?.url}
                        controls={true}
                        onEnded={handleEnd}
                        playing={isPlaying}
                        className={"h-full mt-5 bg-light-m dark:bg-dark-m justify-center items-center"}
                    />):(
                        <div className={"w-full min-h-60 bg-gray-300 flex flex-col justify-center items-center rounded-lg mt-10"}>
                            <h3 className={"text-center animate-pulse text-trose01 font-digital01 bold-32"}>
                                Ajouter des Urls pour votre Session
                            </h3>
                            <button
                        className={" hover:cursor-pointer flexCenter md:w-32 h-10 w-10 p-1 items-center  bg-red-500 mt-10 text-white md:rounded-lg rounded-full"}
                        onClick={onOpen}
                    >
                        <MdOutlineAddLink size={20} color={"white"}/>
                        <span className={"hidden md:flex text-white"}>
                            Url
                        </span>
                    </button>
                        </div>
                    )}
                {<div className={"flex justify-center items-center bg-light-m dark:bg-dark-m  gap-3  h-10 mt-5"}>
                    {sessionDetail?.data?.dj?.id == sessionData?.djId &&  <button
                        className={"md:w-28 h-10 w-10 hover:cursor-pointer  flexCenter p-1 items-center gap-1  bg-red-500 text-white md:rounded-lg rounded-full "}
                        onClick={QuitteSession}

                    >
                        <MdOutlineCallEnd size={20} color={"white"}/>
                        <span className={"hidden md:flex text-white"}>
                            Arrêter
                        </span>
                    </button>}
                    <button
                        className={" hover:cursor-pointer flexCenter md:w-32 h-10 w-10 p-1 items-center  bg-green-400 text-white md:rounded-lg rounded-full"}
                        onClick={onOpen}
                    >
                        <MdOutlineAddLink size={20} color={"white"}/>
                        <span className={"hidden md:flex text-white"}>
                            Ajouter un Url
                        </span>
                    </button>
                   { sessionDetail?.data?.dj?.id == sessionData?.djId && <button
                        className={"md:w-32 h-10 w-10 flexCenter hover:cursor-pointer  gap-2 p-1 items-center  bg-gray-400 text-white md:rounded-lg rounded-full"}>
                        <FaUserPlus size={20} color={"white"}/>
                        <span className={"hidden md:flex text-white"}>
                           Partcipant
                        </span>
                    </button>}
                   { sessionDetail?.data?.dj?.id == sessionData?.djId &&  <div className={"h-full flex w-44 gap-2 text-white rounded-lg "}>
                        <span className={"w-10 h-10 rounded-full flexCenter p-1 bg-gray-400 hover:cursor-pointer"}
                              onClick={() => setCurrentVideoIndex((currentVideoIndex - 1 + playlist.length) % playlist.length)}
                        >
                           <BsCaretLeft size={25} color={"#f200ab"}/>
                        </span>
                        <span className={"w-10 h-10 rounded-full flexCenter p-1 bg-gray-400 hover:cursor-pointer"}
                              onClick={() => setCurrentVideoIndex((currentVideoIndex + 1) % playlist.length)}
                        >
                           <BsCaretRight size={25} color={"#f200ab"}/>
                        </span>
                    </div>}
                </div>}
                <div className={"md:min-w-[80%] border-gray-900 rounded-lg md:h-[36rem] h-[30rem] w-[100%] mt-5 md:mt-10"}>
                    <div className={"w-full h-full overflow-y-auto customer-scrollbar px-2"}>
                        <Accordion allowMultiple={true} className={"text-black dark:text-gray-300"}>
                            {
                                sessionDetail?.data?.playlist?.musics?.map((item,index) => (
                                    <AccordionItem key={index}>
                                        {({isExpanded}) => (
                                            <>
                                                <h3 className={"flexCenter mt-3"}>
                                                    { sessionDetail?.data?.playlist?.musics[currentVideoIndex]?.url === item.url &&
                                                        <BiMusic size={20} color={"#f200ab"} className={"animate-ping"}/>}
                                                </h3>
                                                <h2>
                                                    <AccordionButton>
                                                        <Box as='span' flex='1' textAlign='left'>
                                                            {`${item?.title}`}
                                                        </Box>
                                                        {isExpanded ? (
                                                            <MinusIcon fontSize='12px'/>
                                                        ) : (
                                                            <AddIcon fontSize='12px'/>
                                                        )}
                                                    </AccordionButton>
                                                </h2>
                                                <AccordionPanel pb={4}>
                                                    <Lecteur url={item?.url}/>
                                                </AccordionPanel>
                                            </>
                                        )}
                                    </AccordionItem>
                                ))
                            }

                        </Accordion>
                    </div>
                </div>
            </div>
            <div className={"hidden md:flex md:min-w-[40%] border-l-1 border-gray-200"}>
                <SidebarRight/>
            </div>
            <New_url isOpen={isOpen} onClose={onClose} idsession={sessionDetail?.data?.id}/>
        </section>
    );
};


export default Page;