"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useSelector,useDispatch } from "react-redux";
import { RootState } from "@/settings/store";
import { darkColors } from "@/utils";
import { MdSend } from "react-icons/md";
import { sessionService } from '@/settings/services/session';
import { noticeFalse } from '@/helpers';
const SidebarRight = () => {
    const dispatch=useDispatch()
    const { sessionData, sessionDetail,participant } = useSelector((state: RootState) => state.session);
    const bgColor = darkColors[Math.floor(Math.random() * darkColors.length)];
    //@ts-ignore
    const OtherId=sessionDetail?.data?.participants?.find(its=>its?.userId===sessionDetail?.data?.djId)?.id;
    const [chatInfo,setInfoChat]=useState({
        //@ts-ignore
        sessionId:sessionDetail?.id||"",
        //@ts-ignore
        participantId:participant?.id,
        content:""
    })


    const handleInputChange = (name:string, value:string) => {
        setInfoChat({
            ...chatInfo,
            [name]: value,
        });
    };


    const Commenter = async () => {
        if (chatInfo?.content!==""){
            //@ts-ignore
             const res=await dispatch(sessionService.CommentSession({...chatInfo,participantId:participant?.id ? participant?.id :OtherId,sessionId:sessionDetail?.data?.id}));
             //@ts-ignore
             if (res.meta.requestStatus == "fulfilled") {
               setInfoChat({
                //@ts-ignore
                sessionId:sessionDetail?.id||"",
                //@ts-ignore
                participantId:participant?.id,
                content:""
            })

        }
        else{
            noticeFalse("Ecrivez ton message !!")
        }
    }}
 

    const commentsEndRef = useRef(null);

    const scrollToBottom = () => {
        //@ts-ignore
        commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [sessionDetail]);


    const showName=(id:string)=>{
        let nom="P"
        //@ts-ignore
        nom=sessionDetail?.data?.participants?.find(its=>its?.id===id)?.pseudo;
        return nom 
    }
    return (
        <section className={'fixed flex flex-col bg-light-m dark:bg-dark-m md:min-w-full w-full min-h-full px-8'}>
            <div className={"flex gap-10 px-2 h-10 w-full"}>
                <h3 className={"bold-20 font-bold text-black/50 dark:text-gray-300"}>Commentaires</h3>
                <h3 className={"bold-20 font-bold text-black/50 dark:text-gray-300"}>

                    {       //@ts-ignore
                         sessionDetail?.data?.chatMessages?.length
                    }
                </h3>
            </div>
            <div className={"md:min-w-[40%] flex flex-col w-[100%]"}>
                <div className={"w-full h-[56rem] mb-56 customer-scrollbar overflow-y-auto relative"}>
                    {
                        //@ts-ignore
                    sessionDetail?.data?.chatMessages?.map((item, index) => (
                        <div key={index} className='flex gap-3 items-center h-fit p-2 m-2'>
                            <div className={`w-8 h-8 rounded-full flexCenter p-4`} style={{ backgroundColor: bgColor }}>
                                <h4 className={"text-uppercase leading-tight text-white"}>
                                    {item?.participant?.pseudo?.charAt(0).toUpperCase()||item?.participant?.user?.pseudo?.charAt(0).toUpperCase()}
                                </h4>
                            </div>
                            <div className='flex flex-col '>
                                <h3 className='capitalize text-black/50 text-lg dark:text-white'>#{item?.participant?.pseudo||item?.participant?.user?.pseudo}</h3>
                                <p className='text-black/50 dark:text-white w-96'>
                                    {item?.content}
                                </p>
                            </div>
                        </div>
                    ))}
                    <div ref={commentsEndRef}></div>
                    <div className='fixed z-30 bottom-0 w-96 gap-5 h-14 flex justify-center items-center  dark:bg-ggray-200 rounded-lg bg-white p-2'>
                        <input
                            type="text"
                            className="flex dark:bg-gray-200   text-black/50 w-[70%] p-2 border dark:text-black/50 h-full border-gray-300 rounded-lg"
                            placeholder="Ajouter un commentaire..."
                            onChange={(event)=>handleInputChange("content",event.target.value)}
                            value={chatInfo.content}
                        />
                        <button className="p-2 bg-red-400 text-white rounded-lg flex items-center justify-center"
                            onClick={Commenter}
                        >
                             <MdSend size={28} color='#fff'/>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SidebarRight;