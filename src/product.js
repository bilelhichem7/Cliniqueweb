import { initializeApp } from "firebase/app";
import { getDatabase, push, ref as databaseURL, set , onValue ,remove} from "firebase/database";
import { getAuth,signOut } from "firebase/auth";  
const codedata = [];
const productdata = [];


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
const db = databaseURL(database,"Medicament/");
const auth = getAuth(app);





//get elements
let code = document.getElementById('code');
let productt = document.getElementById('productt');
let quantity= document.getElementById('quantity');
let ordernumber = document.getElementById('ordernumber');
let Batchnumber = document.getElementById('Batchnumber');
let Expirationdate = document.getElementById('Expirationdate');


let add=document.getElementById('btntext');
//check all products//hide and show modification buttons

//show and hide inputs zone
var b=0;
add.addEventListener("click",function(){
  console.log(b);
  if (b==0) {
    document.getElementById('tr2').style.display='contents';
    b=1;
  } else { 
    if (code.value == "" || productt.value == "" || quantity.value == "" || ordernumber.value == "" || Batchnumber.value== ""
    || Expirationdate.value == ""
    ){
        alert("PLEASE DON'T LET ANYTHING EMPTY");
    } else {
      const newRecordRef = push(db);
      const newRecordKey = newRecordRef.key;
      const newData = {
        medid : newRecordKey ,
        MedNameProduct : productt.value , 
        MedCode : code.value , 
        MedQuantity : quantity.value , 
        MedOrderNumber : ordernumber.value , 
        MedBachNumber : Batchnumber.value , 
        MedExpirationDate : Expirationdate.value
      } ; 
      set(newRecordRef, newData) ;
      setInterval(function() {
        location.reload();
      }, 500);
      code.value = "" ; 
      productt.value = "" ; 
      quantity.value = "" ; 
      ordernumber.value = "" ; 
      Batchnumber.value = "" ; 
      Expirationdate.value = "" ; 
    document.getElementById('tr2').style.display='none';
    b = 0 ; 
  }
  };
});

const starCountRef = databaseURL(database,"Medicament/");

onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();   
  var table = '' ; 
  for (let i  in data){
    codedata.push( {code:data[i].MedCode}); 
    productdata.push( {product:data[i].MedNameProduct}); 

      table += `
      <tr id="index${i}" >
      <td><input type="checkbox" id="check${i}" style="width: 35px;height: 35px;"></td>
      <td  id="prodcode${i}" >${data[i].MedCode}</td>
      <td>${data[i].MedNameProduct} <br>
      </td>
         
      <td>${data[i].MedQuantity}</td>
      <td>${data[i].MedOrderNumber}</td>
      <td>${data[i].MedBachNumber}</td>
      <td>${data[i].MedExpirationDate} </td>
      <td> 
      <img src="/images/more-vertical.png" alt="" id="modf${i}" class="modf"  >
     <div class="butns" id="butns${i}" style="display: none;" >
  <button  id="delete${i}" >delete</button>
      <button id="update${i}">update</button>
   </div>      
  </td>    
  </tr>
  `
  }
  document.getElementById('tbody').innerHTML = table ;
});

// delete medicament  ............................................................

const delet = document.getElementById('delet');
delet.addEventListener("click", function() {
  const medIdsToDelete = [] ; 
  onValue(db, (snapshot) => {
    const data = snapshot.val(); 
    for (let i in data) {
      const checkbox = document.getElementById(`check${i}`);
      if (checkbox.checked) {
        medIdsToDelete.push(data[i].medid);
      }
    }
  
    medIdsToDelete.forEach((medId) => {
      remove(databaseURL(database, `Medicament/${medId}`))
        .then(() => console.log(`Medication with ID ${medId} deleted successfully`))
        .catch((error) => console.error(`Error deleting medication with ID ${medId}: ${error}`));
    });
  });
});


//............................................................


// logout ....................................
const logout = document.getElementById('logout');  

logout.addEventListener("click",function(){
  signOut(auth).then(() => {
    window.location.href = "index.html";
    }).catch((error) => {
    // An error happened.
  });
});
//................................................

//....slection tous .......................


const selectous = document.getElementById("checkAll");

selectous.addEventListener("click", function() {
  if (selectous.checked) {
    onValue(db, (snapshot) => {
      const data = snapshot.val();
      for (let i in data) {
        const checkbox = document.getElementById(`check${i}`);
        // Use the checked property to set the state of the checkbox
        checkbox.checked = true;
      }
    });
  } else {
    onValue(db, (snapshot) => {
      const data = snapshot.val();
      for (let i in data) {
        const checkbox = document.getElementById(`check${i}`);
        // Use the checked property to clear the state of the checkbox
        checkbox.checked = false;
      }
    });
  }
});

//...............................

// la recherche dans ce cas ...............................
const filtre = document.getElementById('filtre'); 

const searchbtn = document.getElementById('searchbtn'); 

const searchinp = document.getElementById('searchinp'); 
// Example array of objects

searchbtn.addEventListener("click", function() {
 
const searchTerm = searchinp.value;  
  if (searchTerm !== "" && filtre.value === "code") {
  const results = codedata.filter((item) => item.code.includes(searchTerm));
  const codes = results.map((item) => item.code );
  var table = '' ; 
for(let k in codes){
  
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();   
    for (let i  in data){
    if(data[i].MedCode == codes[k]) {
      table += `
        <tr id="index${i}" >
        <td><input type="checkbox" id="check${i}" style="width: 35px;height: 35px;"></td>
        <td>${data[i].MedCode}</td>
        <td>${data[i].MedNameProduct} <br>
        </td>
           
        <td>${data[i].MedQuantity}</td>
        <td>${data[i].MedOrderNumber}</td>
        <td>${data[i].MedBachNumber}</td>
        <td>${data[i].MedExpirationDate} </td>
        <td> 
        <img src="/images/more-vertical.png" alt="" id="modf${i}" class="modf"  onclick="hide(${i})">
       <div class="butns" id="butns${i}" style="display: none;" >
       <button  id="delete${i}" >delete</button>
       <button id="update${i}">update</button>
     </div>      
    </td>    
    </tr>
    `
    }
      
    
    }
    
  });
};
document.getElementById('tbody').innerHTML = table ;
  } else if (searchTerm !== "" && filtre.value === "product") {

    // on utilise le nom de product 
    const results = productdata.filter((item) => item.product.includes(searchTerm));
    const codes = results.map((item) => item.product );
    var table = '' ; 
  for(let k in codes){
    console.log(codes[k]);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();   
      for (let i  in data){
      if(data[i].MedNameProduct == codes[k]) {
        table += `
          <tr id="index${i}" >
          <td><input type="checkbox" id="check${i}" style="width: 35px;height: 35px;"></td>
          <td>${data[i].MedCode}</td>
          <td>${data[i].MedNameProduct} <br>
          </td>
             
          <td>${data[i].MedQuantity}</td>
          <td>${data[i].MedOrderNumber}</td>
          <td>${data[i].MedBachNumber}</td>
          <td>${data[i].MedExpirationDate} </td>
          <td> 
          <img src="/images/more-vertical.png" alt="" id="modf${i}" class="modf"  onclick="hide(${i})">
         <div class="butns" id="butns${i}" style="display: none;" >
         <button  id="delete${i}" >delete</button>
         <button id="update${i}">update</button>
       </div>      
      </td>    
      </tr>
      `
      }
        
      
      }
      
    });
  };
  document.getElementById('tbody').innerHTML = table ;
  } else {
    setInterval(function() {
      location.reload();
    }, 100);
  } ;



});
//...............................................................



const cliniquename = document.querySelector("#cliniquename"); 
const starCountRefe = databaseURL(database,"cliniquename");
onValue(starCountRefe, (snapshot) => {
  const data = snapshot.val();
  if(data != ""){
  cliniquename.innerHTML = data.nom ;}
});

cliniquename.addEventListener("click",function(){
  window.location.href = "index.html" ; 
})


//.......................

onValue(db, (snapshot) => {
  const data = snapshot.val(); 
  for (let i in data) {
    const medsup = document.getElementById(`modf${i}`);
    
    const btn2 = document.getElementById(`butns${i}`); 

    var cmp = 0 ; 
    medsup.addEventListener("click",function(){
      
      if(cmp == 0) {
      
        btn2.style.display = "flex" ;  
          const btndelete = document.getElementById(`delete${i}`);
          const btnupdate = document.getElementById(`update${i}`);

 //       delete       ........................
            btndelete.addEventListener("click",function(){
              remove(databaseURL(database, `Medicament/${i}`))
              .then(() => console.log(`Medication with ID ${i} deleted successfully`))
              .catch((error) => console.error(`Error deleting medication with ID ${i}: ${error}`));

            });
// ...........................................

var esi = 0 ; 
var prid  = "" ; 
btnupdate.addEventListener("click",function(){
  const starCount = databaseURL(database, `Medicament/${i}`);
  console.log(starCount);
if (esi == 0 ){
  esi = 1 ; 
  document.getElementById('tr2').style.display='contents';
            btnupdate.textContent = "confirm update"

            onValue(starCount, (snapshot) => {
              const data = snapshot.val();
              prid = data.medid ;   
              code.value = data.MedCode ; 
              productt.value = data.MedNameProduct ; 
              quantity.value = data.MedQuantity ; 
              ordernumber.value = data.MedOrderNumber ; 
              Batchnumber.value = data.MedBachNumber ; 
              Expirationdate.value = data.MedExpirationDate ; 
             });

} else if (esi == 1){

  if (code.value == "" || productt.value == "" || quantity.value == "" || ordernumber.value == "" || Batchnumber.value== ""
    || Expirationdate.value == ""
    ){
        alert("PLEASE DON'T LET ANYTHING EMPTY");
    }  else {
      
      const newData = {
        medid : prid ,
        MedNameProduct : productt.value , 
        MedCode : code.value , 
        MedQuantity : quantity.value , 
        MedOrderNumber : ordernumber.value , 
        MedBachNumber : Batchnumber.value , 
        MedExpirationDate : Expirationdate.value
      } ; 
      set(starCount, newData) ;
            document.getElementById('tr2').style.display='none';
            btnupdate.textContent = "update" ;  
            esi = 0 ; 
    }
}
            
})
cmp = 1 ; 
        } else {
          btn2.style.display = "none" ;
            cmp = 0 ; }});}});

//..................................................................................................................................


var rowtab = [] ;
var coltab = [] ; 
import readXlsxFile from 'read-excel-file'
const input = document.querySelector("#uplaod");



 input.addEventListener('change',function(){
   coltab = [] ; 
   rowtab = [] ; 
    readXlsxFile(input.files[0]).then(function(data){
     var i = 0 ; 
 
   data.map((row,index)=>{
     if (i == 0 ) {
        rowtab.push(row);
     }
     if (i>0){
       coltab.push(row);
     }

     i++ ; 
   });
     i = 0 ; 
   for(let k in coltab){
     const newRecordRef = push(db);
     const newRecordKey = newRecordRef.key;
       const newData = {
         medid : newRecordKey ,
         MedNameProduct : coltab[k][1] , 
         MedCode : coltab[k][0] , 
         MedQuantity : coltab[k][2] , 
         MedOrderNumber : coltab[k][3] , 
         MedBachNumber : coltab[k][4] , 
         MedExpirationDate : coltab[k][5]
       } ; 
       set(newRecordRef, newData) ;
           input.value = "" ;      
   } 
    })
 });



 const exporte = document.querySelector('#export'); 





 function generateTable(data) {
  const table = document.createElement('table');
  // Add a table header row
  const headerRow = document.createElement('tr');
  for (const header of data[0]) {
    const headerCell = document.createElement('th');
    const text = document.createTextNode(header);
    headerCell.appendChild(text);
    headerRow.appendChild(headerCell);
  }
  table.appendChild(headerRow);

  // Add the rest of the rows
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const tableRow = document.createElement('tr');
    for (const cell of row) {
      const tableCell = document.createElement('td');
      const text = document.createTextNode(cell);
      tableCell.appendChild(text);
      tableRow.appendChild(tableCell);
    }
    table.appendChild(tableRow);
  }

  return table;
}



exporte.addEventListener("click",function(){
  const dataa = [["code","product","Quantity","Order number" , "Batch number","Expiration date" ] ];

  const starCountReff = databaseURL(database,"Medicament/");

  onValue(starCountReff, (snapshot) => {
    const data = snapshot.val(); 
    for(let k in data){
        dataa.push([data[k].MedCode , data[k].MedNameProduct,data[k].MedQuantity,data[k].MedOrderNumber,data[k].MedBachNumber,data[k].MedExpirationDate]);
    }
  }) ; 


  var table2excel = new Table2Excel();
  table2excel.export(generateTable(dataa));

});








