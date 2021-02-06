function inicio() {
    header();
    cargar("autor");
    cargarNav();
    cargar("pista");
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

    var nodoHeader = document.createElement("div");
    nodoHeader.className = "track-header";
    nodoContent.appendChild(nodoHeader);

    var nodoButton = document.createElement("button");
    var nodoSpan = document.createElement("span");
    nodoSpan.className = "material-icons";
    nodoSpan.textContent = "play_arrow";
    nodoButton.appendChild(nodoSpan);
    nodoHeader.appendChild(nodoButton);

    var nodoInfo = document.createElement("div")
    nodoInfo.className = "track-info";

    var nodoAlbName = document.createElement("a");
    nodoAlbName.className = "album-name";
    nodoAlbName.href = "album.html";

    var nodoTrackName = document.createElement("div")
    nodoTrackName.className = "track-name";
    nodoTrackName.textContent = item.nombre;
    nodoInfo.appendChild(nodoTrackName);
    nodoHeader.appendChild(nodoInfo);

    var nodoTrackWave = document.createElement("div");
    nodoTrackWave.className = "track-wave";
    nodoTrackWave.textContent = "Ruta del archivo";
    nodoContent.appendChild(nodoTrackWave);

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
}

function insertarAlbum(item) {

}

window.onload = inicio;