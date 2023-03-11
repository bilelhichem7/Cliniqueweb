import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,onAuthStateChanged,signInWithEmailAndPassword } from "firebase/auth";  

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGzYGU0MpsiVmQI_OmFMnADVvUELtxW1E",
  authDomain: "clinique-294fc.firebaseapp.com",
  projectId: "clinique-294fc",
  storageBucket: "clinique-294fc.appspot.com",
  messagingSenderId: "452189960236",
  appId: "1:452189960236:web:0bcef37210e2aeef62f989",
  measurementId: "G-8MCPP3RJLE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);



const login = document.querySelector("#login") ; 

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    window.location = "form.html";
    // ...
  } else {
    // User is signed out
    // ...
  }
});




login.addEventListener("click",function(){
    const email = document.querySelector("#email").value ; 
    const pass = document.querySelector("#password").value; 
    signInWithEmailAndPassword(auth, email, pass)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    window.location = "form.html" ; 
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });})


