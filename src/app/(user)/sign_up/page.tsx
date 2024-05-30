/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React, {useState} from 'react'
import Image from "next/image";
import {
    Box,
    Button, HStack,
    Input,
    InputGroup,
    InputLeftElement,
    Stack, Text, VStack,
} from "@chakra-ui/react";
import {EmailIcon,Icon} from "@chakra-ui/icons";
import {IoMdLock} from "react-icons/io";
import {CLE_SITE, COLORS, validerMotDePasse} from "@/utils";
import {BiUser} from "react-icons/bi";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/settings/store";
import {authService} from "@/settings/services/user";
import {noticeFalse} from "@/helpers";
import {useRouter} from "next/navigation"
import  ReCAPTCHA from "react-google-recaptcha"



const page=()=> {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [userInfo,setUserInfo] = useState({
        pseudo:"",
        email:"",
        password:"",
        confirmPassword:""
    });

    const handleInputChange = (name:string, value:string) => {
        setUserInfo({
            ...userInfo,
            [name]: value,
        });
    };


    const dispatch = useDispatch<AppDispatch>();
    const {isLoading}=useSelector((state: RootState) => state.user);
    const router=useRouter()
    const [captchaValue, setCaptchaValue] = useState(null);

    //function to valide reptch
    const handleCaptchaChange = (value:any) => {
        setCaptchaValue(value);
    };




    //send information to connexion
    const sendInfos = async () => {
        if (userInfo.email != "" && userInfo.password != ""  && userInfo.pseudo != "" && userInfo.confirmPassword != "") {
            if (validerMotDePasse(userInfo.password)) {
               if (userInfo.password===userInfo.confirmPassword) {
                   if (captchaValue){
                       const res = await dispatch(authService.signup(userInfo));
                       if (res.meta.requestStatus == "fulfilled") {
                           router.push("/home");
                       }
                   }
                   else{
                       noticeFalse("Vueillez confirme que vous n'etes pas un robot ")
                   }
               }
               else {
                   noticeFalse("Deux mot de passe ne sont pas identiques !!");
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
            <div className='flex flex-col  w-full lg:h-full h-screen bg-white padding-container gap-5'>
                <div className='flexCenter gap-5 flex-col w-full'>
                    <Image src={'/playlist.png'} alt={"play music"} width={400} height={400}/>
                    <Image src={'/logo.png'} alt={"play music"} width={60} height={60}/>
                </div>
                <div className={'flex flex-col justify-center items-center px-4 bg-white md:gap-10 gap-2 padding-container'}>
                    <Stack spacing={6}>
                        <InputGroup>
                            <InputLeftElement pointerEvents={"none"}>
                                <Icon as={BiUser} mt={3} width={6} height={6} color={COLORS.bleu01}/>
                            </InputLeftElement>
                            <Input
                                variant={'flushed'}
                                width={350}
                                height={50}
                                placeholder={'Richard'}
                                color={COLORS.bleu02}
                                type={"texte"}
                                onChange={(e)=>handleInputChange("pseudo",e.target.value)}
                            />
                        </InputGroup>
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
                                placeholder={"Mot de passe"}
                                color={COLORS.bleu02}
                                type={"password"}
                                onChange={(e)=>handleInputChange("password",e.target.value)}
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
                                placeholder={"Confirme votre Mot de passe"}
                                color={COLORS.bleu02}
                                type={"password"}
                                onChange={(e)=>handleInputChange("confirmPassword",e.target.value)}
                            />
                        </InputGroup>
                    </Stack>
                        <ReCAPTCHA
                            sitekey={CLE_SITE}
                            onChange={handleCaptchaChange}
                        />
                    <Button colorScheme={"blue"} width={350} size={"lg"} onClick={sendInfos}>
                        {"Je m'inscris"}
                    </Button>
                    <HStack color={COLORS.bleu01} alignItems={'start'} justifyContent={'center'} className={'w-full'} >
                        <Text>{"Avez-vous déjà un compte ?"}</Text>
                        <Link href={"/"} className={'text-trose01 hover:underline'}>Se connecter</Link>
                    </HStack>
                </div>
            </div>
        </section>
    )
}


export default page;