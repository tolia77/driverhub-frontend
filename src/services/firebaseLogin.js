import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export async function firebaseLogin(email, password) {

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const idToken = await user.getIdToken();
    return {
      accessToken: idToken,
      refreshToken: user.refreshToken,
    };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Firebase login error:", errorCode, errorMessage);
    throw new Error("Failed to login. Please check your credentials.");
  }
}

