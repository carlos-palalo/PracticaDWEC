function inicio() {
    cargarAlbum();
    var nodoHead = document.getElementById("head");
    if (localStorage.getItem("idUser") != undefined && localStorage.getItem("idUser") != "") {
        var nodoEnlace = document.createElement("a");
        nodoEnlace.href="cuenta.html";
        
        var texto = document.createTextNode(localStorage.getItem("user"));
        
        nodoEnlace.appendChild(texto);
        nodoHead.appendChild(nodoEnlace);
    }else{
        var nodoEnlace = document.createElement("a");
        nodoEnlace.href ="login.html";
        
        var texto = document.createTextNode("Iniciar Sesión");
        
        nodoEnlace.appendChild(texto);
        nodoHead.appendChild(nodoEnlace);
    }
}

function cargarAlbum() {
    var jsonAlbum = [];
    if (window.indexedDB) {
        peticion = window.indexedDB.open("musica");

        peticion.onsuccess = function (evento) {
            console.log("Sucess");

            var bd = evento.target.result;
            var transaccion = bd.transaction(bd.objectStoreNames, "readwrite");
            var almacenAlbum = transaccion.objectStore("album");

            var peticionAlbum = almacenAlbum.openCursor();
            peticionAlbum.onsuccess = function () {
                var cursorAlbum = peticionAlbum.result;

                if (cursorAlbum) {
                    jsonAlbum.push(cursorAlbum.value);
                    cursorAlbum.continue(); //continue incrementa el cursor una posición
                } else {
                    //console.log("JSON Album: " + jsonAlbum);
                    console.log("FIN Album");
                    cargarAutor(jsonAlbum);
                    //localStorage.setItem("jsonAlbum", jsonAlbum);
                }
            }
        };
        peticion.onerror = function (evento) {
            alert("No se ha creado la base de datos: " + evento.target.errorCode);
        };
    } else {
        console.log("IndexedDB no está soportado");
    }
}

function cargarAutor(jsonAlbum) {
    var jsonAutor = [];
    if (window.indexedDB) {
        peticion = window.indexedDB.open("musica");

        peticion.onsuccess = function (evento) {
            console.log("Sucess");

            var bd = evento.target.result;
            var transaccion = bd.transaction(bd.objectStoreNames, "readwrite");
            var almacenAutor = transaccion.objectStore("autor");

            var peticionAutor = almacenAutor.openCursor();
            peticionAutor.onsuccess = function () {
                var cursorAutor = peticionAutor.result;

                if (cursorAutor) {
                    jsonAutor.push({ "id": cursorAutor.value.id, "nombre": cursorAutor.value.nombre });
                    cursorAutor.continue(); //continue incrementa el cursor una posición
                } else {
                    //console.log("JSON Autor: " + jsonAutor);
                    console.log("FIN Autor");
                    cargarAutorAlbum(jsonAlbum, jsonAutor);
                    //localStorage.setItem("jsonAutor", jsonAutor);
                }
            }
        };
        peticion.onerror = function (evento) {
            alert("No se ha creado la base de datos: " + evento.target.errorCode);
        };
    } else {
        console.log("IndexedDB no está soportado");
    }
}

function cargarAutorAlbum(jsonAlbum, jsonAutor) {
    var jsonAutorAlbum = [];
    if (window.indexedDB) {
        peticion = window.indexedDB.open("musica");

        peticion.onsuccess = function (evento) {
            console.log("Sucess");

            var bd = evento.target.result;
            var transaccion = bd.transaction(bd.objectStoreNames, "readwrite");
            var almacenAutorAlbum = transaccion.objectStore("autorAlbum");

            var peticionAutorAlbum = almacenAutorAlbum.openCursor();
            peticionAutorAlbum.onsuccess = function () {
                var cursorAutorAlbum = peticionAutorAlbum.result;

                if (cursorAutorAlbum) {
                    jsonAutorAlbum.push(cursorAutorAlbum.value);
                    cursorAutorAlbum.continue(); //continue incrementa el cursor una posición
                } else {
                    //console.log("JSON AutorAlbum: " + jsonAutorAlbum);
                    console.log("FIN AutorAlbum");
                    crearLista(jsonAlbum, jsonAutor, jsonAutorAlbum);
                    //localStorage.setItem("jsonAutorAlbum", jsonAutorAlbum);
                }
            }
        };
        peticion.onerror = function (evento) {
            alert("No se ha creado la base de datos: " + evento.target.errorCode);
        };
    } else {
        console.log("IndexedDB no está soportado");
    }
}

function crearLista(jsonAlbum, jsonAutor, jsonAutorAlbum) {
    var lista = document.getElementById("album-list");
    jsonAutorAlbum.forEach(x => {
        //console.log(x);
        jsonAlbum.forEach(y => {
            if (x.idAlbum == y.id) {
                //console.log(y);
                jsonAutor.forEach(z => {
                    if (x.idAutor == z.id) {
                        console.log(y.id + " " + y.nombre + " " + y.caratula + " | " + z.id + " " + z.nombre);

                        var nodoAlbum = document.createElement("div");
                        nodoAlbum.className = "album";

                        var enlaceImg = document.createElement("a");
                        enlaceImg.href = "album.html";
                        
                        var nodoImgAlbum = document.createElement("div");
                        nodoImgAlbum.className = "album-img";

                        var nodoImg = document.createElement("img");
                        nodoImg.src = y.caratula;
                        nodoImg.alt = y.nombre;

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
                        var nodoTexto = document.createTextNode(z.nombre);
                        enlaceArtist.appendChild(nodoTexto);

                        nodoArtist.appendChild(enlaceArtist);
                        nodoInfo.appendChild(nodoArtist);

                        var nodoName = document.createElement("div");
                        nodoName.className = "album-name";
                        
                        var enlaceAlbum = document.createElement("a");
                        enlaceAlbum.href = "album.html";
                        var nodoTexto = document.createTextNode(y.nombre);
                        enlaceAlbum.appendChild(nodoTexto);

                        nodoName.appendChild(enlaceAlbum);
                        nodoInfo.appendChild(nodoName);

                        nodoContent.appendChild(nodoInfo);
                        nodoAlbum.appendChild(nodoContent);

                        lista.appendChild(nodoAlbum);
                    }
                });
            }
        });
    });
}
window.onload = inicio;