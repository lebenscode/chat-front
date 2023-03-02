import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { selectUser } from "containers/App/store";
import { selectRoom } from "./store";
import { unwrapResult } from "@reduxjs/toolkit";

import "./ChatRoom.css";

import RoomHeader from "components/RoomHeader";
import RoomBody from "components/RoomBody";
import SendForm from "components/SendForm";
import { fetchRoomData } from "./store";

export default function ChatRoom() {
    const room = useSelector(selectRoom);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user.activeRoom > 0) {
            dispatch(fetchRoomData({
                id: user.activeRoom
            }));
        }
    }, []);

    return (
        room && room.id > 0
            ? <div id={`room_wrap_${room.id}`}>
                <RoomHeader id={room.id} title={room.title} avatar={user.avatar} userStats={room.userStats} />
                <div className="room_block room_cont_wrap">
                    <RoomBody messages={room.messages} users={room.users} />
                    <SendForm />
                </div>
            </div>
            : <div className="room_block empty_room_wrap">
                <div className="empty_room_body_wrap">
                    <div className="empty_room_body">
                        Выберите чат и начните общение
                    </div>
                </div>
            </div>
    );
}