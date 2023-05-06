import { initializeApp } from "firebase/app";
import { getAuth,onAuthStateChanged,signInWithEmailAndPassword } from "firebase/auth";  
import { getDatabase, onValue ,ref} from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGzYGU0MpsiVmQI_OmFMnADVvUELtxW1E",
  authDomain: "clinique-294fc.firebaseapp.com",
  projectId: "clinique-294fc",
  databaseURL: "https://clinique-294fc-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "clinique-294fc.appspot.com",
  messagingSenderId: "452189960236",
  appId: "1:452189960236:web:0bcef37210e2aeef62f989",
  measurementId: "G-8MCPP3RJLE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const login = document.querySelector("#login") ; 

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    const starCountRef = ref(database,"user/" + user.uid +"/UserJob" ); 
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data == "admin"){
        window.location = "Worker.html" ; 
      }else {
        alert("Errore");
      }
    });
       // ...
  } else {
    // User is signed out
    // ...
  }
});




login.addEventListener("click",function(){
    const email = document.querySelector("#email").value ; 
    const pass = document.querySelector("#password").value; 
     
   if(email == ""  || pass == "") {
    alert("errore");
   } else {
    var dialog = document.createElement("div");
    dialog.innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div><div>Veuillez patienter...</div>';
    dialog.style.background = "rgba(0,0,0,0.5)";
    dialog.style.color = "#fff";
    dialog.style.position = "fixed";
    dialog.style.top = "0";
    dialog.style.left = "0";
    dialog.style.width = "100%";
    dialog.style.height = "100%";
    dialog.style.display = "flex";
    dialog.style.justifyContent = "center";
    dialog.style.alignItems = "center";
    document.body.appendChild(dialog);

    signInWithEmailAndPassword(auth, email, pass)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    const starCountRef = ref(database,"user/" + user.uid +"/UserJob" ); 
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        if (data == "admin"){
       document.body.removeChild(dialog);
        window.location = "Worker.html" ; 
        }else {
          document.body.removeChild(dialog);
          alert("Errore");
        }
      });



   
    // ...
  })
  .catch((error) => {
    document.body.removeChild(dialog);
    const errorCode = error.code;
    const errorMessage = error.message;
  });


   }
     




})


