function inicio() {
    var nodoHead = document.getElementById("head");
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

        nodoHead.appendChild(nodoEnlace);
    } else {
        var nodoEnlace = document.createElement("a");
        nodoEnlace.href = "login.html";
        
        var texto = document.createTextNode("Iniciar Sesión");

        nodoEnlace.appendChild(texto);
        nodoHead.appendChild(nodoEnlace);
    }
    cargar("album");
}

function crearLista(jsonAlbum, jsonAutor, jsonAutorAlbum) {
    
}
window.onload = inicio;