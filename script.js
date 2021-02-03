let json;
let actor;
let temp = document.querySelector("template");

let filter = "all";

let listPointer = document.querySelector("#container");

let buttonActive = document.querySelector("button.filter.active");
console.log(buttonActive);

document.addEventListener("DOMContentLoaded", getData);

const link = "actors.json";

async function getData() {
    const response = await fetch(link);
    json = await response.json();
    addEventListenerToButtons();
    show(json);
}

function show() {

    listPointer.innerHTML = "";

    //løb igennem array "actors"
    json.forEach(actor => {

        if (filter == "all" || filter == actor.info) {
            console.log(filter);

            const klon = temp.cloneNode(true).content;
            klon.querySelector("h2").textContent = actor.fullname;
            klon.querySelector(".movie").textContent = actor.movie;

            klon.querySelector("article").addEventListener("click", () => showPopUp(actor));

            listPointer.appendChild(klon);
        };
    })
}

let popUp = document.querySelector("#popup");
//Luk PopUppen ved click på luk
document.querySelector("#luk").addEventListener("click", () => popup.style.display = "none");

//Vis PopUppen i detaljer FRA API 
function showPopUp(actor) {
    console.log(actor);

    popup.style.display = "block";
    popup.querySelector("h2").textContent = actor.fullname;
    popup.querySelector(".movie").textContent = actor.movie;
}

function addEventListenerToButtons() {
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.addEventListener("click", filterBTNs);
    });
}

function filterBTNs() {
    filter = this.dataset.actor;
    document.querySelector("h1").textContent = this.innerHTML;
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.classList.remove("active");
    })
    this.classList.add("active");

    buttonActive = document.querySelector("button.filter.active");

    show(json);
}

getData();