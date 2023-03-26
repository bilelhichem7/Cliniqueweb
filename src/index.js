import { initializeApp } from "firebase/app";
import { getDatabase, push, ref, set , onValue } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGzYGU0MpsiVmQI_OmFMnADVvUELtxW1E",
  authDomain: "clinique-294fc.firebaseapp.com",
  projectId: "clinique-294fc",
  storageBucket: "clinique-294fc.appspot.com",
  databaseURL: "https://clinique-294fc-default-rtdb.europe-west1.firebasedatabase.app",
  messagingSenderId: "452189960236",
  appId: "1:452189960236:web:0bcef37210e2aeef62f989",
  measurementId: "G-8MCPP3RJLE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const cliniquename = document.querySelector("#cliniquename"); 
const starCountRef = ref(database, 'cliniquename');
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  if(data != ""){
  cliniquename.innerHTML = data.nom ;}
});



cliniquename.addEventListener("click",function(){
  let nom = prompt("chose name :");
  if (nom != ""){

    set(ref(database, 'cliniquename/' ), {
      nom : nom ,
     } 
     );
     cliniquename.innerHTML = nom ; 
  } 
  
  



})

