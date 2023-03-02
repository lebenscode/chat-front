import React, { useState } from "react";

import "./LoginPage.css";
import { login } from "./api";
import cogoToast from "cogo-toast";

export default function LoginPage(props = {}) {
    const [formData, setFormData] = useState({});

    const updateFormData = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }))
    };

    const submitForm = () => {
        login(formData).then(() => {
            window.location.href = "/";
        }).catch(err => {
            cogoToast.error(err.message, {
                position: "bottom-right",
                hideAfter: 5
            });
        });
    };

    return (
        <div className="login_form_wrap">
            <h1 className="login_title">Login form</h1>
            <div className="login_body">
                <div className="login_form_row">
                    <label htmlFor="log_in">Login:</label>
                    <input id="log_in" type="text" className="login_form_input" onKeyUp={(e) => {
                        const v = e.target.value;
                        updateFormData("login", v);
                    }} />
                </div>
                <div className="login_form_row">
                    <label htmlFor="pass_in">Password:</label>
                    <input id="pass_in" type="password" className="login_form_input" onKeyUp={(e) => {
                        const v = e.target.value;
                        updateFormData("password", v);
                    }} />
                </div>
                <div className="login_form_row">
                    <button className="btn bnt_main" onClick={submitForm}>Login</button>
                </div>
            </div>
        </div>
    );
}