// eslint-disable-next-line react-hooks/rules-of-hooks

"use client"
import React, {useState} from 'react'
import Image from "next/image";
import {
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    Stack,
    HStack,
    useDisclosure,
    Text
} from "@chakra-ui/react";
import {EmailIcon,Icon} from "@chakra-ui/icons";
import {IoMdLock} from "react-icons/io";
import { TiSocialFacebook } from "react-icons/ti";
import { FaGooglePlusG,FaTwitter } from "react-icons/fa";
import {CLE_SITE, COLORS, validerMotDePasse} from "@/utils";
import {Join} from "@/components";
import Link from "next/link";
import {AppDispatch, RootState} from "@/settings/store";
import {useDispatch, useSelector} from "react-redux";
import {authService} from "@/settings/services/user";
import {noticeFalse} from "@/helpers";
import {useRouter} from "next/navigation";



export default function page() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useDispatch<AppDispatch>();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {isLoading}=useSelector((state: RootState) => state.user);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isOpen, onOpen, onClose } = useDisclosure()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [userInfo,setUserInfo] = useState({
        email:"",
        password:""
    });


    // const [captchaValue, setCaptchaValue] = useState(null);

    // const handleCaptchaChange = (value) => {
    //     setCaptchaValue(value);
    // };
    const handleInputChange = (name:string, value:string) => {
        setUserInfo({
            ...userInfo,
            [name]: value,
        });
    };




    //send information to connexion
    const sendInfos = async () => {
        if (userInfo.email != "" && userInfo.password != "") {
            if (validerMotDePasse(userInfo.password)) {
                const res = await dispatch(authService.signin(userInfo));
                console.log("res",res)
                if (res.meta.requestStatus == "fulfilled") {
                    router.push("/home");
                }
            } else {
                noticeFalse("Mot de passe Invalide !!");
            }
        } else {
            noticeFalse("Pas de champs vide !!");
        }
    };

  return (
    <section className='py-10 md:mt-10 w-full h-full'>
        <div className='flex flex-col  w-full h-full bg-white padding-container gap-5'>
            <div className='flexCenter gap-5 flex-col w-full'>
                <Image src={'/playlist.png'} alt={"play music"} width={400} height={400}/>
                <Image src={'/logo.png'} alt={"play music"} width={60} height={60}/>
            </div>
            <div className={'flex flex-col justify-center items-center px-4 py-4 bg-white md:gap-10 gap-5 padding-container'}>
                <Stack spacing={10}>
                    <InputGroup>
                        <InputLeftElement pointerEvents={"none"}>
                            <EmailIcon mt={3} width={5} height={5} color={COLORS.bleu01}/>
                        </InputLeftElement>
                        <Input
                            variant={'flushed'}
                            width={350}
                            height={50}
                            placeholder={'richard.faillancier@gmail.com'}
                            color={COLORS.bleu02}
                            type={"email"}
                            onChange={(e)=>handleInputChange("email",e.target.value)}
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement pointerEvents={"none"}>
                            <Icon as={IoMdLock} mt={2} width={7} height={7} color={COLORS.bleu01}/>
                        </InputLeftElement>
                        <Input
                            variant={'flushed'}
                            width={350}
                            height={50}
                            placeholder={'***********'}
                            color={COLORS.bleu02}
                            type={"password"}
                            onChange={(e)=>handleInputChange("password",e.target.value)}
                        />
                    </InputGroup>
                </Stack>
                {
                    !isLoading ?
                        <Button colorScheme={"blue"} width={350} size={"lg"}   onClick={sendInfos}>
                            Connexion
                        </Button>:
                        <Button isLoading colorScheme={"blue"} width={350} size={"lg"} >
                            Connexion
                        </Button>
                }
            </div>
            <div className={'flex flex-col justify-center items-center px-4 py-4 bg-white  padding-container'}>
                <HStack spacing={6}>
                    <Button borderRadius={"full"} colorScheme={"blue"} variant={"outline"} width={35} size={"lg"}>
                        <Icon as={TiSocialFacebook} width={5} height={5} color={COLORS.bleu01}/>
                    </Button>
                    <Button borderRadius={"full"} colorScheme={"blue"} variant={"outline"} width={35} size={"lg"}>
                        <Icon as={FaTwitter} width={5} height={5} color={COLORS.bleu01}/>
                    </Button>
                    <Button borderRadius={"full"} colorScheme={"blue"} variant={"outline"} width={35} size={"lg"}>
                        <Icon as={FaGooglePlusG} width={5} height={5} color={COLORS.bleu01}/>
                    </Button>
                </HStack>
                <HStack color={COLORS.bleu01} alignItems={'start'} justifyContent={'center'} className={'w-full'} mt={10}>
                    <Text>{"Je n'ai pas de compte "}</Text>
                    <Link href={"/sign_up"} className={'text-trose01 hover:underline'}>Créer un Compte</Link>
                </HStack>
            </div>
            <div className={"flexCenter w-full "}>
                <hr className={"bg-black/50 md:w-[25%] w-[95%]"}></hr>
            </div>
            <div className={'flex flex-col justify-center items-center px-4 py-4 bg-white gap-5 padding-container -mt-14'}>
                <Button variant={"joine"} colorScheme={"blue"} width={350} size={"lg"} onClick={onOpen}>
                    Rejoindre Un groupe
                </Button>
            </div>
            <Join isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
        </div>
    </section>
  )
}
