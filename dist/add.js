let drower = document.getElementById('drower');
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
let Dashboard=document.getElementById('Dashboard');

const searchbtn = document.getElementById('searchBtn'); 
const searchinp = document.getElementById('search'); 
function actived(){

    console.log("true");
    drower.style.display="block";
    docbtn.onclick = function() {
        drower.style.display="none";
    }
    nurbtn.onclick = function() {
        drower.style.display="none";
    }
    pharmbtn.onclick = function() {
        drower.style.display="none";
    }
    recepbtn.onclick = function() {
        drower.style.display="none";
        
    }
    addbtn.onclick = function() {
        drower.style.display="none";
    }
    Dashboard.onclick = function() {
        searchBar.style.display='none';
        drower.style.display="none";
        dashb.style.display="block";
    }
}
////////////////////////////////////////////
let dashb = document.getElementById('dashb');

function showdassh (){
  console.log("true");
  searchBar.style.display='none';
  dashb.style.display= 'block';
  doclist.style.display='none';
  nurslist.style.display='none';
  pharmlist.style.display='none';
  receplist.style.display='none';
  AddForm.style.display='none';
}


// ---------- CHARTS ----------

// BAR CHART
var barChartOptions = {
  series: [{
    data: [15, 20, 5, 3],
    name: "Products",
  }],
  chart: {
    type: "bar",
    background: "transparent",
    height: 350,
    toolbar: {
      show: false,
    },
  },
  colors: [
    "#227ECC",
    "#0F9B96",
    "#376293",
    "#0a1018",
    
  ],
  plotOptions: {
    bar: {
      distributed: true,
      borderRadius: 4,
      horizontal: false,
      columnWidth: "40%",
    }
  },
  dataLabels: {
    enabled: false,
  },
  fill: {
    opacity: 1,
  },
  grid: {
    borderColor: "#55596e",
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  legend: {
    labels: {
      colors: "#f5f7ff",
    },
    show: true,
    position: "top",
  },
  stroke: {
    colors: ["transparent"],
    show: true,
    width: 2
  },
  tooltip: {
    shared: true,
    intersect: false,
    theme: "dark",
  },
  xaxis: {
    categories: ["Doctors", "Nurses", "Pharmacies", "Receptionists" ],
    title: {
      style: {
        color: "#f5f7ff",
      },
    },
    axisBorder: {
      show: true,
      color: "#55596e",
    },
    axisTicks: {
      show: true,
      color: "#55596e",
    },
    labels: {
      style: {
        colors: "#f5f7ff",
      },
    },
  },
  yaxis: {
    title: {
      text: "Count",
      style: {
        color:  "#f5f7ff",
      },
    },
    axisBorder: {
      color: "#55596e",
      show: true,
    },
    axisTicks: {
      color: "#55596e",
      show: true,
    },
    labels: {
      style: {
        colors: "#f5f7ff",
      },
    },
  }
};

var barChart = new ApexCharts(document.querySelector("#bar-chart"), barChartOptions);
barChart.render();





