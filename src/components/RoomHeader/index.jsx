import React from "react";

import "./RoomHeader.css";

export default function RoomHeader(props = {}) {
    const {
        id,
        title,
        avatar,
        userStats = {
            count: 0,
            users: []
        }
    } = props;

    return (
        <div className="room_header" id={`room_header_${id}`}>
            <div className="room_header_cont">
                <div className="room_header_avatar_wrap">
                    <img className="room_header_avatar" src={avatar} alt={title} />
                </div>
                <div className="room_header_title_wrap">
                    <span className="room_header_title">
                        {title}
                    </span>
                </div>
                <div className="room_header_stats">
                    Users:
                    <span className="room_header_users_count">
                        {userStats.count}
                    </span>
                </div>
            </div>
        </div>
    );
}