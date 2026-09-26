const encounters = [] // TODO: get encounters for this location from backend

const popup = document.getElementsByClassName("leaflet-popup-content")[0];

function CreateDiv(photo, date, comment) {
    const d = document.createElement("div");
    const i = document.createElement("img");
    i.src = photo;
    const date_label = document.createElement("span");
    date_label.innerText = date;
    const comment_label = document.createElement("i");
    comment_label.innerText = comment;


    d.appendChild(i);
    d.appendChild(date_label);
    d.appendChild(comment_label);
    popup.appendChild(d);
}

for (let i = 0; i < encounters.length; i++) {
    const encounter = encounters[i];
    CreateDiv(encounter.photo, encounter.date, encounter.comment); // TODO: format this properly
}