import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";

const handleGoogleAuth = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    console.log("Google User:", user);

    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: new Date(),
      });

      window.location.href = "/location";
    } else {
      
      const userData = userDoc.data();

      if (userData.location) {  // Check if location data exists
        window.location.href = "/home";      // Location data exists, redirect to "/home"
      } else {
        window.location.href = "/location";  // Location data doesn't exist, redirect to "/location"
      }
    }

    toast.success("Logged in with Google successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  } catch (error) {
    console.error("Google Auth Error:", error.message);
    toast.error(error.message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  }
};

export default handleGoogleAuth;
