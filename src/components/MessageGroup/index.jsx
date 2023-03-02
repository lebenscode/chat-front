import React from "react";
import "./MessageGroup.css";

import Message from "components/Message";

import { formatDate, classes } from "helpers/utils";

export default function MessageGroup({ group } = {}) {
    let [msg] = group;
    if (!msg) {
        msg = {
            drawAvatar: false,
            isLocal: true
        };
    }

    const {
        drawAvatar,
        isLocal,
        time,
        user: {
            avatar
        }
    } = msg;

    return (
        <div className="message_group">
            <div className="message_group_ava_wrap">
                {drawAvatar && <>
                    <img src={avatar} className="message_group_avatar" />
                    <div className="message_group_date">
                        {formatDate(time)}
                    </div>
                </>}
            </div>
            <div className={classes("message_group_body", {"local": isLocal, "external": !isLocal})}>
                {group.map(msg => <Message key={msg.id} {...msg} />)}
            </div>
        </div>
    );
}