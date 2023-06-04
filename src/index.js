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
        var overlay = document.createElement('div');
      overlay.className = 'prompt-overlay';
  
      var dialog = document.createElement('div');
      dialog.className = 'prompt-dialog';
  
      var input = document.createElement('input');
      input.type = 'text';
  
      var button = document.createElement('button');
      button.textContent = 'Valider';
      button.onclick = function() {
        var nom = input.value;
        if (nom) {
          if (nom != null){

            set(ref(database, 'cliniquename/' ), {
              nom : nom ,
             } 
             );
             cliniquename.innerHTML = nom ;  } 
            console.log('Nom saisi :', nom);
        }
        document.body.removeChild(overlay);
    };

    dialog.appendChild(input);
    dialog.appendChild(button);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);




   
   
    }
    });
});






const room = document.querySelector("#room");


room.addEventListener("click",function(){
  const starCountRef = ref(database,"user/" + userid +"/UserJob" ); 
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    if (data == "admin"){    
      var overlay = document.createElement('div');
      overlay.className = 'prompt-overlay';
  
      var dialog = document.createElement('div');
      dialog.className = 'prompt-dialog';
  
      var input = document.createElement('input');
      input.type = 'text';
  
      var button = document.createElement('button');
      button.textContent = 'Valider';
      button.onclick = function() {
        var nom = input.value;
        if (nom) {
          if (nom != null){
            let i = parseInt(nom); 
           for(let k = 1 ; k <=  i ; k ++ ){

            
            set(ref(database, 'NumberofRoom/' + `/${k}` ), {
              status : true 
             } 
             );




           }
           } 
            console.log('Nom saisi :', nom);
        }
        document.body.removeChild(overlay);
    };

    dialog.appendChild(input);
    dialog.appendChild(button);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    
    }
  });
});


const redroom = document.querySelector("#redroom");


const starCountRefe = ref(database, 'NumberofRoom');
onValue(starCountRefe, (snapshot) => {
  const data = snapshot.val(); 
  let cmp = 0 ; 
  for(let i in data){
          cmp += 1 ; 
  };
  
  redroom.innerHTML = cmp ; 
});

