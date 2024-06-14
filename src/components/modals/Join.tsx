"use client"
//@ts-nocheck
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
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { noticeFalse } from "@/helpers";
import { sessionService } from "@/settings/services/session";
import { setData } from "@/storage";

interface modal{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const Join=({isOpen,onOpen,onClose}:modal)=> {
    const dispatch = useDispatch();
    const router = useRouter();
    const [sessionInfo,setSessionInfo] = useState({
        accessCode:"",
        pseudo:"",
    });
   
    const JoinSessions = async () => {
        if (sessionInfo.pseudo!=="" && sessionInfo.accessCode!==""){
             // @ts-ignore
            const res = await dispatch(sessionService.JoinSession(sessionInfo));
            // @ts-ignor
                //@ts-ignore
                if (res.meta.requestStatus == "fulfilled") {
                      //@ts-ignore
                    // dispatch(joinSession(res?.payload?.data?.participant));
                      //@ts-ignore
                    setData("participant",res?.payload?.data?.participant);
                      //@ts-ignore
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

    return (
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered={true}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Joindrer une Session en Cours</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl isRequired={true}>
                            <FormLabel>Pseudo</FormLabel>
                            <Input placeholder='Michael' onChange={(e)=>handleInputChange("pseudo",e.target.value)}/>
                        </FormControl>

                        <FormControl mt={4} isRequired={true}>
                            <FormLabel>Code de la Session</FormLabel>
                            <Input placeholder='Sxl00123' onChange={(e)=>handleInputChange("accessCode",e.target.value)}/>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={JoinSessions}>
                            Joindrer
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