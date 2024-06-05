"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Props {
    url: string;
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

const Lecteur = ({ url }: Props) => {
    const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
    const [artistInfo, setArtistInfo] = useState<ArtistInfo | null>(null);
    const [error, setError] = useState('');
    const apiKeyA = 'AIzaSyCscZhQmb5esZGkOPgkvWRR5FFYRnT4RO4';

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
            if (response.data.items.length === 0) {
                throw new Error('No video found for the given ID.');
            }
            return response.data.items[0];
        } catch (error) {
            console.error(error);
            setError('Error fetching video info. Please check the console for more details.');
            return null;
        }
    };

    const extractArtistInfo = (videoInfo: VideoInfo): ArtistInfo | null => {
        if (!videoInfo) return null;
        const { snippet } = videoInfo;
        return {
            title: snippet.title,
            description: snippet.description,
            channelTitle: snippet.channelTitle,
            publishedAt: snippet.publishedAt,
            tags: snippet.tags,
        };
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    useEffect(() => {
    if (typeof window !== 'undefined') { 
        let isApiSubscribed = true;
        // Vérification de l'environnement client
            handleFetchInfo();
        
        return () => {
            // cancel the subscription
            isApiSubscribed = false;
        };
    }
    }, [handleFetchInfo, url]);

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {artistInfo && (
                <div className="flex flex-col gap-2">
                    <p className="text-black dark:text-gray-300"><span className="text-trose01">Titre de la vidéo</span>: {artistInfo.title}</p>
                    <p className="text-black dark:text-gray-300"><span className="text-trose01">Description de la vidéo</span>: {artistInfo.description}</p>
                    <p className="text-black dark:text-gray-300"><span className="text-trose01">Chaîne YouTube</span>: {artistInfo.channelTitle}</p>
                    <p className="text-black dark:text-gray-300"><span className="text-trose01">Date de Publication</span>: {new Date(artistInfo.publishedAt).toLocaleDateString()}</p>
                    <p className="text-black dark:text-gray-300">Tags: {artistInfo?.tags?.join(', ')}</p>
                </div>
            )}
        </div>
    );
};

export default Lecteur;
