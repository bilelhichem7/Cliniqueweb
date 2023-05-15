import { initializeApp } from "firebase/app";
import { getStorage, ref as storageRef , getDownloadURL, uploadBytes } from "firebase/storage";
import { getDatabase, push, ref as databaseURL, set , onValue } from "firebase/database";
import { getAuth,createUserWithEmailAndPassword ,signOut} from "firebase/auth";  
const tabdoc = [];
const tabnur = [];
const tabphar = [];
const tabrece = [];





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





const cliniquename = document.querySelector("#cliniquename"); 
const starCountRef = databaseURL(database,"cliniquename/");
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  if(data != ""){
  cliniquename.innerHTML = data.nom ;}
});

cliniquename.addEventListener("click",function(){
  window.location.href = "index.html" ; 
})


const signout = document.querySelector("#signout"); 

signout.addEventListener("click",function(){
  signOut(auth).then(() => {
    window.location.href = "index.html";
    }).catch((error) => {
    // An error happened.
  });
});







let doclist = document.getElementById('doclist');//list of doctors
let docbtn = document.getElementById('Doctors');//doctors buttons
let nurslist = document.getElementById('nurslist');//nurses list
let nurbtn = document.getElementById('nurses');//nurses button
let pharmlist =document.getElementById('pharmlist');
let pharmbtn = document.getElementById('pharmacies');
let receplist =document.getElementById('receplist');
let recepbtn = document.getElementById('Receptionist');
let AddForm = document.getElementById('AddForm');
let addbtn = document.getElementById('workers');
const searchbtn = document.getElementById('searchBtn'); 
const searchinp = document.getElementById('search'); 


//show doctors list
function showdoc(){
  docbtn.style.background='#FFFFFF';
  doclist.style.display='flex';
  const starCountRef = databaseURL(database,"user/");
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();   
    var table = '' ; 
    for (let i  in data){
      if(data[i].UserJob == "doctor"){
        tabdoc.push({nameuser:data[i].UserName});
        table += `
        <div class="doc1" id="doc1">
        <img src=${data[i].UserImage} alt="">
        <div class="infos">
            <h4>${data[i].UserName}</span><p>${data[i].UserEmail}</p> <p>${data[i].UserPhoneNumber}</p>
               <p> ${data[i].spec}</p>
        </div>
    </div>
    `
      }
   
   
    }
  
    document.getElementById('doclist').innerHTML = table ;
  });
   
    //close other pages
    nurslist.style.display='none';//close the nurses list
    pharmlist.style.display='none';
    receplist.style.display='none';
    AddForm.style.display='none';
//change buttons bd
nurbtn.style.background='#F6F7FB';
pharmbtn.style.background='#F6F7FB';
recepbtn.style.background='#F6F7FB';
addbtn.style.background='#F6F7FB';  

 searchbtn.addEventListener("click",function(){
  const searchTerm = searchinp.value;  
  if(searchTerm != "") {
    var table = '' ; 
    const results = tabdoc.filter((item) => item.nameuser.includes(searchTerm));
  const codes = results.map((item) => item.nameuser ); 
for (let k in codes){
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();   
    for (let i  in data){
      if(data[i].UserJob == "doctor"){
        if (data[i].UserName == codes[k]){
          table += `
          <div class="doc1" id="doc1">
          <img src=${data[i].UserImage} alt="">
          <div class="infos">
              <h4>${data[i].UserName}</span><p>${data[i].UserEmail}</p> <p>${data[i].UserPhoneNumber}</p>
                 <p> ${data[i].spec}</p>
          </div>
      </div>
      `
        }
      }
    }
   
  });
}
document.getElementById('doclist').innerHTML = table ;
  }else {
    setInterval(function() {
      location.reload();
    }, 100);
  }
 });



}
//show nurses list
function shownur(){
   
        nurbtn.style.background='#FFFFFF';
        nurslist.style.display='flex';

        const starCountRef = databaseURL(database,"user/");
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();   
          var table = '' ; 
          for (let i  in data){
            if(data[i].UserJob == "nurses"){
              tabnur.push({inf:data[i].UserName});
              table += `
              <div class="doc1" id="doc1">
              <img src=${data[i].UserImage} alt="">
              <div class="infos">
                  <h4>${data[i].UserName}</span><p>${data[i].UserEmail}</p> <p>${data[i].UserPhoneNumber}</p>
                     <p> ${data[i].spec}</p>
              </div>
          </div>
          `
            }
          }
          document.getElementById('nurslist').innerHTML = table ;
        });
//close other pages
        doclist.style.display='none';
        pharmlist.style.display='none';
        receplist.style.display='none';
        AddForm.style.display='none';
 //change other buttons bg
       docbtn.style.background='#F6F7FB'; 
       pharmbtn.style.background='#F6F7FB';
       recepbtn.style.background='#F6F7FB';
       addbtn.style.background='#F6F7FB';  


       searchbtn.addEventListener("click",function(){
        const searchTerm = searchinp.value;  
        if(searchTerm != "") {
          var table = '' ; 
          const results = tabnur.filter((item) => item.inf.includes(searchTerm));
        const codes = results.map((item) => item.inf ); 
      for (let k in codes){
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();   
          for (let i  in data){
            if(data[i].UserJob == "nurses"){
              if (data[i].UserName == codes[k]){
                table += `
                <div class="doc1" id="doc1">
                <img src=${data[i].UserImage} alt="">
                <div class="infos">
                    <h4>${data[i].UserName}</span><p>${data[i].UserEmail}</p> <p>${data[i].UserPhoneNumber}</p>
                       <p> ${data[i].spec}</p>
                </div>
            </div>
            `
              }
            }
          }
         
        });
      }
      document.getElementById('nurslist').innerHTML = table ;
        } else {
          setInterval(function() {
            location.reload();
          }, 100);
        }
       });
    
}
//show pharmasist list
 function showphar(){
    pharmbtn.style.background='#FFFFFF';
    pharmlist.style.display='flex';
    const starCountRef = databaseURL(database,"user/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();   
      var table = '' ; 
      for (let i  in data){
        if(data[i].UserJob == "pharmacies"){
          tabphar.push({phr:data[i].UserName})
          table += `
          <div class="doc1" id="doc1">
          <img src=${data[i].UserImage} alt="">
          <div class="infos">
              <h4>${data[i].UserName}</span><p>${data[i].UserEmail}</p> <p>${data[i].UserPhoneNumber}</p>
                 <p> ${data[i].spec}</p>
          </div>
      </div>
      `
        }
      }
      document.getElementById('pharmlist').innerHTML = table ;
    });
    //close other pages
    nurslist.style.display='none';//close the nurses list
    doclist.style.display='none';
    receplist.style.display='none'
    AddForm.style.display='none';
//change buttons bd
nurbtn.style.background='#F6F7FB';
docbtn.style.background='#F6F7FB';
recepbtn.style.background='#F6F7FB';
addbtn.style.background='#F6F7FB'; 

searchbtn.addEventListener("click",function(){
  const searchTerm = searchinp.value;  
  if(searchTerm != "") {
    var table = '' ; 
    const results = tabphar.filter((item) => item.phr.includes(searchTerm));
  const codes = results.map((item) => item.phr ); 
for (let k in codes){
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();   
    for (let i  in data){
      if(data[i].UserJob == "pharmacies"){
        if (data[i].UserName == codes[k]){
          table += `
          <div class="doc1" id="doc1">
          <img src=${data[i].UserImage} alt="">
          <div class="infos">
              <h4>${data[i].UserName}</span><p>${data[i].UserEmail}</p> <p>${data[i].UserPhoneNumber}</p>
                 <p> ${data[i].spec}</p>
          </div>
      </div>
      `
        }
      }
    }
   
  });
}
document.getElementById('pharmlist').innerHTML = table ;
  } else {
    setInterval(function() {
      location.reload();
    }, 100);
  }
 });




 }

//show receptionist list
 function showrecep(){
    recepbtn.style.background='#FFFFFF';
    receplist.style.display='flex';
    const starCountRef = databaseURL(database,"user/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();   
      var table = '' ; 
      for (let i  in data){
        if(data[i].UserJob == "Receptioniste"){
          tabrece.push({rec:data[i].UserName})
          table += `
          <div class="doc1" id="doc1">
          <img src=${data[i].UserImage} alt="">
          <div class="infos">
              <h4>${data[i].UserName}</span><p>${data[i].UserEmail}</p> <p>${data[i].UserPhoneNumber}</p>
                 <p> ${data[i].spec}</p>
          </div>
      </div>
      `
        }
      }
      document.getElementById('receplist').innerHTML = table ;
    });
    //close other pages
    doclist.style.display='none';
    nurslist.style.display='none';
    pharmlist.style.display='none';
    AddForm.style.display='none';
//change other buttons bg
   docbtn.style.background='#F6F7FB'; 
   pharmbtn.style.background='#F6F7FB';
   nurbtn.style.background='#F6F7FB';
   addbtn.style.background='#F6F7FB';  
   searchbtn.addEventListener("click",function(){
    const searchTerm = searchinp.value;  
    if(searchTerm != "") {
      var table = '' ; 
      const results = tabrece.filter((item) => item.rec.includes(searchTerm));
    const codes = results.map((item) => item.rec ); 
  for (let k in codes){
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();   
      for (let i  in data){
        if(data[i].UserJob == "Receptioniste"){
          if (data[i].UserName == codes[k]){
            table += `
            <div class="doc1" id="doc1">
            <img src=${data[i].UserImage} alt="">
            <div class="infos">
                <h4>${data[i].UserName}</span><p>${data[i].UserEmail}</p> <p>${data[i].UserPhoneNumber}</p>
                   <p> ${data[i].spec}</p>
            </div>
        </div>
        `
          }
        }
      }
     
    });
  }
  document.getElementById('receplist').innerHTML = table ;
    } else {
      setInterval(function() {
        location.reload();
      }, 100);
    }
   });
   
 }
//add workers
  function addwork(){
    //display form page
    addbtn.style.background='#FFFFFF';
    AddForm.style.display='block';//change after style
 //close other pages
 doclist.style.display='none';
 nurslist.style.display='none';
 pharmlist.style.display='none';
 receplist.style.display='none';
 document.getElementById('searchBar').style.display='none';
//change other buttons bg
docbtn.style.background='#F6F7FB'; 
nurbtn.style.background='#F6F7FB'; 
pharmbtn.style.background='#F6F7FB';
recepbtn.style.background='#F6F7FB';





  }




const workers = document.querySelector("#workers"); 
const Doctors = document.querySelector("#Doctors"); 
const nurses = document.querySelector("#nurses"); 
const pharmacies = document.querySelector("#pharmacies"); 
const Receptionist = document.querySelector("#Receptionist"); 



workers.addEventListener("click",function(){
  addwork();





});



Doctors.addEventListener("click",function(){
  showdoc(); 
});





nurses.addEventListener("click",function(){
shownur();
});


pharmacies.addEventListener("click",function(){
 showphar();
});



Receptionist.addEventListener("click",function(){
  showrecep();
});




const save = document.querySelector("#save");

save.addEventListener("click", function () {
  const photo = document.querySelector("#photo");
const name = document.querySelector("#name").value;
const adr = document.querySelector("#adr").value;
const date = document.querySelector("#date").value;
const city = document.querySelector("#city").value;
const sex = document.querySelector("#sex").value;
const phone = document.querySelector("#phone").value;
const email = document.querySelector("#email").value;
const password = document.querySelector("#password").value;
const job = document.querySelector("#job").value;
const status = document.querySelector("#status").value;
const spec = document.querySelector("#spec").value;

if (name === "" || adr === "" || date === "" || city === "" || sex === "" || phone === "" || email === "" || password === "" || job === "" || status === "" || spec === "") {
alert("Please do not leave any field empty");
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


const sexe = parseInt(sex);

const now = new Date();
const isoString = now.toISOString();
const imageRef = storageRef(storage, 'images/'+photo.value+isoString  );
const db = databaseURL(database,"user/"); 
let usid = "" ; 
// Uploader le fichier
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

    
     
     createUserWithEmailAndPassword(auth, email, password)
     .then((userCredential) => {
       // Signed in 
       const user = userCredential.user;
        usid = user.uid ; 
        console.log(usid);
        set(databaseURL(database, "user/" + usid), {
          userId: usid , 
          UserImage : url , 
          UserName : name , 
          UserAdresse : adr , 
          BirthOfUser : date , 
          UserCity : city , 
          UserGender : sexe , 
          UserEmail : email , 
          UserPhoneNumber : phone,
          spec : spec , 
          UserJob : job ,
          UserStatus : status 
        }
        );

        document.body.removeChild(dialog);
        alert("User Added")
      
         
       // ...
     })
     .catch((error) => {
      document.body.removeChild(dialog);
       const errorCode = error.code;
       const errorMessage = error.message;
       // ..
     });
  
   })
   .catch((error) => {
    document.body.removeChild(dialog);
     console.error("Error getting download URL: ", error);
   });
})
.catch((error) => {
  document.body.removeChild(dialog);
 console.error("Error uploading image: ", error);
});}
});




