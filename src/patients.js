import { initializeApp } from "firebase/app";
import { getStorage, ref as storageRef , getDownloadURL, uploadBytes } from "firebase/storage";
import { getDatabase, push, ref as databaseURL, set , onValue } from "firebase/database";
import { getAuth,createUserWithEmailAndPassword ,signOut} from "firebase/auth";  


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
const storage = getStorage(app);
const database = getDatabase(app);
const auth = getAuth(app);













let form = document.getElementById('form');
let patslist = document.getElementById('patslist');
let addpatbtn = document.getElementById('addpat');
let patbtn = document.getElementById('pat');




addpatbtn.addEventListener("click", function() {
    addpatbtn.style.background = '#FFFFFF';
    patbtn.style.background = 'none';
    form.style.display = 'block';
    patslist.style.display = 'none';
    });
    //------------------------------------------------------
    patbtn.addEventListener("click", function() {
    patbtn.style.background = '#FFFFFF';
    addpatbtn.style.background = 'none'
    patslist.style.display = 'block';
    form.style.display = 'none';

    const starCountRef = databaseURL(database,"Patients/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();   
      var table = '' ; 
      for (let i  in data){
        table += `
        <div class="pat1">
        <!--image part-->
        <img src="/images//pat1.png" alt="" srcset="" class="profpic">
        <!--informations part-->
        <div class="infos">
            <span class="nametxt">${data[i].fullName}</span>
            <div class="infoflex">
                <img src="/images/id-card (1) 1.png" alt="">
                <div class="txt"><p>${data[i].roomNum}</p><br>
                   <p> 09948394</p></div>
                <img src="/images/check (1) 1.png" alt="">
            </div>

        </div>
    </div>
        `;
      }
    
      document.getElementById('patientlist').innerHTML = table ;
    });
    

    });





const signout = document.getElementById('signout');

signout.addEventListener("click",function(){

    signOut(auth).then(() => {
        window.location.href = "index.html";
        }).catch((error) => {
        // An error happened.
      });

})

