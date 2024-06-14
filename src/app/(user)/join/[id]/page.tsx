
//@ts-nocheck
"use client"

import React, {useState} from 'react';
import {Button, FormControl, FormLabel, Input} from "@chakra-ui/react";
import {sessionService} from "@/settings/services/session";
import {noticeFalse} from "@/helpers";
import {useRouter} from "next/navigation"
import {useDispatch} from "react-redux";
import {useSocket} from "@/socket"
import { setData } from '@/storage';
import { joinSession } from '@/settings/slices/session';

const Page = ({params}:{params:{id:string}}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [sessionInfo,setSessionInfo] = useState({
        accessCode:params?.id,
        pseudo:"",
    });
    const socket = useSocket("sessions");
    // const socket=useSocket("sessions");
    const JoinSessions = async () => {
        if (sessionInfo.pseduo!=="" && sessionInfo.accessCode!==""){
            const res = await dispatch(sessionService.JoinSession(sessionInfo));
            // @ts-ignore
            if (res.meta.requestStatus == "fulfilled") {
                setData("participant",res?.payload?.data?.participant)
                router.push(`/home/session/${res?.payload?.data?.session?.id}`);
            }
        }
        else{
            noticeFalse("Pas de Champs de vide !!")
        }
    }

    const handleInputChange = (name:string, value:string) => {
        setSessionInfo({
            ...sessionInfo,
            [name]: value,
        });
    };

    console.log(sessionInfo);
    return (
       <section className='w-full h-full py-10 md:mt-10 '>
            <div className='w-full h-full flex flex-col items-center justify-center'>
                <h2 className={"bold-20"}>Joindre une Session En cours</h2>
               <div className='flex flex-col w-96 gap-5 h-44 p-4  items-center justify-between border-gray-300 border-2 shadow-md rounded-lg'>
                   <FormControl isRequired={true}>
                       <FormLabel>Pseudo</FormLabel>
                       <Input placeholder='Michael' onChange={(e)=>handleInputChange("pseudo",e.target.value)}/>
                   </FormControl>
                   <div className={"w-full "}>
                       <Button colorScheme='blue' mr={3} size={"lg"} width={"100%"} onClick={JoinSessions}>
                           Joindre la session
                       </Button>
                   </div>
               </div>
            </div>
        </section>
    );
};

export default Page;