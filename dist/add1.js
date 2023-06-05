
let patslist = document.getElementById('patslist');
let form = document.getElementById('form');
let addpat = document.getElementById('addpat');
let pat=document.getElementById('pat');
let drower=document.getElementById('drower');
const searchbtn = document.getElementById('searchBtn'); 
const searchinp = document.getElementById('search'); 
function activedd(){

    console.log("true");
    drower.style.display="block";
    addpat.onclick = function() {
        drower.style.display="none";
    }
    pat.onclick = function() {
        drower.style.display="none";
    }
   
    
}