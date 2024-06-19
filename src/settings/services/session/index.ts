//@ts-nocheck
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import {URL_API} from "@/utils";
import {errorHandel, noticeFalse} from "@/helpers";
import {getData, setData} from "@/storage";
import {log} from "node:util";



const NewSession = createAsyncThunk(
    "session/service",
        async(datas: any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const TOKEN=thunkAPI.getState().userInfo.token||getData("token");
            if (!TOKEN) {
                noticeFalse("Verifier si vous etes connecte !!")
            }
            else{
                const reponse = await toast.promise(
                    axios.post(`${URL_API}sessions`,datas,{
                        headers: {
                            Authorization:`Bearer ${TOKEN}`,
                        }
                    }),
                    {
                        pending: "En cours de Traitement ...",
                        success: "Session crée avec succèss !!!",
                        error: {
                            render({ data }) {
                                return errorHandel(data);
                            },
                        },
                    }
                );
                const data = await reponse.data;
                data && setData("session", data);
                return data;
            }
        } catch (error: any) {
            return rejectWithValue(errorHandel(error));
        }
    }
);

const SessionInfo = createAsyncThunk(
    "sessionInfo/service",
    async(id: string, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const TOKEN=thunkAPI.getState().userInfo.token||getData("token");


                const reponse = await toast.promise(
                    axios.get(`${URL_API}sessions/${id}`,{
                        headers: {
                            Authorization:`Bearer ${TOKEN}`,
                        }
                    }),
                    {
                        pending: "En cours de Traitement ...",
                        // success: "Session crée avec succèss !!!",
                        error: {
                            render({ data }) {
                                return errorHandel(data);
                            },
                        },
                    }
                );
                const data = await reponse.data;
                data && setData("sessionDetail", data);
                return data;
        } catch (error: any) {
            return rejectWithValue(errorHandel(error));
        }
    }
);

const JoinSession = createAsyncThunk(
    "session/service",
    async(datas: any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const TOKEN=thunkAPI.getState().userInfo.token||getData("token");

                const reponse = await toast.promise(
                    axios.post(`${URL_API}sessions/join`,datas,{
                        headers: {
                            Authorization:`Bearer ${TOKEN}`,
                        }
                    }),
                    {
                        pending: "Deamnde En cours de Traitement ...",
                        success: "Accès Autorisé !!!",
                        error: {
                            render({ data }) {
                                return errorHandel(data);
                            },
                        },
                    }
                );
                const data = await reponse.data;
                data && setData("join", data);
                return data;

        } catch (error: any) {
            return rejectWithValue(errorHandel(error));
        }
    }
);

const CommentSession = createAsyncThunk(
    "session/chat",
    async(datas: any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
                const reponse = await toast.promise(
                    axios.post(`${URL_API}sessions/${datas?.sessionId}/chat`,datas),
                    {
                        error: {
                            render({ data }) {
                                return errorHandel(data);
                            },
                        },
                    }
                );
                const data = await reponse.data;
                return data;

        } catch (error: any) {
            return rejectWithValue(errorHandel(error));
        }
    }
);


const Ilovesong = createAsyncThunk(
    "session/love",
    async(datas: any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const reponse = await toast.promise(
                axios.post(`${URL_API}music-lovers`,datas),
                {
                    pending: "Deamnde En cours de Traitement ...",
                    error: {
                        render({ data }) {
                            return errorHandel(data);
                        },
                    },
                }
            );
            const data = await reponse.data;
            return data;

        } catch (error: any) {
            return rejectWithValue(errorHandel(error));
        }
    }
);

const RemoveMe = createAsyncThunk(
    "session/love",
    async(datas: any, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const reponse = await toast.promise(
                axios.delete(`${URL_API}music-lovers/${datas?.idurl}`,{data:{sessionId:datas?.sessionId}}),
                {
                    pending: "Deamnde En cours de Traitement ...",
                    error: {
                        render({ data }) {
                            return errorHandel(data);
                        },
                    },
                }
            );
            const data = await reponse.data;
            return data;

        } catch (error: any) {
            return rejectWithValue(errorHandel(error));
        }
    }
);

export const sessionService = {
    NewSession,
    SessionInfo,
    JoinSession,
    CommentSession,
    Ilovesong,
    RemoveMe
};
