var canvas= document.getElementById("myList");
var button1 = document.getElementById("add-button");
var content = document.getElementById("content");
var containerC = document.getElementById("myList");
var containerMain =document.getElementById("container")
const lists = document.getElementById("myList");
const dropPlace =document.getElementById("dropPlace");
const dropPlace1 =document.getElementById("dropPlace1");

let dragElement = null;
n =  new Date();
y = n.getFullYear();
m = n.getMonth() + 1;
d = n.getDate();
document.getElementById("currentDate").innerHTML = m + "/" + d + "/" + y;

window.addEventListener('load', function() {
    var itemChild = document.querySelectorAll("#item-child");
    itemChild.forEach(function(item) {
        console.log(item)
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragend', dragEnd);
    });
    
});


content.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("add-button").click();
  }
});


const addDataToLocal = ()=>{
    localStorage.setItem("data",containerC.innerHTML);
    localStorage.setItem("data2",dropPlace.innerHTML);
    localStorage.setItem("data3",dropPlace1.innerHTML);
}
const getDataToLocal =()=>{
    containerC.innerHTML= localStorage.getItem("data");
    dropPlace.innerHTML = localStorage.getItem("data2");
    dropPlace1.innerHTML = localStorage.getItem("data3");
}




const addItemToList = ()=>{
    if(content.value==undefined || content.value==null|| content.value==" " || content.value=="" ){
        alert("Please add proper text");
    }
    else{
        var divElement1 = document.createElement("div")
        var divElement2 = document.createElement("h1");
        var divContent = document.createTextNode( `${content.value}` );
        var spanElement = document.createElement("span");
        spanElement.innerHTML="\u00d7";
            divElement1.appendChild(divElement2);
            divElement2.appendChild(divContent);
            divElement1.appendChild(spanElement);
            divElement1.classList = "item"
            divElement1.id="item-child";
            canvas.appendChild(divElement1);
            divElement1.setAttribute("draggable","true");
            content.value = ' '
            divElement1.addEventListener('dragstart',dragStart);
            divElement1.addEventListener('dragend', dragEnd);
            addDataToLocal();
    }
}

containerMain.addEventListener("click",(e)=>{
    if(e.target.tagName === "SPAN"){
    e.target.parentElement.remove();
    addDataToLocal();
    }
})





getDataToLocal();


function dragStart(){
    dragElement= this;
    console.log("DragStart");
}

function dragEnd(){
    dragElement=null;
    console.log("DragEnd");
}

    
dropPlace.addEventListener('dragover', function(event) {
    event.preventDefault();
    console.log("drag over")
});

dropPlace.addEventListener('drop',function(){
    if (dragElement) { // Check if dragElement is defined
        this.appendChild(dragElement);
        addDataToLocal();
    }
})

canvas.addEventListener('dragover', function(event) {
    event.preventDefault();
    console.log("drag over")
});

canvas.addEventListener('drop',function(){
    if (dragElement) { 
        this.appendChild(dragElement);
        addDataToLocal();
    }
})

dropPlace1.addEventListener('dragover', function(event) {
    event.preventDefault();
    console.log("drag over")
});

dropPlace1.addEventListener('drop',function(){
    if (dragElement) { 
        this.appendChild(dragElement);
        addDataToLocal();
    }
})


// this code is for Geolocation



const success = async (position)=>{
    var locationText = document.getElementById("currentLocation");
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var getApi = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    const response = await fetch(getApi);
    const data =  await response.json();

    console.log(data.city);
    locationText.innerHTML= data.city; 
    
}
const error  = ()=>{
alert("Please allow to show your city");

}

navigator.geolocation.getCurrentPosition(success, error)
