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



//show doctors list
function showdoc(){

    docbtn.style.background='#FFFFFF';
    doclist.style.display='flex';
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

}
//show nurses list
function shownur(){
   
        nurbtn.style.background='#FFFFFF';
        nurslist.style.display='flex';
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
        
    
}
//show pharmasist list
 function showphar(){
    pharmbtn.style.background='#FFFFFF';
    pharmlist.style.display='flex';
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
 }

//show receptionist list
 function showrecep(){
    recepbtn.style.background='#FFFFFF';
    receplist.style.display='flex';
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