// src/customHooks/useAuth.js
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

const useAuth = () => {
    const [authState, setAuthState] = useState({
        user: null,
        isLoggedIn: false,
        loading: true,
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setAuthState({
                user,
                isLoggedIn: !!user,
                loading: false,
            });
        });

        return () => unsubscribe(); // Clean up listener on unmount
    }, []);

    return authState;
};

export default useAuth;
