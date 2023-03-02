import React from "react";
import "./RoomBody.css";

import MessageGroup from "components/MessageGroup";
import { generateMessageGroups } from "./api";

export default function RoomBody(props = {}) {
    const { users, messages } = props;
    if (messages.length === 0) {
        return (
            <div className="room_body_wrap">
                <div className="room_body_empty">
                    No messages
                </div>
            </div>
        );
    }

    const messageGroups = generateMessageGroups(users, messages);
    return (
        <div className="room_body_wrap">
            <div className="room_body_content">
                {messageGroups.map((group, ind) => <MessageGroup key={`group-${ind}`} group={group} />)}
            </div>
        </div>
    );
}