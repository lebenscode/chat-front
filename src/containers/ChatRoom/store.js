import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getRoomData} from "./api";

const getTestData = () => {
    const ava = "https://baw-piter.ru/wp-content/uploads/2022/04/7dqdgte3eve.jpg";

    return {
        id: 1,
        title: "Stiven",
        userStats: {
            count: 2,
            avatars: []
        },
        users: {
            1: {
                name: "Stiven",
                group: "admin",
                id: 1,
                avatar: ava,
            },
            2: {
                name: "Pedro",
                group: "user",
                id: 2,
                avatar: ava,
            }
        },
        messages: [
            {
                id: 1,
                author: 1,
                isLocal: true,
                message: "Hi, pedro",
                time: new Date().getTime(),
                attachments: [],
            },
            {
                id: 2,
                author: 2,
                isLocal: false,
                message: "Hi, stiven",
                time: new Date().getTime(),
                attachments: [],
            }
        ]
    }
}

export const fetchRoomData = createAsyncThunk(
    'chatRoom/fetchRoomData',
    async (data, thunkApi) => {
        try {
            // return await getRoomData(data);
            return getTestData();
        } catch (err) {
            return thunkApi.rejectWithValue(err)
        }
    }
);

const baseState = {
    room: {
        id: 0,
        messages: []
    }
};

export const chatRoomSlice = createSlice({
    name: 'chatRoom',
    initialState: baseState,
    reducers: {
        pushMessage: (state, action) => {
            state.room.messages = [...state.room.messages, ...action.payload];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRoomData.fulfilled, (state, action) => {
            state.room = action.payload;
        }).addCase(fetchRoomData.rejected, (state, action) => {
            state.room = baseState.room;
            console.error("Error fetching room data:", action.payload);
        });
    }
});

export const selectRoom = (state) => state.chatRoom.room;
export const { pushMessage }  = chatRoomSlice.actions;
export default chatRoomSlice.reducer;