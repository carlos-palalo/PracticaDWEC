function header() {
    var header = document.getElementById("header");

    var container = document.createElement("div");
    container.className = "container";
    header.appendChild(container);

    var logo = document.createElement("div");
    logo.className = "left";
    container.appendChild(logo);

    var enlace = document.createElement("a");
    enlace.href = "index.html";
    enlace.innerText = "Logo";
    logo.appendChild(enlace);

    var head = document.createElement("div");
    head.id = "head";
    head.className = "right";
    container.appendChild(head);

    var search = document.createElement("div");
    search.id = "search";
    head.appendChild(search);

    var form = document.createElement("form");
    search.appendChild(form);

    var input = document.createElement("input");
    input.id = "buscador";
    input.type = "text";
    input.placeholder = "Buscar artista o album";
    form.appendChild(input);

    var button = document.createElement("button");
    button.type = "submit";
    form.appendChild(button);

    var span = document.createElement("span");
    span.className = "material-icons";
    span.innerText = "search";
    button.appendChild(span);

    if (localStorage.getItem("idUser") != undefined && localStorage.getItem("idUser") != "") {
        var nodoEnlace = document.createElement("a");
        //nodoEnlace.href = "cuenta.html";
        nodoEnlace.href = "";

        var texto = document.createTextNode(localStorage.getItem("user"));

        nodoEnlace.appendChild(texto);

        nodoEnlace.addEventListener("click", function () {
            localStorage.removeItem("user");
            localStorage.removeItem("idUser");
        });

        head.appendChild(nodoEnlace);
    } else {
        var nodoEnlace = document.createElement("a");
        nodoEnlace.href = "login.html";

        var texto = document.createTextNode("Iniciar Sesión");

        nodoEnlace.appendChild(texto);
        head.appendChild(nodoEnlace);
    }

    if (localStorage.getItem("buscador") != undefined) {
        localStorage.removeItem("buscador");
    }
    cargar("album", "buscador");
    cargar("autor", "buscador");
}

function jsonSearch(array, tabla) {
    //console.log(array);
    var obj = [];
    if (localStorage.getItem("buscador") != undefined) {
        obj = JSON.parse(localStorage.getItem("buscador"));
    }

    array.forEach(x => {
        switch (tabla) {
            case "album":
                obj.push({ album: x.nombre });
                break;
            case "autor":
                obj.push({ artist: x.autor });
                break;
        }
    })
    localStorage.setItem("buscador", JSON.stringify(obj));
}