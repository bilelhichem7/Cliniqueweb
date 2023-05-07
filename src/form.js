import { initializeApp } from "firebase/app";
import { getDatabase, push, ref as databaseURL, set , onValue } from "firebase/database";
import { getAuth,signOut } from "firebase/auth";  

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
const send = document.querySelector("#send") ; 

const rommnumber = document.querySelector("#room") ; 


 

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
        rommnumber.add(option);
      
      }
  };
});



























//...............................................................
send.addEventListener("click" , function(){
  const db = databaseURL(database,"FormPatient/");

const name = document.querySelector("#name").value ; 
const adress = document.querySelector("#address").value ; 
const dateofbirth = document.querySelector("#date").value ; 
const city = document.querySelector("#city").value ; 
const civilstatus = document.querySelector("#status").value ; 
const sexe = document.querySelector("#sex").value ; 
const rommnumber = document.querySelector("#room").value ; 
const chronicdiseas = document.querySelector("#deseas").value ;
const phonenumber = document.querySelector("#phone").value ; 
const patsecnumb = document.querySelector("#security-nmbr").value ;

const sex = parseInt(sexe) ; 

if(name == "" || adress == "" || dateofbirth == "" || city == "" || civilstatus == ""  || sexe == "" || rommnumber == "" || chronicdiseas == "" || phonenumber == "" || patsecnumb == ""){
    alert("SVP DON'T LET ANYTHING EMPTY")
}else {




  const sex = parseInt(sexe) ; 
    const newRecordRef = push(db);
     const newRecordKey = newRecordRef.key;
     const newData = {
      userId: newRecordKey , 
      PatientFullName : name , 
      PatientAdress : adress , 
      BirthOfPatient : dateofbirth , 
      PatientCity : city , 
      PatientCivilStatus : civilstatus , 
      PatientGender :  sex , 
      RoomNumber : rommnumber , 
      Chronicdisease : chronicdiseas , 
      PatientPhoneNumber : phonenumber , 
      PatientSecurityNumber : patsecnumb 
    }
    set(newRecordRef, newData) ;

 
   
 const dbb = databaseURL(database,"NumberofRoom/" + rommnumber);
set((dbb),{
  status : false 
});
       alert("PATIENT SEND") ; 
       setInterval(function() {
        location.reload();
      }, 100);


}










});






const cliniquename = document.querySelector("#cliniquename"); 
const starCountRef = databaseURL(database,"cliniquename");
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  if(data != ""){
  cliniquename.innerHTML = data.nom ;}
});

cliniquename.addEventListener("click",function(){
  window.location.href = "index.html" ; 
});





const  log = document.querySelector("#log") ; 

log.addEventListener("click",function(){
  console.log("hjh");
  signOut(auth).then(() => {
    window.location.href = "index.html";
    }).catch((error) => {
    // An error happened.
  });
   

});















