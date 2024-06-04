//@ts-


"use client"

import React, {useEffect} from 'react';
import {Accordion, AccordionButton, AccordionItem, AccordionPanel, Box} from "@chakra-ui/react";
import {AddIcon, MinusIcon} from "@chakra-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/settings/store";
import {sessionService} from "@/settings/services/session";
import {setData} from "@/storage";
import {SidebarRight} from "@/components";

const Page =({params}:{params:{id:string}})=> {
    const dispatch = useDispatch<AppDispatch>();
    const {sessionData,sessionDetail}=useSelector((state:RootState) => state.session);
    useEffect(() => {
        const sessionData = async () => {
            const res = await dispatch(sessionService.SessionInfo(params?.id))
            if (res.meta.requestStatus === "fulfilled") {
                setData("sessionDetail", res?.payload?.data)
            }
        }
        sessionData();

    }, [dispatch,params?.id]);

    return (
        <section  className='fixed flex flex-row justify-between md:ml-32  md:padding-container md:min-w-[100%] gap-5 bg-light-m dark:bg-dark-m w-[100%] md:min-h-full -'>
            <div className={"md:min-w-[60%] flex flex-col  md:gap-10 gap-4 bg-light-m dark:bg-dark-m md:min-h-full md:mt-0 min-w-full mt-10 "}>
                <div
                    className={"md:min-w-[100%] bg-red-400 border-gray-900 rounded-lg md:h-56 w-[95%] h-32 md:mt-0 mt-10"}>
                    Play Music
                </div>
                <div className={"md:min-w-[80%] border-gray-900 rounded-lg md:h-[36rem] h-[30rem] w-[100%]"}>
                    <div className={"w-full h-full overflow-y-auto customer-scrollbar px-2"}>
                        <Accordion allowMultiple={true}>
                            {
                                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((item) => (
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
            </div>
            <div className={"hidden md:flex md:min-w-[40%] bg-blue-600 border-l-1 border-gray-200"}>
                <SidebarRight/>
            </div>
        </section>
    );
};


export default Page;