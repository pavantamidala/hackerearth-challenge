let table = document.createElement("table")
let container = document.getElementById("box")
let selectedPlayers = document.getElementById("selected")
let startButton = document.getElementById("startButton")
let random = Math.floor(Math.random() * 9) + 1
let heading = document.createElement('h1')
heading.innerText = "opposing bet is" +" "+ random

window.addEventListener("load", function () {
    let xhttp = new XMLHttpRequest();
    let data;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            data = this.responseText;

            return rendering(userData(JSON.parse(data)))
        }
    };
    xhttp.open("GET", "https://s3-ap-southeast-1.amazonaws.com/he-public-data/bets7747a43.json", true);
    xhttp.send();
})
let userArray;
function userData(arr) {
    for (let i = 0; i < arr.length; i++) {
        let date = new Date()
        arr[i]["uniqueValue"] = arr[i]['Profile Image']
    }
    userArray = arr
    return arr
}

function rendering(array) {
    console.log(array.length)
    let tr = document.createElement('tr')
    let details = ["Select", "Name", "Price", "Bet", "Avatar"]
    for (let i = 0; i < details.length; i++) {
        let th = document.createElement("th")
        th.innerText = details[i]
        tr.appendChild(th)
    }
    table.appendChild(tr)

    for (let i = 0; i < array.length; i++) {
        let tr = document.createElement("tr")
        let check = checkbox()
        check.dataset.value = array[i]["uniqueValue"]
        tr.appendChild(check)
        for (let detail in array[i]) {
            let td = document.createElement("td")
            if (detail === "Profile Image") {
                td.innerHTML = `<img height=50px width=50px src=${array[i][detail]}>`
            }
            else if (detail !== "uniqueValue") {
                td.innerText = array[i][detail]
            }
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
    container.appendChild(table)
}


function checkbox() {
    let check = document.createElement("INPUT");
    check.setAttribute("type", "checkbox");
    return check
}


function image(attribute) {
    let img = document.createElement("img")
    img.setAttribute(attribute)
    return img
}


    startButton.addEventListener("click", function () {
        inputs = document.getElementsByTagName('input')
        let inputsChecked = []
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].checked === true) {
                inputsChecked.push(inputs[i])
            }
        }
        let selectedPlayersArray = []
       
            container.style.display = "none"
            let j=0
            for(let i=0;i<userArray.length;i++){
                for(let detail in userArray[i]){
                    if(userArray[i][detail] === inputsChecked[j].dataset.value){
                        selectedPlayersArray.push(userArray[i])
                        j = j+1
                    }
                    if(j===9){
                        break
                    }
                }
                if(j===9){
                    break
                }
            }
        console.log(selectedPlayersArray)
        let divArray =userProfile(selectedPlayersArray)
       for(let i=0;i<divArray.length;i++){
           selectedPlayers.appendChild(divArray[i])
       }
        selectedPlayers.prepend(heading)
       
    })
    

function userProfile(array){
    let divsArray = []
   for(let i=0;i<array.length;i++){
       let div = document.createElement('div')
       div.innerHTML = `<h4> name:${array[i].Name} </h4></br>
       <h4> Bet:${array[i].Bet} </h4></br>
       <h4> Price:${array[i].Price} </h4></br>
       <img height=50px width=50px src=${array[i]["Profile Image"]}><br>
       <hr>
       `
       if(Number(array[i].Bet)===random){
           div.style.background = "green"
       }else{
           div.style.background = "red"
       }
       divsArray.push(div)
   } 
   return divsArray
}
// Bet: "5"
// Name: "Richard"
// Price: "2000"
// Profile Image: "https://s3-ap-southeast-1.amazonaws.com/he-public-data/richarde8624aa.jpg"
// uniqueValue: "https://s3-ap-southeast-1.amazonaws.com/he-public-data/richarde8624aa.jpg"
