"use client"
//@ts-nocheck
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {FaMicrophoneLines} from "react-icons/fa6";
import {
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel, Box,
    Stack
} from "@chakra-ui/react";
import {sessionService} from "@/settings/services/session";
import {noticeFalse} from "@/helpers";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/settings/store";
import {useToast} from "@chakra-ui/react";
import { CiMicrophoneOff } from 'react-icons/ci';
import { FcLike } from "react-icons/fc";

interface Props {
    url: string;
    setTitle: (title: string) => void;
    id?:string;
    listLove:[]
}

interface VideoInfo {
    snippet: {
        title: string;
        description: string;
        channelTitle: string;
        publishedAt: string;
        tags: string[];
    };
    // Ajoutez d'autres propriétés nécessaires de l'API YouTube ici
}

interface ArtistInfo {
    title: string;
    description: string;
    channelTitle: string;
    publishedAt: string;
    tags: string[];
}

const Lecteur = ({ url,setTitle,id,listLove}: Props) => {
    const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
    const [artistInfo, setArtistInfo] = useState<ArtistInfo | null>(null);
    const [error, setError] = useState('');
    const {sesssionData,sessionDetail,participant}=useSelector((state: RootState) =>state.session);
    const dispatch=useDispatch()
    const apiKeyA = 'AIzaSyDf2Y7p8Ym4jg9qhYgi7R5zKR-USAY7LOc';
    const toast=useToast()
    //@ts-ignore
    const OtherId=sessionDetail?.data?.participants?.find(its=>its?.userId===sessionDetail?.data?.djId)?.id;
    const extractVideoId = (url: string): string | null => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };
    const getVideoInfo = async (videoId: string): Promise<VideoInfo | null> => {
        try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
                params: {
                    part: 'snippet,contentDetails,statistics',
                    id: videoId,
                    key: apiKeyA,
                },
            });
            if (response?.data?.items.length === 0) {
                throw new Error('No video found for the given ID.');
            }
            return response.data.items[0];
        } catch (error) {
            console.error(error);
            setError('Error fetching video info. Please check the console for more details.');
            return null;
        }
    };

    const  IloverSong=async()=>{
        if (sessionDetail){
            //@ts-ignore
            const res=await dispatch(sessionService.Ilovesong({musicId:id,participantId:participant?.id ? participant?.id :OtherId,sessionId:sessionDetail?.data?.id}));
            //@ts-ignore
            if (res.meta.requestStatus == "fulfilled") {
                toast({
                    title: "Demande envoyée avec succès !",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
            }
            }
            else{
                noticeFalse("Ecrivez ton message !!")
            }
    }
    const unLover=async(idurl:string)=>{
        if (sessionDetail){
            //@ts-ignore
            const res=await dispatch(sessionService.RemoveMe({sessionId:sessionDetail?.data?.playlist?.sessionId||sesssionData?.id, idurl}));
            //@ts-ignore
            if (res.meta.requestStatus == "fulfilled") {
                toast({
                    title: "Retrait effectué avec succès !",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                });
            }
        }
    }

    const extractArtistInfo = (videoInfo: VideoInfo): ArtistInfo | null => {
        if (!videoInfo) return null;
        const { snippet } = videoInfo;
        // @ts-ignore
        setTitle(snippet?.title)
        return {
            title: snippet.title,
            description: snippet.description,
            channelTitle: snippet.channelTitle,
            publishedAt: snippet.publishedAt,
            tags: snippet.tags,
        };
    };

    const getName=(id:string)=>{
        // @ts-ignore
        const pseudo=sessionDetail?.data?.participants?.find(its=>its?.id===id)?.pseudo;
        return pseudo ? pseudo:"";
    }

    useEffect(() => {
        const handleFetchInfo = async () => {
            setError('');
            const videoId = extractVideoId(url);
            if (videoId) {
                const videoInfo = await getVideoInfo(videoId);
                if (videoInfo) {
                    setVideoInfo(videoInfo);
                    const artistInfo = extractArtistInfo(videoInfo);
                    setArtistInfo(artistInfo);
                }
            } else {
                setError("Cet URL n'est pas valide pour YouTube.");
            }
        };
        handleFetchInfo();
    }, [extractArtistInfo, url]);

    // @ts-ignore
    // @ts-ignore
    return (
          <>
              <AccordionItem gap={2}>
                  <h2>
                      <AccordionButton>
                          <Box as='span' flex='1' textAlign='left'>
                              <div className="flex justify-between gap-2 ">
                                  <p className="text-black dark:text-gray-300"><span
                                      className="text-trose01">Titre </span>: {
                                      //@ts-ignore
                                      artistInfo?.title ? artistInfo?.title : "Pas de titre pour ce morceau"
                                  }</p>
                                  {
                                      //@ts-ignore
                                      !listLove?.length>0 && sesssionData?.djId!=participant?.id ? <button
                                      onClick={IloverSong}
                                      className={"flex items-center justify-center gap-2 w-8 h-8 p-2 text-white rounded-lg bg-green-600  border-bgrose01"}>
                                      <FaMicrophoneLines color={"#fff"} size={20}/>
                                  </button>:
                                      <span className={"flex text-trose01 items-center justify-center w-14 h-14"}>
                                          <FcLike />
                                          <h6 className="dark:text-gray-300 text-black/50">
                                              {listLove?.length}
                                          </h6>
                                      </span>}
                              </div>

                          </Box>
                          <AccordionIcon/>
                      </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                      <Stack>
                          {
                                  listLove?.map((item: any, index: number) => (
                                      <div className="flex justify-between items-center w-full p-2 gap-2" key={index}>

                                          <span>{
                                              //@ts-ignore
                                              getName(item?.participantId)
                                          }</span>
                                          {
                                              //@ts-ignore

                                             <div>
                                                  {
                                                      //@ts-ignore
                                                      item?.participantId === participant?.id ?
                                                          //@ts-ignore
                                                          sesssionData?.djId !== participant?.id && <button
                                                              //@ts-ignore
                                                              onClick={()=>unLover(item?.id)}
                                                              className={"flex items-center justify-center gap-2 w-8 h-8 p-2 text-white rounded-lg bg-red-800  border-bgrose01"}>
                                                              <CiMicrophoneOff color={"#fff"} size={20}/>
                                                          </button> :
                                                          //@ts-ignore
                                                          sesssionData?.djId !== participant?.id && <button
                                                              onClick={IloverSong}
                                                              className={"flex items-center justify-center gap-2 w-8 h-8 p-2 text-white rounded-lg bg-green-600  border-bgrose01"}>
                                                              <FaMicrophoneLines color={"#fff"} size={20}/>
                                                      </button>}
                                              </div>      //@ts-ignore


                                          }
                                      </div>))

                          }
                      </Stack>
                  </AccordionPanel>
              </AccordionItem>
          </>
    )
};

export default Lecteur;
