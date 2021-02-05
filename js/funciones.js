function cargar(tabla) {
    console.log(tabla);
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
                    switch (tabla) {
                        case "album":
                            insertarListaAlbum(valores[item]);
                            break;
                        case "autor":
                            if (valores[item].autor == localStorage.getItem("autor")) {
                                insertarInfo(valores[item]);
                            }
                            break;
                        case "lista":
                            break;
                        case "pista":
                            if (valores[item].autor == localStorage.getItem("autor"))
                                insertarPistas(valores[item]);
                            break;
                        case "concierto":
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

function cargarNav() {
    var nodoNav = document.getElementById("nav");
    var pestañas = ["Todo", "Álbumes", "Conciertos", "Listas"];
    var tablas = ["pista", "album", "concierto", "lista"];

    for (var i = 0; i < 4; i++) {
        var nodo = document.createElement("div");
        nodo.textContent = pestañas[i];
        nodo.className = tablas[i];
        nodo.addEventListener("click", function () {
            cargar(this.className);
        });
        nodoNav.appendChild(nodo);
    }
}

function insertarListaAlbum(item) {
    var lista = document.getElementById("album-list");
    console.log("a");
    var nodoAlbum = document.createElement("div");
    nodoAlbum.className = "album";

    var enlaceImg = document.createElement("a");
    enlaceImg.href = "album.html";
    enlaceImg.addEventListener("click", function () {
        localStorage.setItem("album", item.nombre);
    });

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
    enlaceArtist.addEventListener("click", function () {
        localStorage.setItem("autor", item.autor);
    });
    var nodoTexto = document.createTextNode(item.autor);
    enlaceArtist.appendChild(nodoTexto);

    nodoArtist.appendChild(enlaceArtist);
    nodoInfo.appendChild(nodoArtist);

    var nodoName = document.createElement("div");
    nodoName.className = "album-name";

    var enlaceAlbum = document.createElement("a");
    enlaceAlbum.href = "album.html";
    enlaceAlbum.addEventListener("click", function () {
        localStorage.setItem("album", item.nombre);
    });

    var nodoTexto = document.createTextNode(item.nombre);
    enlaceAlbum.appendChild(nodoTexto);

    nodoName.appendChild(enlaceAlbum);
    nodoInfo.appendChild(nodoName);

    nodoContent.appendChild(nodoInfo);
    nodoAlbum.appendChild(nodoContent);

    lista.appendChild(nodoAlbum);
}

function insertarInfo(item) {
    var container = document.getElementById("container-artist");
    container.style.backgroundImage = "url('" + item.fondo_perfil + "')";
    console.log(item.fondo_perfil);

    var nodoImg = document.createElement("img");
    nodoImg.src = item.foto_perfil;
    nodoImg.className = "img";
    nodoImg.alt = "Foto de perfil de " + item.autor;

    container.appendChild(nodoImg);

    var nodoDesc = document.createElement("div");
    nodoDesc.className = "desc";

    var nodoName = document.createElement("div");
    nodoName.className = "name";
    nodoName.textContent = item.autor;
    nodoDesc.appendChild(nodoName);

    var nodoInfo = document.createElement("div");
    nodoInfo.className = "info";
    var generos = item.generos.split(",");
    generos.forEach(x => {
        nodoInfo.textContent += "#" + x + " ";
    });
    nodoDesc.appendChild(nodoInfo);

    container.appendChild(nodoDesc);
}

function insertarPistas(item) {
    var track = document.getElementById("track");
    //track.insertBefore(img,track.childNodes[0]);

    var nodoContent = document.createElement("div").className="track-content";
    var nodoHeader = document.createElement("div").className="track-header";
    var nodoButton = document.createElement("button");
    var nodoSpan = document.createElement("span").className="material-icons";
    nodoSpan.textContent="play_arrow";
    nodoButton.appendChild(nodoSpan);
    nodoHeader.appendChild(nodoButton);

    var nodoInfo=document.createElement("div").className="track-info";
    var nodoArtName=document.createElement("div").className="artist-name";

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