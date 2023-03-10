var a;
function show(){
    if (a==1) {
        document.getElementById('choix3').style.display='block';
        return a=0; 
    } else {
        document.getElementById('choix3').style.display='none';
        return a=1;
    }
    
}
function show2(){
    if (a==1) {
        document.getElementById('choix2').style.display='block';
        return a=0; 
    } else {
        document.getElementById('choix2').style.display='none';
        return a=1;
    }
    
}
function show1(){
    if (a==1) {
        document.getElementById('choix1').style.display='block';
        return a=0; 
    } else {
        document.getElementById('choix1').style.display='none';
        return a=1;
    }
    
}

