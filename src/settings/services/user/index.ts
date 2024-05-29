//@ts-nocheck
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import {URL_API} from "@/utils";
import {errorHandel} from "@/helpers";
import {setData} from "@/storage";



const signin = createAsyncThunk(
    "signin/service",
    async (datas: any, rejectWithValue) => {
        try {
            const reponse = await toast.promise(
                axios.post(`${URL_API}auth/login`, datas),
                {
                    pending: "En cours de Traitement ...",
                    success: "Connexion Reussie !!!",
                    error: {
                        render({ data }) {
                            return errorHandel(data);
                        },
                    },
                }
            );

            const data = await reponse.data;
            data && setData("token", data?.accessToken);
            data && setData("user", data?.user);


            return data;
        } catch (error: any) {
            return rejectWithValue(errorHandel(error));
        }
    }
);

const signup = createAsyncThunk(
    "signup/service",
    async (datas: any, rejectWithValue) => {
        try {
            const reponse = await toast.promise(
                axios.post(`${URL_API}auth/register`, datas),
                {
                    pending: "En cours de Traitement ...",
                    success: "Inscription Reussie !!!",
                    error: {
                        render({ data }) {
                            return errorHandel(data);
                        },
                    },
                }
            );

            const data = await reponse.data;
            data && setData("user", data?.user);
            data && setData("token", data?.accessToken);
            return data;
        } catch (error: any) {
            return rejectWithValue(errorHandel(error));
        }
    }
);

export const authService = {
    signin,
    signup,
};
