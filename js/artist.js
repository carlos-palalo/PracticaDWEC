function inicio() {
    header();
    cargar("autor");
    cargarNav();
    cargar("pista");
}

function cargarNav() {
    var nodoNav = document.getElementById("nav");
    var pestañas = [["Todo", "pista"], ["Álbumes", "album"], ["Listas", "lista"]];
    //var tablas = ["pista", "album", "lista"];

    for (var i = 0; i < pestañas.length; i++) {
        var nodo = document.createElement("div");
        nodo.textContent = pestañas[i][0];
        nodo.className = pestañas[i][1];
        nodo.addEventListener("click", function () {
            cargar(this.className, "artist");

        });
        nodoNav.appendChild(nodo);
    }
}

function insertarInfo(item) {
    var container = document.getElementById("container-artist");
    container.style.backgroundImage = "url('" + item.fondo_perfil + "')";

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
    var lista = document.getElementById("lista");
    lista.className = "album-list";
    var track = document.createElement("div");
    track.className = "track";
    lista.appendChild(track);

    var nodoImg = document.createElement("a");
    nodoImg.className = "track-img";
    nodoImg.href = "album.html";
    track.appendChild(nodoImg);

    var nodoContent = document.createElement("div");
    nodoContent.className = "track-content";
    track.appendChild(nodoContent);

    var nodoInfo = document.createElement("div")
    nodoInfo.className = "track-info";

    var nodoAlbName = document.createElement("a");
    nodoAlbName.className = "album-name";
    nodoAlbName.href = "album.html";

    var nodoTrackName = document.createElement("div")
    nodoTrackName.className = "track-name";
    nodoTrackName.textContent = item.nombre;
    nodoInfo.appendChild(nodoTrackName);
    nodoContent.appendChild(nodoInfo);

    var audio = document.createElement("audio");
    audio.src = item.archivo;
    audio.preload = "none";
    audio.controls = "true";
    nodoContent.appendChild(audio);

    if (window.indexedDB) {
        peticion = window.indexedDB.open("musica");

        peticion.onsuccess = function (evento) {
            console.log("Success Pista");

            var bd = evento.target.result;

            var transaccion = bd.transaction(bd.objectStoreNames, "readwrite");
            var almacenLibros = transaccion.objectStore("album");

            var peticionGetAll = almacenLibros.getAll(item.idAlbum);

            peticionGetAll.onsuccess = function () {
                var valores = peticionGetAll.result;
                for (album in valores) {
                    nodoAlbName.textContent = valores[album].nombre;
                    nodoInfo.insertBefore(nodoAlbName, nodoInfo.childNodes[0]);

                    nodoImg.style.backgroundImage = "url('" + valores[album].caratula + "')";
                    nodoImg.addEventListener("click", function () {
                        localStorage.setItem("album", valores[album].nombre);
                    });
                    break;
                }
            }

        }
        peticion.onerror = function (evento) {
            console.log("No se ha creado la base de datos " + evento.target.errorCode);
        }
    } else {
        console.log("IndexedDB no está soportado");
    }

    configurarAudio();
}

function insertarListas(item) {
    var nodoLista = document.getElementById("lista");
    nodoLista.removeAttribute("class");

    var lista = document.createElement("div");
    lista.className = "lista-item";
    nodoLista.appendChild(lista);

    var nombre = document.createElement("div");
    nombre.innerText = item.nombre;
    lista.appendChild(nombre);

    var fecha = document.createElement("div");
    fecha.className = "fecha";
    fecha.innerText = item.fecha;
    lista.appendChild(fecha);

    var nodoPistas = document.createElement("div");
    nodoPistas.className = "pistas";
    nodoLista.appendChild(nodoPistas);

    var pistas = item.pistas.split(",");

    var cont = 0;
    pistas.forEach(x => {
        if (window.indexedDB) {
            peticion = window.indexedDB.open("musica");
            peticion.onsuccess = function (evento) {
                console.log("Success Pista");

                var bd = evento.target.result;

                var transaccion = bd.transaction(bd.objectStoreNames, "readwrite");
                var almacen = transaccion.objectStore("pista");

                var peticionGetAll = almacen.getAll(parseInt(x));

                peticionGetAll.onsuccess = function () {
                    var item = peticionGetAll.result;

                    var pista = document.createElement("div");
                    pista.className = "cancion";
                    nodoPistas.appendChild(pista);

                    var num = document.createElement("div");
                    num.className = "num";
                    num.innerText = ++cont;
                    pista.appendChild(num);

                    var cancion = document.createElement("div");
                    cancion.className = "name";
                    cancion.innerText = item[0].nombre;
                    pista.appendChild(cancion);

                    var audio = document.createElement("audio");
                    audio.src = item[0].archivo;
                    audio.preload = "none";
                    audio.controls = "true";
                    pista.appendChild(audio);

                    configurarAudio();
                }

            }
            peticion.onerror = function (evento) {
                console.log("No se ha creado la base de datos " + evento.target.errorCode);
            }
        } else {
            console.log("IndexedDB no está soportado");
        }
    })
}

window.onload = inicio;