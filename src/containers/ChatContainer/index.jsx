import React from "react";

import "./ChatContainer.css";
import ChatRoom from "containers/ChatRoom";

export default function ChatContainer() {
    return (
        <div className="layout_wrap">
            <aside className="layout_aside">
                <div className="layout_header">
                    {/*search form*/}
                </div>
                {/*chat rooms list*/}
            </aside>
            <main className="layout_content">
                <ChatRoom />
            </main>
        </div>
    );
}
