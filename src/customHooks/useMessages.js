// useMessages.js
import { useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { setMessages } from "../redux/messages/actions";
import { auth, db } from "../firebase/firebase";

const useMessages = (isLoggedIn) => {
    useEffect(() => {
        if (!isLoggedIn) return;

        const currentUserEmail = auth.currentUser?.email;
        if (!currentUserEmail) return;

        const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const messages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            console.log('messages', messages)
            setMessages(messages);
        });

        return () => unsubscribe();
    }, [isLoggedIn]);
};

export default useMessages;
