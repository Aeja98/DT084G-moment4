//Variabler
let newtodoEl = document.getElementById("newtodo");
let newtodobuttonEl = document.getElementById("newtodobutton");
let messageEl = document.getElementById("message");
let todolistEl = document.getElementById ("todolist");
let clearbuttonEl = document.getElementById("clearbutton");
let i;

//Händelsehanterare
newtodoEl.addEventListener("keyup", CheckItemText, false);
newtodobuttonEl.addEventListener("click", addItem, false);
clearbuttonEl.addEventListener("click",clearStorage, false);
window.onload = init;

//Startfunktion
function init(){
    console.log("Initializing content...");

    //Inaktivera lägg till knappen
    newtodobuttonEl.disabled = true;

    //Läs in listan
    loadStorage();
}

//Lägg till i listan
function addItem() {
    console.log("Lägger till i listan");

    let input = newtodoEl.value; 

    //Skapar nytt element
    let newEl = document.createElement("article");
    let newText = document.createTextNode(input);
    newEl.appendChild(newText);
    newEl.className= "ToDo"

    //Lägger till i listan
    todolistEl.appendChild(newEl);

    //Lägger till klickhanterare för att radera 
    newEl.addEventListener("click", function(deleteItem){
        deleteItem.target.remove();

        //Lagra listan
        storeItem();
    });

    //Radera inputfältet
    newtodoEl.value="";

    //Anropar lagring
    storeItem();
}

//Kontrollera om inmatad text innehåller fem eller fler tecken och visar meddelande om färre än fem
function CheckItemText() {
    console.log("Kontrollerar text...");

    let input = newtodoEl.value;

    if(input.length > 4){
        messageEl.innerHTML="";
        newtodobuttonEl.disabled = false;
    }
    else{
        messageEl.innerHTML = "Måste innehålla minst 5 tecken.";
        newtodobuttonEl.disabled = true;
    }
}

//Inläsning/utskrift av lagrat data i web storage
function loadStorage() {
    console.log("Läser in listan...");

    //Läser in och konverterar från json till array
    let toDo = JSON.parse(localStorage.getItem("toDo"));

    //Loopa genom array
    for (i=0; i<toDo.length; i++) {

        //Skapar nytt element
        let newEl = document.createElement("article");
        let newText = document.createTextNode(toDo[i]);
        newEl.appendChild(newText);
        newEl.className= "ToDo"
        
        //Lägger till i listan
        todolistEl.appendChild(newEl);

        //Lägger till klickhanterare
        newEl.addEventListener("click", function(deleteItem){
            deleteItem.target.remove();

            //Lagra listan
            storeItem();
        });

    }

    console.log (toDo);
}

//Lagring av inmatning till web storage
function storeItem() {
    console.log("Lagrar...");

    //Läs in To Do listan
    let toDo = document.getElementsByClassName("ToDo");
    
    let tempArr = [];

    //Loopar genom listan & lagrar till array, sen skriver ut
    for (i=0; i<toDo.length; i++) {
        tempArr.push(toDo[i].innerHTML);
    }

    //Konverterar till json-sträng
    let jsonStr = JSON.stringify(tempArr);

    //Lagrar i webbstorage
    localStorage.setItem("toDo", jsonStr);

    console.log(tempArr);
}
function clearStorage(){

    clearbuttonEl.disabled = false;

    //Tömmer to do listan
    todolistEl.innerHTML="";
    
    //Lagrar i listan
    storeItem();
}