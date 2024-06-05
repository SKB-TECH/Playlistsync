"use client"

import React from 'react';
import {Accordion, AccordionButton, AccordionItem, AccordionPanel, Box} from "@chakra-ui/react";
import {AddIcon, MinusIcon} from "@chakra-ui/icons";

const SidebarRight =()=> {
    return (
        <section className={'flex flex-col bg-light-m dark:bg-dark-m md:min-w-full w-full min-h-full '}>
            <div className={"flex gap-10  px-2  h-10  w-full"}>
                <h3 className={"bold-20 font-bold text-black/50 dark:text-gray-300"}>Commentaires</h3>
                <h3 className={"bold-20 font-bold"}>(0)</h3>
            </div>
            <div className={"md:min-w-[40%]  md:h-full w-[100%]"}>
                <div className={"w-full h-full mb-56"}>

                </div>
            </div>
        </section>
    );
};

export default SidebarRight;