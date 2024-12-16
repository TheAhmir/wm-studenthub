import { onAuthStateChanged, sendEmailVerification, createUserWithEmailAndPassword, signInWithEmailAndPassword, validatePassword } from "firebase/auth";
import { auth } from "./firebase";

const trackUserChanges = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is logged in");
      callback(user); // Pass the user object to the callback
    } else {
      console.log("User is not logged in");
      callback(null); // Pass null if no user is logged in
    }
  });
};

const isAcceptableEmail = (email, callback) => {
    callback(email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
}

const verifyEmail = (user, callback) => {
    sendEmailVerification(user)
        .then(() => {
            // Email verification sent!
            callback(true)
        })
        .catch(() => {
            callback(false)
        });
}

const isAcceptablePassword = async (password, callback) => {
    const status = await validatePassword(auth, password);
    callback(status.isValid)

}

const createAccount = (email, password, callback) => {
    createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                callback(user)
            })
            .catch((error) => {
                //const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                callback(null)
            });
} 
const signIn = async (email, password, callback) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        callback(user)
        // ...
      })
      .catch((error) => {
        //const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        callback(null)
      });
}


export { trackUserChanges, verifyEmail, isAcceptablePassword, createAccount, signIn, isAcceptableEmail };
