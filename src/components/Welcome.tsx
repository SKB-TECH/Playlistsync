"use client";

import React, {useState} from 'react';
import { LuUserPlus2 } from "react-icons/lu";
import {FaPlus} from "react-icons/fa";
import moment from "moment";
import {Join, New_session} from "@/components/index";
import {useDisclosure} from "@chakra-ui/react";
const Welcome =()=> {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [action,setAction]=useState(false)


    const showModal=()=>{
        setAction(!action)
    }
    return (
        <section className="dark:bg-dark-m bg-light-m px-5 gap-24 flex justify-between min-w-[80%] md:h-96  h-full ">
            <div className={"flex flex-col md:justify-center items-center gap-10 "}>
                <button className={"flex items-center p-2 gap-2 h-14 w-56 bg-bleu02 text-white text-lg rounded-lg"} onClick={onOpen}>
                    <LuUserPlus2 size={32} color={"white"}/>
                    Joindre une Session
                </button>
                <button className={"flex items-center p-2 gap-2 h-14 w-56 bg-rose01 text-white text-lg rounded-lg"} onClick={showModal}>
                    <FaPlus size={32} color={"white"} />
                    Créer une Session
                </button>
            </div>
            <div className={"hidden dark:shadow-lg dark:border-2 dark:border-gray-400  bg-light-m dark:bg-dark-m md:flex flex-col gap-3 w-[92%] h-full rounded-lg"}>
                <div className={"flex flex-col justify-center items-center  bg-welcome h-1/2 w-full rounded-lg"}>
                    <h1 className={"font-digital font-bold text-5xl leading-tight text-white"}>
                        {
                            `${moment().format('HH:mm:ss')}`
                        }
                    </h1>
                    <h3 className={"text-white text-lg leading-tight font-semibold"}>

                        {`${ moment().format('dddd, MMMM Do YYYY')}`}
                    </h3>
                </div>
                <div className={"flex flex-col justify-center items-center  bg-[#fff] dark:bg-dark-m h-1/2 w-full rounded-lg"}>
                        <h1 className={"text-trose01 text-xl text-center w-2/3 font-lazer"}>
                            Bienvenu passer de moments agréable accompanger de tes amis du net
                        </h1>
                </div>
            </div>
            <Join isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
            <New_session isOpen={action} onOpen={showModal} onClose={showModal}/>
        </section>

    );
};


export default Welcome;

function setAction(ac: any) {
    throw new Error('Function not implemented.');
}
