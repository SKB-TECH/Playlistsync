//@ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { getData } from "@/storage";
import { authService } from "@/settings/services/user/index";

const { signin, signup } = authService;

const initialState = {
    message: "",
    statusUtils: {
        isLoading: false,
        isSuccess: false,
        isError: false,
    },
    token: getData("token") || "",
    user: getData("user") || "",
} as never;

const user = createSlice({
    name: "api1",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) =>
        //all agent of systeme
        builder
            .addCase(signin.pending, (state) => {
                state.statusUtils.isLoading = true;
                state.statusUtils.isError = false;
                state.statusUtils.isSuccess = false;
                state.message = "Veillez Patienter...";
            })
            .addCase(signin.fulfilled, (state, action) => {
                state.statusUtils.isLoading = false;
                state.statusUtils.isError = action.payload.error;
                state.statusUtils.isSuccess = true;
                state.token = action.payload?.accessToken;
                state.user = action.payload?.user;
            })
            .addCase(signin.rejected, (state) => {
                state.statusUtils.isLoading = false;
                state.statusUtils.isError = true;
                state.statusUtils.isSuccess = false;
                state.message = "Une erreur est survenue !!";
            })
            .addCase(signup.pending, (state) => {
                state.statusUtils.isLoading = true;
                state.statusUtils.isError = false;
                state.statusUtils.isSuccess = false;
                state.message = "Veillez Patienter...";
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.statusUtils.isLoading = false;
                state.statusUtils.isError = action.payload.error;
                state.statusUtils.isSuccess = true;
                state.token = action.payload?.accessToken;
                state.user = action.payload?.user;
            })
            .addCase(signup.rejected, (state) => {
                state.statusUtils.isLoading = false;
                state.statusUtils.isError = true;
                state.statusUtils.isSuccess = false;
                state.message = "Une erreur est survenue !!";
            }),
});

export default user.reducer;