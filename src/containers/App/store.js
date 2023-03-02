import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserData } from "./api";

const baseState = {
    user: {
        id: 0,
        name: "Guest",
        avatar: "",
        group: "guest"
    },
    msgId: 100
};

export const fetchUserData = createAsyncThunk(
    'main/fetchUserData',
    async (data, thunkApi) => {
        try {
            // return await getUserData();
            const data = await getUserData();
            return {
                ...data,
                activeRoom: 1
            }
        } catch (err) {
            return thunkApi.rejectWithValue(err)
        }
    }
);

export const mainSlice = createSlice({
    name: 'main',
    initialState: baseState,
    reducers: {
        increaseId: (state) => {
            state.msgId = state.msgId + 1;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.user = baseState.user;
            });
    }
});

export const { increaseId } = mainSlice.actions;
export const selectUser = (state) => state.main.user;
export const selectId = (state) => state.main.msgId;
export default mainSlice.reducer;