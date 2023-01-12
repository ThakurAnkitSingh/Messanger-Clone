import React, { useState, useEffect, useContext, createContext } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../components/firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null); // User details
    const history = useHistory(); // It will navigate us to different page

    useEffect(() => {

        // When auth state is changed then add user and loading will stop then navigate us to chats part

        auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
            if (user) {
                history.push('/chats');
            } // If there is user then we will navigate to chats partand if not then login part

        })

    }, [user, history]) // When user changes and when re-navigate then render the callback function 

    const value = { user };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )

} 