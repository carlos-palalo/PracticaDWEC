function header(origen) {
    var header = document.getElementById("header");

    var container = document.createElement("div");
    container.className = "container";
    header.appendChild(container);

    var logo = document.createElement("div");
    logo.className = "left";
    container.appendChild(logo);

    var enlace = document.createElement("a");
    enlace.href = "inicio.html";
    enlace.innerText = "Inicio";
    logo.appendChild(enlace);

    var head = document.createElement("div");
    head.id = "head";
    head.className = "right";
    container.appendChild(head);

    var search = document.createElement("div");
    search.id = "search";
    head.appendChild(search);

    var resultado = document.createElement("div");
    resultado.id = "resultado";
    search.appendChild(resultado);
    $(function () {
        $("#resultado").hide();
    })

    var form = document.createElement("form");
    search.appendChild(form);

    var input = document.createElement("input");
    input.id = "buscador";
    input.type = "text";
    input.placeholder = "Buscar artista o album";
    input.autocomplete = "off";
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
        if (origen != "cuenta") {
            nodoEnlace.href = "cuenta.html";
            nodoEnlace.innerText="Mi Cuenta";
        } else {
            nodoEnlace.href = "inicio.html";
            nodoEnlace.innerText="Cerrar Sesión";
            nodoEnlace.addEventListener("click",function(){
                localStorage.removeItem("idUser");
                localStorage.removeItem("user");
            });
        }
        head.appendChild(nodoEnlace);
    } else {
        var nodoEnlace = document.createElement("a");
        nodoEnlace.href = "login.html";

        var texto = document.createTextNode("Iniciar Sesión");

        nodoEnlace.appendChild(texto);
        head.appendChild(nodoEnlace);
    }

    if (sessionStorage.getItem("buscador") != undefined) {
        sessionStorage.removeItem("buscador");
    }
    cargar("album", "buscador");
    cargar("autor", "buscador");

    document.getElementById("buscador").addEventListener("keyup", buscar);
}

function jsonSearch(array, tabla) {
    //console.log(array);
    var obj = [];
    if (sessionStorage.getItem("buscador") != undefined) {
        obj = JSON.parse(sessionStorage.getItem("buscador"));
    }

    array.forEach(x => {
        switch (tabla) {
            case "album":
                obj.push({ album: x.nombre });
                break;
            case "autor":
                obj.push({ autor: x.autor });
                break;
        }
    })
    sessionStorage.setItem("buscador", JSON.stringify(obj));
}