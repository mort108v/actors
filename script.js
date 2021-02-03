let json;

let temp = document.querySelector("template");

let filter = "alle";

let listPointer = document.querySelector("#container");

let buttonActive = document.querySelector("button.filter.active");
console.log(buttonActive);

document.addEventListener("DOMContentLoaded", hentdata);

const link = "actors.js";

async function hentdata() {
    const respons = await fetch(link);
    json = await respons.json();
    addEventListenerToButtons();
    show(json);
}

function show() {

    listPointer.innerHTML = "";

    //løb igennem array "actors"
    json.forEach(actor => {

        if (filter == "alle" || filter == actor.categories[0]) {
            console.log(filter);

            const klon = temp.cloneNode(true).content;

            klon.querySelector(".pic").src = actor.gsx$pic.$t;
            klon.querySelector(".navn").textContent = fag.title.rendered;
            klon.querySelector(".indhold").addEventListener("click", function() {
                fagClick(fag.id)
            });

    })
}

function fagClick(id) {
    console.log("ID", id);
    window.location.href = "singleview_fag.html?id=" + id;
}

function addEventListenerToButtons() {
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.addEventListener("click", filterBTNs);
    });
}

function filterBTNs() {
    filter = this.dataset.fag;
    document.querySelector("h1").textContent = this.innerHTML;
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.classList.remove("active");
    })
    this.classList.add("active");

    buttonActive = document.querySelector("button.filter.active");

    show(json);
}

hentdata();