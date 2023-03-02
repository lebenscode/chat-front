import React from "react";

export default function MainLayout({ children } = {}) {
    return (
        <div id="wrap">
            {children}
        </div>
    );
}
