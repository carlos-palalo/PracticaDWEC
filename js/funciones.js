function cargar(tabla) {
    if (window.indexedDB) {
        peticion = window.indexedDB.open("musica");

        peticion.onsuccess = function (evento) {
            console.log("Sucess");

            var bd = evento.target.result;
            var transaccion = bd.transaction(bd.objectStoreNames, "readwrite");
            var almacen = transaccion.objectStore(tabla);

            var peticion = almacen.getAll();
            peticion.onsuccess = function () {
                var valores = peticion.result;

                for (item in valores) {
                    insertarElemento(valores[item], tabla);
                    switch ("tabla") {
                        case 0:
                            break;
                    }
                }
            }
            bd.close();
        };
        peticion.onerror = function (evento) {
            alert("No se ha creado la base de datos: " + evento.target.errorCode);
        };
        peticion.onupgradeneeded = function (evento) {
            console.log("Upgradeneeded");
        };
    } else {
        console.log("IndexedDB no está soportado");
    }
}

function insertarElemento(item) {
    var lista = document.getElementById("album-list");

    var nodoAlbum = document.createElement("div");
    nodoAlbum.className = "album";

    var enlaceImg = document.createElement("a");
    enlaceImg.href = "album.html";

    var nodoImgAlbum = document.createElement("div");
    nodoImgAlbum.className = "album-img";

    var nodoImg = document.createElement("img");
    nodoImg.src = item.caratula;
    nodoImg.alt = item.nombre;

    nodoImgAlbum.appendChild(nodoImg);
    enlaceImg.appendChild(nodoImgAlbum);
    nodoAlbum.appendChild(enlaceImg);

    var nodoContent = document.createElement("div");
    nodoContent.className = "album-content";

    var nodoInfo = document.createElement("div");
    nodoInfo.className = "album-info";

    var nodoArtist = document.createElement("div");
    nodoArtist.className = "artist-name";

    var enlaceArtist = document.createElement("a");
    enlaceArtist.href = "artist.html";
    var nodoTexto = document.createTextNode(item.autor);
    enlaceArtist.appendChild(nodoTexto);

    nodoArtist.appendChild(enlaceArtist);
    nodoInfo.appendChild(nodoArtist);

    var nodoName = document.createElement("div");
    nodoName.className = "album-name";

    var enlaceAlbum = document.createElement("a");
    enlaceAlbum.href = "album.html";
    var nodoTexto = document.createTextNode(item.nombre);
    enlaceAlbum.appendChild(nodoTexto);

    nodoName.appendChild(enlaceAlbum);
    nodoInfo.appendChild(nodoName);

    nodoContent.appendChild(nodoInfo);
    nodoAlbum.appendChild(nodoContent);

    lista.appendChild(nodoAlbum);
}

function eliminar(nombre, id, rango) {
    if (window.indexedDB) {
        peticion = window.indexedDB.open("musica");

        peticion.onsuccess = function (evento) {
            console.log("Success");

            bd = evento.target.result;
            transaccion = bd.transaction(bd.objectStoreNames, "readwrite");
            almacen = transaccion.objectStore(nombre);

            if (rango == 0) {
                var peticionEliminacion = almacen.delete(id);
            } else {
                //var rango = IDBKeyRange.bound(7, 34);
                peticionEliminacion = almacen.delete(rango);
            }

            peticionEliminacion.onsuccess = function () {
                console.log("FIN Eliminación");
            }
            bd.close();
        }
        peticion.onerror = function (evento) {
            alert("No se ha creado la base de datos: " + evento.target.errorCode);
        };
        peticion.onupgradeneeded = function (evento) {
            console.log("Upgradeneeded");
        };
    } else {
        console.log("IndexedDB no está soportado");
    }
}