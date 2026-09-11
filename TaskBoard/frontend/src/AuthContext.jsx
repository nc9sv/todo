import React from 'react';
import {createContext, useState} from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [userId, setUserId] = useState(null);

    return (
        <AuthContext.Provider value={{userId, setUserId}}>
            {children}
        </AuthContext.Provider>
    )
}