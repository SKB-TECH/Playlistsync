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
import {COLORS, URL_API} from "@/utils";
import {useDispatch} from "react-redux";
import {setData} from "@/storage";
import {errorHandel, noticeFalse} from "@/helpers";
import {useRouter} from "next/navigation";
import {sessionService} from "@/settings/services/session";
import axios from "axios";
import {toast} from "react-toastify";




interface modal{
    isOpen: boolean;
    onOpen?: () => void;
    onClose: () => void;
    idsession?:string
}

const New_url=({isOpen,onOpen,onClose,idsession}:modal)=> {
    const dispatch = useDispatch();
    const router = useRouter();
    const [urlInfo,setUrlInfo] = useState({
        artiste:"",
        title:"",
        url:""
    });

    const handleInputChange = (name:string, value:string) => {
        setUrlInfo({
            ...urlInfo,
            [name]: value,
        });
    };

    const CreateSession = async () => {
        onClose()
        if (urlInfo.url != "") {
            await toast.promise(
                axios.post(`${URL_API}sessions/${idsession}/music`,urlInfo),
                {
                    pending: "Ajout en cours ...",
                    success: "Url Ajouté avec succès !!!",
                    error: {
                        render({ data }) {
                            return errorHandel(data);
                        },
                    },
                }
            );
        } else {
            noticeFalse("Url ne doit pas etre Vide !!");
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
                <ModalHeader>Nouveau Url</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl mt={4}>
                        <FormLabel>Artiste </FormLabel>
                        <Input  type={"texte"} placeholder='Fally Ipupa' onChange={(e)=>handleInputChange("artiste",e.target.value)}  />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Titre de la video ou Chanson </FormLabel>
                        <Input  type={"texte"} placeholder='Amore ' onChange={(e)=>handleInputChange("title",e.target.value)}  />
                    </FormControl>
                    <FormControl mt={4} isRequired={true}>
                        <FormLabel>Url </FormLabel>
                        <Input  type={"texte"} placeholder='https://youtub/......' onChange={(e)=>handleInputChange("url",e.target.value)}  />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={CreateSession}>
                        Ajouter
                    </Button>
                    <Button onClick={onClose} bgColor={COLORS.rose01} colorScheme={"red"}>
                        Annuler
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default New_url;