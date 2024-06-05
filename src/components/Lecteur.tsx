//@ts-nocheck
"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Props {
    url: string;
}

const Lecteur = ({ url }: Props) => {
    const [videoInfo, setVideoInfo] = useState(null);
    const [artistInfo, setArtistInfo] = useState(null);
    const [error, setError] = useState('');
    const apiKeyA = 'AIzaSyCscZhQmb5esZGkOPgkvWRR5FFYRnT4RO4';

    const extractVideoId = () => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const getVideoInfo = async (videoId:string) => {
        try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
                params: {
                    part: 'snippet,contentDetails,statistics',
                    id: videoId,
                    key: apiKeyA,
                },
            });
            console.log('API Response:', response.data);
            if (response.data.items.length === 0) {
                throw new Error('No video found for the given ID.');
            }
            return response.data.items[0];
        } catch (error) {
            console.error('Error fetching video info:', error.response ? error.response.data : error.message);
            setError('Error fetching video info. Please check the console for more details.');
            return null;
        }
    };

    const extractArtistInfo = (videoInfo:string) => {
        if (!videoInfo) return null;

        //@ts-ignore
        const { snippet } = videoInfo;
        return {
            title: snippet.title,
            description: snippet.description,
            channelTitle: snippet.channelTitle,
            publishedAt: snippet.publishedAt,
            tags: snippet.tags,
        };
    };

    const handleFetchInfo = async () => {
        setError('');
        const videoId = extractVideoId();
        if (videoId) {
            const videoInfo = await getVideoInfo(videoId);
            if (videoInfo) {
                setVideoInfo(videoInfo);
                const artistInfo = extractArtistInfo(videoInfo);
                //@ts-ignore
                setArtistInfo(artistInfo);
            }
        } else {
            setError("Cet Url n'est pas de youtub");
        }
    };

    useEffect(() => {
        handleFetchInfo();
    }, [url]);

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {artistInfo && (
                <div className={"flex flex-col gap-2"}>
                    <p className={"text-black dark:text-gray-300"}><span className={"text-trose01"}>Titre de la video</span>: {artistInfo.title}</p>
                    <p className={"text-black dark:text-gray-300"}><span className={"text-trose01"}>Description de la video</span>: {artistInfo.description}
                    </p>
                    <p className={"text-black dark:text-gray-300"}><span className={"text-trose01"}>Chaine Youtube</span>: {artistInfo.channelTitle}
                    </p>
                    <p className={"text-black dark:text-gray-300"}><span className={"text-trose01"}>Date de Publication</span>: {new Date(artistInfo.publishedAt).toLocaleDateString()}
                    </p>
                    <p className={"text-black dark:text-gray-300"}>Tags: {artistInfo?.tags?.join(', ')}</p>
                </div>
            )}
        </div>
    );
};

export default Lecteur;