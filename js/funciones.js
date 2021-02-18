function cargar(tabla, origen) {
    //console.log(tabla);
    if (origen == "artist") {
        document.getElementById("lista").innerHTML = "";
    }

    if (window.indexedDB) {
        peticion = window.indexedDB.open("musica");

        peticion.onsuccess = function (evento) {
            console.log("Sucess " + tabla);

            var bd = evento.target.result;
            var transaccion = bd.transaction(bd.objectStoreNames, "readwrite");
            var almacen = transaccion.objectStore(tabla);

            var peticion = almacen.getAll();
            peticion.onsuccess = function () {
                var valores = peticion.result;

                if (origen == "buscador") {
                    jsonSearch(valores, tabla);
                } else
                    for (item in valores) {
                        switch (tabla) {
                            case "album":
                                switch (origen) {
                                    case "artist":
                                        if (valores[item].autor == localStorage.getItem("autor"))
                                            insertarListaAlbum(valores[item]);
                                        break;
                                    case "album":
                                        if (valores[item].nombre == localStorage.getItem("album"))
                                            insertarInfo(valores[item]);
                                        break;
                                    case "cuenta":
                                        if (localStorage.getItem("user") == "Admin") {
                                            cargarTabla(valores[item]);
                                        } else if (valores[item].autor == localStorage.getItem("autor")) {
                                            cargarTabla(valores[item]);
                                        }
                                        break;
                                    default:
                                        insertarListaAlbum(valores[item]);
                                        break;
                                }
                                break;
                            case "autor":
                                if (origen == "cuenta") {
                                    if (localStorage.getItem("user") == "Admin") {
                                        cargarTabla(valores[item]);
                                    } else if (valores[item].autor == localStorage.getItem("autor")) {
                                        cargarTabla(valores[item]);
                                    }
                                } else {
                                    if (valores[item].autor == localStorage.getItem("autor")) {
                                        insertarInfo(valores[item]);
                                    }
                                }
                                break;
                            case "lista":
                                if (origen == "cuenta") {
                                    if (localStorage.getItem("user") == "Admin") {
                                        cargarTabla(valores[item]);
                                    } else if (valores[item].autor == localStorage.getItem("autor")) {
                                        cargarTabla(valores[item]);
                                    }
                                } else {
                                    if (valores[item].autor == localStorage.getItem("autor")) {
                                        insertarListas(valores[item]);
                                    }
                                }
                                break;
                            case "pista":
                                if (origen == "cuenta") {
                                    if (localStorage.getItem("user") == "Admin") {
                                        cargarTabla(valores[item]);
                                    } else if (valores[item].autor == localStorage.getItem("autor")) {
                                        cargarTabla(valores[item]);
                                    }
                                } else {
                                    if (valores[item].autor == localStorage.getItem("autor")) {
                                        insertarPistas(valores[item]);
                                    }
                                }
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

function insertarListaAlbum(item) {
    var lista = document.getElementById("lista");
    lista.className = "album-list";
    var nodoAlbum = document.createElement("div");
    nodoAlbum.className = "album-container";

    var enlaceImg = document.createElement("a");
    enlaceImg.href = "album.html";
    enlaceImg.addEventListener("click", function () {
        localStorage.setItem("album", item.nombre);
        localStorage.setItem("autor", item.autor);
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
    enlaceArtist.href = "autor.html";
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
        localStorage.setItem("autor", item.autor);
    });

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

function leerCookie(clave) {
    var resultado = "";
    var busqueda = clave + "=";

    var listCookies = document.cookie.split(';');
    var par = "";

    for (var i = 0; i < listCookies.length; i++) {
        par = listCookies[i]; //Cada elemento del array de cookies: nombre de la cookie y carácter =

        //Se quitan los espacios en blanco 
        while (par.charAt(0) == ' ') {
            par = par.substring(1);
        }

        //Se compara los que buscamos con el elemento del array. Si devuelve como índice 0 se ha encontrado
        if (par.indexOf(busqueda) == 0) {
            resultado = par.substring(busqueda.length, par.length);
        }
    }
    return resultado;
}

function eliminarCookie(clave) {
    //document.cookie = clave + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = clave + "=; max-age=0";
}

function configurarAudio() {
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
}