import { initializeApp } from "firebase/app";
import { getAuth ,onAuthStateChanged   } from "firebase/auth";  
import { getDatabase, ref, set , onValue } from "firebase/database";

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
const auth = getAuth(app);


var userid = null;

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
        userid = uid ; 
    // ...
  } else {
    // User is signed out
    // ...
  }
});





const cliniquename = document.querySelector("#cliniquename"); 
const starCountRef = ref(database, 'cliniquename');
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  if(data != ""){
  cliniquename.innerHTML = data.nom ;}
});



cliniquename.addEventListener("click",function(){
  const starCountRef = ref(database,"user/" + userid +"/UserJob" ); 
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data == "admin"){    
  let nom = prompt("chose name :");
  if (nom != null){

    set(ref(database, 'cliniquename/' ), {
      nom : nom ,
     } 
     );
     cliniquename.innerHTML = nom ;  } 
      }
    });
});






const room = document.querySelector("#room");


room.addEventListener("click",function(){
  const starCountRef = ref(database,"user/" + userid +"/UserJob" ); 
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    if (data == "admin"){    
      let nom = prompt("Number of room :");

      if (nom != null){
          let i = parseInt(nom); 
         for(let k = 1 ; k <=  i ; k ++ ){
          set(ref(database, 'NumberofRoom/' + `/${k}` ), {
            status : true 
           } 
           );
         }
         } 
    }
  });
});


const redroom = document.querySelector("#room");


const starCountRefe = ref(database, 'NumberofRoom');
onValue(starCountRefe, (snapshot) => {
  const data = snapshot.val(); 
  let cmp = 0 ; 
  for(let i in data){
          cmp += 1 ; 
  };
  
  redroom.innerHTML = cmp ; 
});
