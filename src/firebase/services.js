import {
    collection,
    getDocs,
    limit,
    query,
    where,
    setDoc,
    doc,
} from "firebase/firestore";
import {
    auth,
    db,
    storage, // make sure this is exported from firebase.js
} from "./firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const getUserByEmail = async (email) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email), limit(1));
    const querySnapshot = await getDocs(q);
    let user = null;
    querySnapshot.forEach((doc) => {
        user = { password: doc.id, ...doc.data() };
    });
    return user;
};

export const addUser = async (obj) => {
    // Step 1: Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
        auth,
        obj.email,
        obj.password
    );
    const user = userCredential.user;

    let profilePicUrl = "";

    // Step 2: If a file is provided, upload it to Storage
    if (obj.profilePicFile) {
        const fileRef = ref(
            storage,
            `profilePics/${user.uid}/${obj.profilePicFile.name}`
        );
        await uploadBytes(fileRef, obj.profilePicFile);
        profilePicUrl = await getDownloadURL(fileRef);
    }

    // Step 3: Update the user's Auth profile
    await updateProfile(user, {
        displayName: obj.name,
        photoURL: profilePicUrl,
    });

    // Step 4: Store user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
        name: obj.name,
        email: obj.email,
        password: obj.password,
        profilePic: profilePicUrl,
    });

    return userCredential;
};

export const sendMessages = async (data) => {
    await setDoc(doc(collection(db, "messages")), {
        senderEmail: data.senderEmail,
        receiverEmail: data.receiverEmail,
        message: data.message,
        timestamp: +new Date(),
    });
};
