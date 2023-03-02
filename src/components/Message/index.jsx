import React from "react";

import "./Message.css";

export default function Message(props = {}) {
    const { message } = props;
    const processedMessage = message.replace("", "");

    return (
        <div className="msg_wrap">
            <div className="msg_body_wrap">
                <div className="msg_body">
                    <p className="msg_body_text">
                        {processedMessage}
                    </p>
                </div>
            </div>
        </div>
    );
}