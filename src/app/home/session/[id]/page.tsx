//@ts-


"use client"

import React, {useEffect} from 'react';
import {Accordion, AccordionButton, AccordionItem, AccordionPanel, Box} from "@chakra-ui/react";
import {AddIcon, MinusIcon} from "@chakra-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/settings/store";
import {sessionService} from "@/settings/services/session";
import {setData} from "@/storage";

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
        <section className='fixed flex flex-row md:ml-56 md:padding-container md:min-w-[65%]  gap-10 bg-light-m dark:bg-dark-m min-w-[100%] md:min-h-full'>
            <div className={"fixed flex flex-col md:min-w-[55%]  md:gap-10 gap-4 bg-light-m dark:bg-dark-m w-[100%] md:min-h-full mt-5 md:mt-0 "}>
                <div className={"md:min-w-[60%] bg-red-400 border-gray-900 rounded-lg md:h-44 w-[95%] h-32 md:mt-0 mt-10"}>
                    Play Music
                </div>
                <div className={"md:max-w-[80%] border-gray-900 rounded-lg md:h-[36rem] h-[30rem] w-[100%]"}>
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
        </section>
    );
};


export default Page;