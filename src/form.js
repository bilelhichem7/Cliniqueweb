import { initializeApp } from "firebase/app";
import { getDatabase, push, ref as databaseURL, set , onValue } from "firebase/database";


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

const database = getDatabase(app);
const send = document.querySelector("#send") ; 

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
    set(newRecordRef, newData) 

 
       alert("PATIENT SEND") ; 


}










});


