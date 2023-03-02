import { configureStore } from '@reduxjs/toolkit';
import mainReducer from "containers/App/store";
import chatRoomReducer from "containers/ChatRoom/store";

const store = configureStore({
    reducer: {
        main: mainReducer,
        chatRoom: chatRoomReducer
    }
});

export default store;