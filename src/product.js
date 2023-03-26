//get elements
let code = document.getElementById('code');
let productt = document.getElementById('productt');
let dose =document.getElementById('dose');
let quantity= document.getElementById('quantity');
let ordernumber = document.getElementById('ordernumber');
let Batchnumber = document.getElementById('Batchnumber');
let Expirationdate = document.getElementById('Expirationdate');

let add=document.getElementById('btntext');
let mood='create';
let tmp;
//check all products
function checkal(){
 let checkALL = document.getElementById('checkAll');
if (checkALL.checked == true) {
  for (let j = 0; j < dataPro.length; j++) {
    let dd ='check'+ j.toString();   
    let ss=document.getElementById(dd); 
    ss.checked = true;
  }
}else{
  for (let j = 0; j < dataPro.length; j++) {
    let dd ='check'+ j.toString();   
    let ss=document.getElementById(dd); 
    ss.checked = false;
}
}}

//hide and show modification buttons
var a;
function hide(i) {
  let idd= 'butns'
  idd += i.toString()
      if (a==0) {     
      document.getElementById(idd).style.display='block';
        a=1;
      }
       else {
        
        document.getElementById(idd).style.display='none';
        a=0;
      }  
}


//show and hide inputs zone
var b=0;
add.onclick = function(){
  
  if (b==0) {
    document.getElementById('tr2').style.display='contents';
    b=1;
  } else {
    create();
    document.getElementById('tr2').style.display='none';
    checkal();
    b=0
  }
  
}



//creat a product 
   //put the information in table and save in the previous one
  let dataPro;
  if(localStorage.product != null){
     dataPro = JSON.parse(localStorage.product)  
  }else{
      dataPro = [];
  }
  function create(){
     // add.onclick = function(){
        let newPro = {
            
           code:code.value,
           productt:productt.value,
           dose:dose.value,
           quantity:quantity.value,
           ordernumber:ordernumber.value,
           Batchnumber:Batchnumber.value,
           Expirationdate:Expirationdate.value,
          
        }
        if(mood == 'create'){
        dataPro.push(newPro);}
        else{
          dataPro[ tmp ] = newPro;
       mood ='create';
       add.innerHTML='Add';
       
        }
      
      //save local storage
      localStorage.setItem('product' , JSON.stringify(dataPro))//tosave arrat as string      console.log(dataPro);
      clearData();
      showData();
      bg();
    //}
  }

//clear inputs
function clearData(){
  code.value = '';
  productt.value = '';
  dose.value ='';
  quantity.value = '';
  ordernumber.value = '';
  Batchnumber.value = '';
  Expirationdate.value = '';
  
  }


   //show data 
   function showData(){
    let table = '';
  for(let i=0;  i < dataPro.length ; i++ ){
      table += ` <tr id="index${i}" >
      <td><input type="checkbox" id="check${i}" style="width: 35px;height: 35px;"></td>
      <td>${dataPro[i].code}</td>
      <td>${dataPro[i].productt} <br>
      <p> ${dataPro[i].dose}</p>
      </td>
         
      <td>${dataPro[i].quantity}</td>
      <td>${dataPro[i].ordernumber}</td>
      <td>${dataPro[i].Batchnumber}</td>
      <td>${dataPro[i].Expirationdate} </td>
      <td> 
      <img src="/images/more-vertical.png" alt="" id="modf" class="modf"  onclick="hide(${i})">
      <div class="butns" id="butns${i}" style="display: none;" >
      <button id="update" onclick="updateData(${i})">update</button>
      <button onclick="deleteData(${i})" id="delete" >delete</button>
   </div>      
  </td>    
  </tr>`;
     // console.log(table);        
  } 
    document.getElementById('tbody').innerHTML = table ;
   // bg();
}
   showData();
   bg();



//delete one element
function deleteData(i){
  dataPro.splice(i,1);
  localStorage.product = JSON.stringify(dataPro)
  showData()
  }

  //delete multiple products
  function dtm(){         
    // for (let index = 0; index < 10; index++) {    
    let ch=[];             
    for (let j = 0; j < dataPro.length; j++){
      let dd ='check'+ j.toString();   
      let ss=document.getElementById(dd);      
      ch.push(ss.checked)        
     }
     //console.log(ch) ;
     let x=dataPro.length;
   for (let i = 0; i < x; i++) {    
     for (let index = 0; index < ch.length; index++) {
      if (ch[index]==true) {
        deleteData(index);
       ch.splice(index,1)
      }
      
     }}
     //console.log(gg);
    showData();
     bg();
    }
 

//background color
function bg(){
for (let f = 0; f < dataPro.length; f++) {
  if ((f % 2) == 0) {   
    document.getElementById("index"+f.toString()).style.background ='rgba(144, 144, 144, 0.1)';
   }  
}}
/*//search by filter
  //if we press enter we search 
   ///select id =filtre
   //search input id=searchinp
   let searchbtn = document.getElementById('searchbtn');
   let search = document.getElementById('searchinp');
   let filter = document.getElementById('filtre')
   let codeFilter = document.getElementById('codeFilter');
   let nameFilter = document.getElementById('nameFilter');
   console.log(typeof( filter.value));
   //search.addEventListener('keyup' , (e) => {
   // if ((e.keyCode === 13)  ){  //if we press enter key
   searchbtn.onclick = function (){
    let chh = dataPro.length;
     
       if (filter.value == 'code') { //recherch par code
        for (let index = 0; index < chh; index++) {
       
        for (let i = 0; i < dataPro.length; i++) {
          if (dataPro[i].code.toString() != search.value) {
            dataPro.splice(i,1)
           // showData();
          }
          //showData();
        }}
        
       } else { if (filter.value == 'product') {
        for (let index = 0; index < chh; index++) {
        for (let i = 0; i < dataPro.length; i++) {
          if ((dataPro[i].productt.toString()) != search.value) {
            dataPro.splice(i,1)
           // showData()
           // console.log('faaal');
          }}}
        
       }else{if (filter.value == 'All'){
        dataPro = JSON.parse(localStorage.product) 
       // showData();
        console.log(dataPro);
      }

       }
        
       }
       showData();
    }
    showData()
    console.log(dataPro)
*/
   
//update product

function updateData(i){



  if (b==0) {
    document.getElementById('tr2').style.display='contents';
    b=1;
  } else {
    create();
    document.getElementById('tr2').style.display='none';
    checkal();
    b=0
  }
    code.value = dataPro[i].code;
    productt.value = dataPro[i].productt;
    dose.value = dataPro[i].dose;
    quantity.value = dataPro[i].quantity;
    ordernumber.value = dataPro[i].ordernumber;
    Batchnumber.value = dataPro[i].Batchnumber;
    Expirationdate.value = dataPro[i].Expirationdate;
    add.innerHTML = 'update';
    mood ='update';
    tmp = i;
    scroll({
        top:0,
        behavior:'smooth'
    })
} 
//search
//clean Data