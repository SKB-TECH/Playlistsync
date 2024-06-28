//@ts-nocheck
"use client"

import React, {useEffect, useState,useRef} from 'react';
import {Accordion,useDisclosure} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/settings/store";
import {sessionService} from "@/settings/services/session";
import {removeItem, setData} from "@/storage";
import {Lecteur, New_url, SidebarRight} from "@/components";
import axios from "axios";
import ReactPlayer from "react-player";
import {MdOutlineAddLink, MdOutlineCallEnd} from "react-icons/md";
import {FaUserPlus} from "react-icons/fa";
import {router} from "next/client";
import useSocket from "@/socket";
import {updateSessionInfo} from "@/settings/slices/session";
import {useRouter} from "next/navigation";
import moment from 'moment';
const Page =({params}:{params:{id:string}})=> {

    const dispatch = useDispatch<AppDispatch>();
    const {sessionData,sessionDetail}=useSelector((state:RootState) => state.session);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const playRef=useRef(null);
    const [time,setTime]=useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const socket = useSocket("sessions");
    const [title, setTitle] = useState()
    const router = useRouter();


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
    //on play 
    const handleplay=()=>{
        setIsPlaying(true);
        socket?.emit("play",{time:playRef?.current?.getCurrentTime()});
    }
    //on pause
    const handlePause = () => {
        setPlaying(false);
        socket.emit('pause', { time: playerRef.current.getCurrentTime() });
      };
      
    //on suate 
    const handleSeek = (time) => {
    socket.emit('seek', { time });
    };

    
    // la fin de la chanson
    const handleEnd = () => {
        setCurrentVideoIndex((currentVideoIndex + 1) % sessionDetail?.data?.playlist?.musics?.length);
    };

    const handlePress=(e:any)=>{
        if (sessionDetail?.data?.dj?.id == sessionData?.djId) {
            socket?.emit("getTime",({
                time:e.playedSeconds
            }))
        }
    }


    useEffect(() => {
        if (!socket) return
        socket.emit('joinSessionRoom', params?.id);
        socket.on('userJoined', (data) => {
            dispatch(updateSessionInfo({data: data?.session}))
        })
        socket.on('userRejoined', (data) => {
            dispatch(updateSessionInfo({data: data?.session}))
        })

        socket.on('musicAdded', (data) => {
            dispatch(updateSessionInfo({data: data?.session}))
        })

        socket.on('messageSent', (data) => {
            dispatch(updateSessionInfo({data: data?.session}))
        })
        socket.on('addLover', (data) => {
            dispatch(updateSessionInfo({data: data?.session}))
        })
        socket.on('removeLover', (data) => {
            dispatch(updateSessionInfo({data: data?.session}))
        })

        socket.on('userQuit', (data) => {
            dispatch(updateSessionInfo({data: data?.session}))
        })

        
        socket.on('sessionClosed', (data) => {
            removeItem("sessionData")
            removeItem("sessionDetail")
            removeItem("session")
            dispatch(updateSessionInfo({data:[]}))
            sessionDetail?.data?.dj?.id === sessionData?.djId ? router.push("/home"): router.push("/")
        })

       socket.on("play",({time})=>{
            setTime(time)
            console.log("time on play",time)
       })
        socket.on("pause",({time})=>{
                setTime(time)
                console.log("time on pause",time)
        })
        socket.on("seek",({time})=>{
            setTime(time)
            console.log("time on seek",time)
        })
        socket.on('getTime',({time})=>{
            // console.log("time",time)
            setTime(time)
        })
    });




    const TimeDisplay = ({ seconds }) => {
        const duration = moment.duration(seconds, 'seconds');
        const formattedTime = moment.utc(duration.asMilliseconds()).format('H:mm:ss');
   
        return <h3 className={"text-center animate-pulse text-trose01 font-digital01 bold-32"}>{formattedTime}</h3>;
      };
   
    return (
        <section  className={`flex flex-row justify-start md:ml-32 ${sessionData?.id && "md:ml-56"}   md:padding-container md:min-w-[100%] bg-light-m dark:bg-dark-m w-[100%] md:min-h-full`}>
            <div className={"md:min-w-[50%] md:ml-16 flex flex-col  md:gap-10 gap-4 bg-light-m dark:bg-dark-m md:min-h-full md:mt-0 w-full mt-14 "}>
                    {
                        //@ts-ignore
                        sessionDetail?.data?.playlist?.musics?.length>0 ?
                         (sessionDetail?.data?.dj?.id == sessionData?.djId ?
                             <ReactPlayer
                                url={sessionDetail?.data?.playlist?.musics[currentVideoIndex]?.url}
                                controls={true}
                                onEnded={handleEnd}
                                playing={isPlaying}
                                onPause={handlePause}
                                onPlay={handleplay}
                                onSeek={(e)=>handleSeek(e)}
                                ref={playRef}
                                onProgress={handlePress}
                                className={"h-full mt-5 bg-light-m dark:bg-dark-m justify-center items-center"}
                            />: <div className={"w-full min-h-60 bg-gray-300 flex flex-col justify-center items-center rounded-lg mt-10"}>
                                    {/* <h3 className={"text-center animate-pulse text-trose01 font-digital01 bold-32"}>
                                        {moment.duration(time,'seconds')}
                                    </h3> */}
                                    <TimeDisplay seconds={time}/>
                            </div>): (
                                <div
                                    className={"w-full min-h-60 bg-gray-300 flex flex-col justify-center items-center rounded-lg mt-10"}>
                                    <h3 className={"text-center animate-pulse text-trose01 font-digital01 bold-32"}>
                                        Ajouter un Url
                                    </h3>
                                </div>
                            )
                    }
                {<div className={"flex justify-center items-center bg-light-m dark:bg-dark-m  gap-3  h-10 mt-5"}>
                    <button
                        className={" hover:cursor-pointer flexCenter md:w-44 h-10 w-10 p-1 items-center  bg-green-400 text-white md:rounded-lg rounded-full"}
                        onClick={onOpen}
                    >
                        <MdOutlineAddLink size={20} color={"white"}/>
                        <span className={"hidden md:flex text-white"}>
                            Ajouter un Url
                        </span>
                    </button>
                   { sessionDetail?.data?.dj?.id == sessionData?.djId && <button
                        className={"md:w-44 h-10 w-10 flexCenter hover:cursor-pointer  gap-2 p-1 items-center  bg-gray-400 text-white md:rounded-lg rounded-full"}>
                        <FaUserPlus size={20} color={"white"}/>
                        <span className={"hidden md:flex text-white"}>
                           Partcipant
                        </span>
                    </button>}
                </div>}
                <div className={"md:min-w-[80%] border-gray-900 rounded-lg md:h-[36rem] h-[30rem] w-[100%] mt-5 md:mt-10"}>
                    <div className={"w-full h-full overflow-y-auto customer-scrollbar px-2"}>
                        <Accordion allowMultiple={true} className={"text-black dark:text-gray-300"}>
                            {
                                //@ts-ignore
                                sessionDetail?.data?.playlist?.musics?.map((item,index) => (
                                    <Lecteur url={item?.url} id={item?.id} setTitle={setTitle} key={index} listLove={item?.songLovers}/>
                                ))
                            }

                        </Accordion>
                    </div>
                </div>
            </div>
            <div className={"hidden md:flex md:min-w-[40%] border-l-1 border-gray-200"}>
                <SidebarRight/>
            </div>
            <New_url isOpen={isOpen} onClose={onClose} idsession={
                //@ts-ignore
                sessionDetail?.data?.id
            }/>
        </section>
    );
};


export default Page;