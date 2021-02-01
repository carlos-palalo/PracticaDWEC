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
    var objAlbum=cargar("album");
    var objAutor=cargar("autor");
    var objAutorAlbum=cargar("autorAlbum");
    console.log(objAutorAlbum);
    crearLista(objAlbum,objAutor,objAutorAlbum);
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