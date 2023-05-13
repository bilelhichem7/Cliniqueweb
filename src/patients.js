let form = document.getElementById('form');
let patslist = document.getElementById('patslist');
let addpatbtn = document.getElementById('addpat');
let patbtn = document.getElementById('pat');
console.log(patslist);
function addpat() {
    
    addpatbtn.style.background='#FFFFFF';    
    form.style.display='block'; 
    patslist.style.display='none'; 
}
function patList(){
    patbtn.style.background='#FFFFFF';
    patslist.style.display='block'; 
    form.style.display='none';
}