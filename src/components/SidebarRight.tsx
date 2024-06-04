"use client"

import React from 'react';
import {Accordion, AccordionButton, AccordionItem, AccordionPanel, Box} from "@chakra-ui/react";
import {AddIcon, MinusIcon} from "@chakra-ui/icons";

const SidebarRight =()=> {
    return (
        <section className={'flex flex-col bg-light-m dark:bg-dark-m md:min-w-full w-full min-h-full '}>
            <div className={"flex gap-10  px-2  h-10 fixed z-50 w-full bg-gray-400 "}>
                <h3 className={"bold-20 font-bold"}>Commentaires</h3>
                <h3 className={"bold-20 font-bold"}>(0)</h3>
            </div>
            <div className={"md:min-w-[80%]  md:h-[60rem] h-[30rem] w-[100%]"}>
                <div className={"w-full h-full overflow-y-auto customer-scrollbar px-2 mb-56"}>
                    <Accordion allowMultiple={true} className={"mt-10"}>
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,18,12,10,9,67,54,3].map((item) => (
                                <AccordionItem key={item}>
                                    {({isExpanded}) => (
                                        <>
                                            <h2>
                                                <AccordionButton>
                                                    <Box as='span' flex='1' textAlign='left'>
                                                        {`Titre ${item}`}
                                                    </Box>
                                                    {isExpanded ? (
                                                        <MinusIcon fontSize='12px'/>
                                                    ) : (
                                                        <AddIcon fontSize='12px'/>
                                                    )}
                                                </AccordionButton>
                                            </h2>
                                            <AccordionPanel pb={4}>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                            </AccordionPanel>
                                        </>
                                    )}
                                </AccordionItem>
                            ))
                        }

                    </Accordion>
                </div>
            </div>
        </section>
    );
};

export default SidebarRight;