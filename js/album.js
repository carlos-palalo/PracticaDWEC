function inicio() {
    header();
    cargar("album", "album");
}

window.onload = inicio;

function insertarInfo(item) {
    var container = document.getElementById("container-album")

    var info = document.createElement("div");
    info.className = "info";
    container.appendChild(info);

    var autor = document.createElement("a");
    autor.href = "autor.html";
    autor.className = "autor";
    autor.innerText = item.autor;
    info.appendChild(autor);

    var album = document.createElement("div");
    album.className = "album";
    album.innerText = item.nombre;
    info.appendChild(album);

    var pistas = document.createElement("div");
    pistas.className = "pistas";
    info.appendChild(pistas);

    var num = document.createElement("div");
    num.id = "num";
    num.innerText = "0";
    pistas.appendChild(num);

    var div = document.createElement("div");
    div.innerText = "PISTAS";
    pistas.appendChild(div);

    var contImg = document.createElement("a");
    contImg.href = "album.html";
    contImg.className = "album-img";
    container.appendChild(contImg);

    var img = document.createElement("img");
    img.src = item.caratula;
    contImg.appendChild(img);

    cargarPistas(item.id);
}

function cargarPistas(id) {
    var lista = document.getElementById("lista");

    if (window.indexedDB) {
        peticion = window.indexedDB.open("musica");

        peticion.onsuccess = function (evento) {
            console.log("Success Pista");

            var bd = evento.target.result;
            var transaccion = bd.transaction(bd.objectStoreNames, "readwrite");
            var almacen = transaccion.objectStore("pista");

            var peticionGetAll = almacen.getAll();

            peticionGetAll.onsuccess = function () {
                var valores = peticionGetAll.result;
                var cont = 1;
                for (pista in valores) {
                    if (valores[pista].idAlbum == id) {
                        var cancion = document.createElement("div");
                        cancion.className = "cancion";
                        lista.appendChild(cancion);

                        var num = document.createElement("div");
                        num.className = "num";
                        num.innerText = cont + ".-";
                        cancion.appendChild(num);

                        var name = document.createElement("div");
                        name.className = "name";
                        name.innerText = valores[pista].nombre;
                        cancion.appendChild(name);

                        var audio = document.createElement("audio");
                        audio.src = valores[pista].archivo;
                        audio.preload = "none";
                        audio.controls = "true";
                        cancion.appendChild(audio);
                        cont++;
                    }
                }
                document.getElementById("num").innerText = cont-1;
            }
        }
        peticion.onerror = function (evento) {
            console.log("No se ha creado la base de datos " + evento.target.errorCode);
        }
    } else {
        console.log("IndexedDB no está soportado");
    }
};

$(function () {
    $('audio').on("play", function (current) {
        $('audio').each(function (i, event) {
            if (event !== current.currentTarget) {
                this.pause();
                this.currentTime = 0;
            }
        });
    });
})