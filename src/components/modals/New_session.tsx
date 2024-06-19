//@ts-nocheck

"use client"

import {Button} from "@chakra-ui/react";
import React, {useState} from "react";
import {
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalContent,
    FormControl,
    FormLabel,
    ModalCloseButton,
    ModalBody,
    Input,
    ModalFooter
}
    from "@chakra-ui/react";
import {COLORS} from "@/utils";
import {useDispatch} from "react-redux";
import {setData} from "@/storage";
import {noticeFalse} from "@/helpers";
import {useRouter} from "next/navigation";
import {sessionService} from "@/settings/services/session";




interface modal{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const Join=({isOpen,onOpen,onClose}:modal)=> {
    const dispatch = useDispatch();
    const router = useRouter();
    const [sessionInfo,setSessionInfo] = useState({
        name:"",
        theme:"",
        maxParticipants:0
    });

    const handleInputChange = (name:string, value:string) => {
        setSessionInfo({
            ...sessionInfo,
            [name]: value,
        });
    };

    const setNumber=()=>{
        setSessionInfo({
            ...sessionInfo,
            ma
        })
    }
    const handlsubmit=()=>{
        console.log(sessionInfo)
    }


    const CreateSession = async () => {
        onClose()
        if (sessionInfo.name != "" && sessionInfo.theme != "") {
            const res = await dispatch(sessionService.NewSession(sessionInfo));
            if (res.meta.requestStatus == "fulfilled") {
                setData("session", res?.payload?.data);
                router.push(`/home/session/${res?.payload?.data?.id}`);
            }
        } else {
            noticeFalse("Pas de champs vide !!");
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered={true}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Nouvelle Session</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl isRequired={true}>
                        <FormLabel>Nom de la Session</FormLabel>
                        <Input placeholder='Oqpa Chaux' onChange={(e)=>handleInputChange("name",e.target.value)} />
                    </FormControl>

                    <FormControl mt={4} isRequired={true}>
                        <FormLabel>Thème de la Session</FormLabel>
                        <Input placeholder='Soirée des nana' onChange={(e)=>handleInputChange("theme",e.target.value)} />
                    </FormControl>
                    <FormControl mt={4} isRequired={true}>
                        <FormLabel>Nombre des Micros disponibles </FormLabel>
                        <Input type={"number"} placeholder='10' onChange={(e)=>handleInputChange("maxParticipants",parseInt(e.target.value))}  />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={CreateSession}>
                        Valider
                    </Button>
                    <Button onClick={onClose} bgColor={COLORS.rose01} colorScheme={"red"}>
                        Annuler
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default Join;