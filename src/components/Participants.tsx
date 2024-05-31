// @ts-ignore
"use client"
import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "@/settings/store";
import { BsThreeDotsVertical } from "react-icons/bs";
import {COLORS} from "@/utils";
import {useTheme} from "next-themes";
import {Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList} from "@chakra-ui/react";
import { FaUserMinus } from "react-icons/fa";
import {MdOutlineMarkUnreadChatAlt} from "react-icons/md"
import {darkColors} from "@/utils";




interface ParticipantsProps {
    pseudo?:string
}
const Participants =({pseudo}:ParticipantsProps)=> {
    const {user}=useSelector((state:RootState) => state.userInfo);
    const {sessionData}=useSelector((state:RootState) => state.session);
    const {setTheme,resolvedTheme}=useTheme();

    const bgColor = darkColors[Math.floor(Math.random() * darkColors.length)];
    return (
        <div className={"w-full h-16 flex  flex-row justify-between items-center gap-5  border-b-[1px] dark:border-gray-400 border-gray-300"}>
            <div className={"flex items-center gap-2"}>
                <div className={`w-10 h-10 rounded-full flexCenter p-4 bg-[${bgColor}] relative`} style={{backgroundColor:bgColor}}>
                    <h4 className={"text-uppercase leading-tight text-white"}>
                        {pseudo?.charAt(0).toUpperCase()}
                    </h4>
                    <span className={"absolute w-2 h-2 rounded-full bg-green-500 top-8 left-8 "}/>
                </div>
                <div className={"flex flex-col items-center mt-1 ml-2"}>
                    <h3 className={"text-lg dark:text-gray-300 text-black"}>{
                        pseudo
                    } </h3>
                </div>
            </div>
            {
                //@ts-ignore
                // user?.id === sessionData?.djId &&
                <div>
                    <Menu>
                        <MenuButton>
                            <BsThreeDotsVertical color={`${resolvedTheme == "dark" ? COLORS["light-m"] : COLORS.bleu01}`} size={20} className={"hover:cursor-pointer"}/>
                        </MenuButton>
                        <MenuList>
                            <MenuGroup title='Actions'>
                                <MenuItem icon={<FaUserMinus size={20} className={"-ml-1"} color={COLORS.rose01} />}>Retirer de la session</MenuItem>
                                <MenuItem icon={<MdOutlineMarkUnreadChatAlt size={20} className={"-ml-1"} color={COLORS.rose01}/>}>Envoye un message </MenuItem>
                            </MenuGroup>
                        </MenuList>
                    </Menu>

                </div>
            }
        </div>
    );
};



export default Participants;