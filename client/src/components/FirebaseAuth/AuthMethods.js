import { onAuthStateChanged } from "firebase/auth";
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

export { trackUserChanges };
