import {
    addDoc,
    collection,
} from "firebase/firestore";
import {
    createUserWithEmailAndPassword,
    updateProfile
} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "./firebase";

export const addUser = async (obj) => {
    try {
        // 1. Create user
        const userCredential = await createUserWithEmailAndPassword(auth, obj.email, obj.password);

        let profilePicUrl = "";

        // 2. Upload image if available
        if (obj.profile) {
            const fileRef = ref(storage, `profiles/${userCredential.user.uid}`);
            await uploadBytes(fileRef, obj.profile);
            profilePicUrl = await getDownloadURL(fileRef);
        }

        // 3. Update Firebase Auth profile
        await updateProfile(userCredential.user, {
            displayName: obj.name,
            photoURL: profilePicUrl,
        });

        // ✅ Force refresh to update user info in the client
        await auth.currentUser.reload();

        // 4. Save user data in Firestore
        await addDoc(collection(db, "users"), {
            name: obj.name,
            email: obj.email,
            profileUrl: profilePicUrl,
        });

        return userCredential;
    } catch (error) {
        console.error("Error adding user:", error);
        throw new Error("User creation failed. Please try again.");
    }
};
