//@ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { getData } from "@/storage";
import {sessionService} from "@/settings/services/session";

const {NewSession,SessionInfo}=sessionService
const initialState = {
    message: "",
    statusSession: {
        isLoading: false,
        isSuccess: false,
        isError: false,
    },
    sessionData:  getData("session")||[],
    sessionDetail:  getData("sessionDetail")||[],
} as never;

const session = createSlice({
    name: "api1",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) =>
        //all agent of systeme
        builder
            .addCase(NewSession.pending, (state) => {
                state.statusSession.isLoading = true;
                state.statusSession.isError = false;
                state.statusSession.isSuccess = false;
                state.message = "Veillez Patienter...";
            })
            .addCase(NewSession.fulfilled, (state, action) => {
                state.statusSession.isLoading = false;
                state.statusSession.isError = action.payload.error;
                state.statusSession.isSuccess = true;
                console.log(action?.payload)
                state.sessionData = action.payload;
            })
            .addCase(NewSession.rejected, (state) => {
                state.statusSession.isLoading = false;
                state.statusSession.isError = true;
                state.statusSession.isSuccess = false;
                state.message = "Une erreur est survenue !!";
            })
            .addCase(SessionInfo.pending, (state) => {
                state.statusSession.isLoading = true;
                state.statusSession.isError = false;
                state.statusSession.isSuccess = false;
                state.message = "Veillez Patienter...";
            })
            .addCase(SessionInfo.fulfilled, (state, action) => {
                state.statusSession.isLoading = false;
                state.statusSession.isError = action.payload.error;
                state.statusSession.isSuccess = true;
                state.sessionDetail = action.payload;
            })
            .addCase(SessionInfo.rejected, (state) => {
                state.statusSession.isLoading = false;
                state.statusSession.isError = true;
                state.statusSession.isSuccess = false;
                state.message = "Une erreur est survenue !!";
            })

});

export default session.reducer;