import React from "react";
import * as Cookies from "js-cookie";

export const getSessionCookie = () => {
    const sessionCookie = Cookies.get("token");

    if(sessionCookie === undefined) {
        return undefined;
    } else {
        return sessionCookie
    }
}

export const setSessionCookie = (cookie) => {
    Cookies.remove('token')
    Cookies.set('token', cookie)
}

// export const deleteSessionCookie = () => {
//     Cookies.remove("session");
//     history.push("/login");
// }

export const SessionContext = React.createContext(getSessionCookie());
