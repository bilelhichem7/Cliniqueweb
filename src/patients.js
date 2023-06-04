import { initializeApp } from "firebase/app";
import { getStorage, ref as storageRef , getDownloadURL, uploadBytes } from "firebase/storage";
import { getDatabase, push, ref as databaseURL, set , onValue } from "firebase/database";
import { getAuth,createUserWithEmailAndPassword ,signOut} from "firebase/auth";  
import { Integer } from "read-excel-file";


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
   var  incorrectPrefix = phonenum.substring(0,2);

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
   } if(!incorrectPrefix == "05" || !incorrectPrefix == "07" || !incorrectPrefix == "06"){
                alert("The telephone number starts with the incorrect digit '" +" "+ incorrectPrefix + " ");  
   } else {
    const db = databaseURL(database,"FormPatient/");
    const gender = parseInt(sex) ; 
    const now = new Date();
     const isoString = now.toISOString();

     const imageRef = storageRef(storage, 'imagePat/'+photo.value+isoString  )
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
            alert(errorMessage);
            // ..
          });
       
        })
        .catch((error) => {
          console.error("Error getting download URL: ", error);
          alert(error);
        }).catch((error) => {
      console.error("Error uploading image: ", error);
      alert(error);
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
    const starCountRef = databaseURL(database,"Patients/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();   
      var table = '' ; 
      for (let i  in data){
        table += `
        <div class="pat1"  >
        <!--image part-->
        <img src="${data[i].patPicUrl}" alt="" srcset="" class="profpic">
        <!--informations part-->
        <div class="infos">
            <span class="nametxt">${data[i].fullName}</span>
            <div class="infoflex">
                <img    class="FetchInfo${i}"  src="/images/id-card (1) 1.png" alt=""   >
                <div class="txt"><p>${data[i].roomNum}</p><br>
                   <p> ${data[i].patientPhoneNumber}</p></div>
            </div>

        </div>
    </div>
        `;
      
      }
   
    
      document.getElementById('patientlist').innerHTML = table ;
    });
   
  
  
  
  
  //une autre activity
  const st = databaseURL(database,"Patients/");
  onValue(st, (snapshot) => {
    const data = snapshot.val(); 
   
    for(let i in data){
      const fetchInfoImg = document.getElementsByClassName(`FetchInfo${i}`);
      fetchInfoImg[0].addEventListener("click",function(){
        addpatbtn.style.background = '#FFFFFF';
    patbtn.style.background = 'none';
    form.style.display = 'block';
    patslist.style.display = 'none';
    // hena ndiro apres ma hmed yrigel l class dyalo
    const photo = document.querySelector("#photo");
    const Name = document.querySelector("#Name").value = data[i].fullName;
    const adr = document.querySelector("#adr").value   ;
    const secNumb = document.querySelector("#secNumb").value =  data[i].patientSecurityNumber;
    const phonenum = document.querySelector("#phonenum").value = data[i].patientPhoneNumber    ;
    const date = document.querySelector("#date").value = data[i].dtOfBirth;
    const patStat = document.querySelector("#patStat").value = data[i].chrDis;
    const sex = document.querySelector("#sex").value = data[i].state;
    const status = document.querySelector("#status").value = data[i].patientCivilStatus ;
    const option = document.createElement('option');
    option.value = data[i].roomNum;
    option.text = data[i].roomNum;
    const roomNum = document.querySelector("#roomNum"); 
    roomNum.add(option);
    const option1 = document.createElement('option');
    option1.value = data[i].patientCity;
    option1.text = data[i].patientCity;
    const city = document.querySelector("#city") ; 
    city.add(option1);
      }) ; 
    }
  })});





const signout = document.getElementById('signout');

signout.addEventListener("click",function(){

    signOut(auth).then(() => {
        window.location.href = "index.html";
        }).catch((error) => {
        // An error happened.
      });

})








const cliniquename = document.querySelector("#cliniquename"); 
const starCoun = databaseURL(database,'cliniquename');
onValue(starCoun, (snapshot) => {
  const data = snapshot.val();
  if(data != ""){
  cliniquename.innerHTML = data.nom ;}
});


cliniquename.addEventListener("click",function(){
  window.location = "index.html";
})














// la recherche sur patient ////////////////////////////////////////////////
let codedata = [] ; 
function Read_Med( codedata ) {
  const starCount = databaseURL(database,"Patients/");
  onValue(starCount, (snapshot) => {
    const data = snapshot.val();  
    for (let i  in data){
      codedata.push( {dd : data[i].fullName}); 
    }
  }) ; 

}


const searchbtn = document.getElementById('searchBtn'); 

const searchinp = document.getElementById('search'); 


searchbtn.addEventListener("click",function(){
  codedata = [] ; 
  const star = databaseURL(database,"Patients/");
Read_Med(codedata);
const searchTerm = searchinp.value;  

if(searchTerm != "") {
  var table = '' ; 
  const results = codedata.filter((item) => item.dd.toString().toLowerCase().includes(searchTerm.toLowerCase()));
  const codes = results.map((item) => item.dd);

  for(let k in codes){
    onValue(star, (snapshot) => {
      const data = snapshot.val();  
      for (let i  in data){
       if(data[i].fullName == codes[k] && !table.includes(data[i].fullName)) {
        table += `
        <div class="pat1">
        <!--image part-->
        <img src="${data[i].patPicUrl}" alt="" srcset="" class="profpic">
        <!--informations part-->
        <div class="infos">
            <span class="nametxt">${data[i].fullName}</span>
            <div class="infoflex">
                <img src="/images/id-card (1) 1.png" alt=""  if="FetchInfo" >
                <div class="txt"><p>${data[i].roomNum}</p><br>
                   <p> ${data[i].patientPhoneNumber}</p></div>
            </div>

        </div>
    </div>
        `;
       }
      }
    }) ; 
  }

  document.getElementById('patientlist').innerHTML = table ;
//
}});



// fin de la recherche /////////////////////////////////////////////////////////

// fetch info ///////////////////////





    