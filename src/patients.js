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
const wilayasAlger = [
  "Adrar",
  "Chlef",
  "Laghouat",
  "Oum El Bouaghi",
  "Batna",
  "Béjaïa",
  "Biskra",
  "Béchar",
  "Blida",
  "Bouira",
  "Tamanrasset",
  "Tébessa",
  "Tlemcen",
  "Tiaret",
  "Tizi Ouzou",
  "Alger",
  "Djelfa",
  "Jijel",
  "Sétif",
  "Saïda",
  "Skikda",
  "Sidi Bel Abbès",
  "Annaba",
  "Guelma",
  "Constantine",
  "Médéa",
  "Mostaganem",
  "M'Sila",
  "Mascara",
  "Ouargla",
  "Oran",
  "El Bayadh",
  "Illizi",
  "Bordj Bou Arreridj",
  "Boumerdès",
  "El Tarf",
  "Tindouf",
  "Tissemsilt",
  "El Oued",
  "Khenchela",
  "Souk Ahras",
  "Tipaza",
  "Mila",
  "Aïn Defla",
  "Naâma",
  "Aïn Témouchent",
  "Ghardaïa",
  "Relizane"
];




// Utilisation du tableau



let form = document.getElementById('form');
let patslist = document.getElementById('patslist');
let addpatbtn = document.getElementById('addpat');
let patbtn = document.getElementById('pat');
















addpatbtn.addEventListener("click", function() {
    addpatbtn.style.background = '#FFFFFF';
    patbtn.style.background = 'none';
    form.style.display = 'block';
    patslist.style.display = 'none';
   
    

    const roomNume = document.querySelector("#roomNum");

    const starCountReff = databaseURL(database,"NumberofRoom");
    onValue(starCountReff, (snapshot) => {
      const data = snapshot.val(); 
      let cmp = 0 ; 
      for(let i in data){
        cmp+=1 ; 
          if(data[i].status == true){
            const option = document.createElement('option');
            option.value = `${cmp}`;
            option.text = `${cmp}`;
            roomNume.add(option);
          
          }
      };
    });


    const cityyy = document.querySelector("#city");

    for (let i = 0; i < wilayasAlger.length; i++) {
      const option = document.createElement('option');
      option.value = `${wilayasAlger[i]}`;
      option.text = `${wilayasAlger[i]}`;
      cityyy.add(option);
      
    }
    




   const save = document.querySelector("#save");









   save.addEventListener("click",function(){
   const photo = document.querySelector("#photo");
   const Name = document.querySelector("#Name").value;
   const adr = document.querySelector("#adr").value;
   const secNumb = document.querySelector("#secNumb").value;
   const phonenum = document.querySelector("#phonenum").value;
   const date = document.querySelector("#date").value;
   const patStat = document.querySelector("#patStat").value;
   const city = document.querySelector("#city").value;
   const sex = document.querySelector("#sex").value;
   const status = document.querySelector("#status").value;
   const roomNum = document.querySelector("#roomNum").value;

   if(photo.value == "" || Name == "" || adr == "" || secNumb == "" || phonenum == "" || date == "" || patStat == "" || city == "" || sex == ""
    || status == "" || roomNum == ""
   ) {
    var dialog = document.createElement('div');
    dialog.className = 'alert-dialog';
    var heading = document.createElement('h2');
    heading.textContent = 'Alerte !';
    var message = document.createElement('p');
    message.textContent = `Don't leave anything empty`;
    var closeButton = document.createElement('button');
    closeButton.textContent = 'Fermer';
    closeButton.onclick = function() {
        document.body.removeChild(dialog);
    };
    dialog.appendChild(heading);
    dialog.appendChild(message);
    dialog.appendChild(closeButton);
    document.body.appendChild(dialog);
   } else {
    const db = databaseURL(database,"FormPatient/");
    const gender = parseInt(sex) ; 
    const now = new Date();
     const isoString = now.toISOString();
     const imageRef = storageRef(storage, 'imagePat/'+photo.value+isoString  );

     uploadBytes(imageRef, photo.files[0])
     .then((snapshot) => {
      console.log("Image uploaded successfully!");
      // Récupérer l'URL de téléchargement de l'image
      getDownloadURL(imageRef)
        .then((url) => {
          console.log("Image URL: " + url);
          // Insérer l'URL de téléchargement de l'image dans la balise <img>
          const img = document.createElement("img");
          img.src = url;     

          const newRecordRef = push(db);
          const newRecordKey = newRecordRef.key;

          const newData = {
            userId: newRecordKey , 
            photo :  url, 
            PatientFullName : Name , 
            PatientAdress : adr , 
            BirthOfPatient : date , 
            PatientCity : city , 
            PatientCivilStatus : status , 
            PatientGender :  gender , 
            RoomNumber : roomNum , 
            Chronicdisease : patStat , 
            PatientPhoneNumber : phonenum , 
            PatientSecurityNumber : secNumb 
          }
          set(newRecordRef, newData) ;
      
            
 const dbb = databaseURL(database,"NumberofRoom/" + roomNum);
 set((dbb),{
   status : false 
 });
        alert("PATIENT SEND") ; 
        setInterval(function() {
         location.reload();
       }, 100);
              
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
       
        })
        .catch((error) => {
          console.error("Error getting download URL: ", error);
        }).catch((error) => {
      console.error("Error uploading image: ", error);
     });
     














     ////////////////////////////////////
   }

  



  }) ;



  })

 
 
 
 
 
 
 //------------------------------------------------------ ON VALUE  PATIENT ------------------------------
    patbtn.addEventListener("click", function() {
    patbtn.style.background = '#FFFFFF';
    addpatbtn.style.background = 'none'
    patslist.style.display = 'block';
    form.style.display = 'none';

    const starCountRef = databaseURL(database,"FormPatient/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();   
      var table = '' ; 
      for (let i  in data){
        table += `
        <div class="pat1">
        <!--image part-->
        <img src="${data[i].photo}" alt="" srcset="" class="profpic">
        <!--informations part-->
        <div class="infos">
            <span class="nametxt">${data[i].PatientFullName}</span>
            <div class="infoflex">
                <img src="/images/id-card (1) 1.png" alt="">
                <div class="txt"><p>${data[i].RoomNumber}</p><br>
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

