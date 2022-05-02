const img = document.getElementsByTagName("img")[0];
var formattedTimes = [];

function showCurrentAndWait(ft){

    var current = ft.shift();
    if(current){
        img.src = "/snapshots/" + current[0] + ".png";
        var t = window.setTimeout(function(){            
            window.clearInterval(t);
            showCurrentAndWait(ft);
        }, current[1]);
    }
    else {
        var t = window.setTimeout(function(){
            window.clearTimeout(t);
            var ft = formattedTimes.map(d => d);
            showCurrentAndWait(ft);
        }, 3000);
        

    }
    

}

async function fetchTimes() {
    const response = await fetch('/index.json');
    const rj = await response.json();
    return rj;
  }
  fetchTimes().then(data => {
    formattedTimes = data;
    var ft = formattedTimes.map(d => d);
    showCurrentAndWait(ft);
    
   
  });