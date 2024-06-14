"use client"
import { URL_API } from "@/utils";
import { io, Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';

const useSocket = (namespace: string): Socket | null => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io(`${URL_API}${namespace}`, {
            withCredentials: true,
        });

        setSocket(newSocket);

        return () => {
            if (newSocket.connected) {
                newSocket.disconnect();
            }
        };
    }, [namespace]);

    return socket;
};

export default useSocket;
