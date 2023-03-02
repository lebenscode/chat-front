import React, { useRef }  from "react";
import { useDispatch, useSelector } from 'react-redux';
import "./SendForm.css";

import { selectUser, selectId, increaseId } from "containers/App/store";
import { pushMessage } from "containers/ChatRoom/store";

export default function SendForm({ draft } = {}) {
    const txtRef = useRef(null);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const msgId = useSelector(selectId);

    function sendMessage() {
        const val = txtRef.current.value;
        if (val.length === 0) {
            return;
        }

        const msg = {
            id: msgId,
            author: user.id,
            isLocal: true,
            message: val,
            time: new Date().getTime(),
            attachments: []
        };

        // todo push socket message
        // dispatch(pushMessage([msg]));

        txtRef.current.value = "";
        dispatch(increaseId());
    }

    function keyDown(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
            return;
        }

        if (e.shiftKey && e.keyCode === 16) {
            txtRef.current.value += "\n";
        }
    }

    return (
        <div className="send_form_wrap">
            <div className="send_form_txt_box">
                <a className="send_smile_btn" />
                <a className="attach_file_btn" />
                <textarea ref={txtRef} className="send_form_txt_area" placeholder="Type a message" value={draft} onKeyDown={keyDown} />
            </div>
            <a className="send_form_btn" onClick={sendMessage} />
        </div>
    );
}