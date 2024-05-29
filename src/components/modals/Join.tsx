import {Button} from "@chakra-ui/react";
import React from "react";
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

interface modal{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const Join=({isOpen,onOpen,onClose}:modal)=> {
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
                            <Input placeholder='Michael' />
                        </FormControl>

                        <FormControl mt={4} isRequired={true}>
                            <FormLabel>Code de la Session</FormLabel>
                            <Input placeholder='Sxl00123' />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
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