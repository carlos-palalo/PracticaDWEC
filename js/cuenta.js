function cuenta() {
    header("cuenta");
    cargarNav();
    cargarForm("autor");
    cargar("autor", "cuenta");
}

window.onload = cuenta;

function cargarNav() {
    var nodoNav = document.getElementById("nav");
    if (localStorage.getItem("user") == "Admin") {
        var pestañas = [["Autores", "autor"], ["Álbumes", "album"], ["Pistas", "pista"], ["Listas", "lista"]];
    } else {
        var pestañas = [["Mi Información", "autor"], ["Álbumes", "album"], ["Pistas", "pista"], ["Listas", "lista"]];
    }

    for (var i = 0; i < pestañas.length; i++) {
        var nodo = document.createElement("div");
        nodo.textContent = pestañas[i][0];
        nodo.className = pestañas[i][1];
        nodo.addEventListener("click", function () {
            document.getElementById("thead").innerHTML = "";
            document.getElementById("tbody").innerHTML = "";
            cargarForm(this.className);
            cargar(this.className, "cuenta");
            //cargar("pista", "lista");
            newlista.innerHTML = "<div class='header'>Arrastre la pista deseada</div>";
        });
        nodoNav.appendChild(nodo);
    }
}

function cargarForm(tabla) {
    document.getElementById("form").innerHTML = "";
    document.getElementById("btn").innerHTML = "";
    var pistas = document.getElementById("pistas");
    pistas.innerHTML = "";
    esconderListas();
    var newlista = document.getElementById("newlista");
    newlista.innerHTML = "";

    switch (tabla) {
        case "autor":
            item = ["id", "autor", "email", "oldpass", "foto_perfil", "fondo_perfil", "generos"];
            break;
        case "album":
            item = ["id", "autor", "nombre", "lanzamiento", "caratula"];
            break;
        case "pista":
            item = ["id", "autor", "nombre", "archivo", "idAlbum"];
            break;
        case "lista":
            item = ["id", "autor", "nombre"];
            mostrarListas();
            crearHeaderPistas();
            //console.log(pistas);
            cargar("pista", "lista");
            newlista.innerHTML = "<div class='header'>Arrastre la pista deseada</div>";
            break;
    }

    var form = document.getElementById("form");

    var hidden = document.createElement("input");
    hidden.id = "tablahide";
    hidden.type = "text";
    hidden.className = tabla;
    hidden.hidden = true;
    form.appendChild(hidden);

    item.forEach(x => {
        var div = document.createElement("div");
        div.className = "item";
        form.appendChild(div);
        var input = document.createElement("input");
        input.id = x;
        div.appendChild(input);

        switch (x) {
            case "id":
                input.placeholder = "Id.";
                input.type = "number";
                input.readOnly = "true";
                break;
            case "autor":
                input.placeholder = "Usuario/Autor";
                input.type = "text";
                break;
            case "email":
                input.placeholder = "Email.";
                input.type = "text";
                break;
            case "oldpass":
                input.placeholder = "Contraseña.";
                input.type = "password";
                break;
            case "foto_perfil":
                input.placeholder = "Foto de perfil.";
                input.type = "text";
                break;
            case "fondo_perfil":
                input.placeholder = "Fondo de perfil.";
                input.type = "text";
                break;
            case "generos":
                input.placeholder = "Generos.";
                input.type = "text";
                break;
            case "nombre":
                input.type = "text";
                input.placeholder = "Nombre.";
                break;
            case "lanzamiento":
                input.type = "number";
                input.placeholder = "Fecha de lanzamiento"
                break;
            case "caratula":
                input.type = "text";
                input.placeholder = "Ruta caratula";
                break;
            case "archivo":
                input.type = "text";
                input.placeholder = "Ruta del archivo";
                break;
            case "idAlbum":
                input.type = "number";
                input.placeholder = "Id del album"
                break;
            case "pistas":
                input.type = "text";
                input.placeholder = "Pistas";
                break;
        }
    });

    var btn = document.getElementById("btn");

    if (hidden.className != "autor" || localStorage.getItem("user") == "Admin") {
        var insertar = document.createElement("button");
        insertar.innerText = "Insertar";
        insertar.id = "insertar";
        insertar.addEventListener("click", function () {
            if (comprobarAutor()) {
                var c = "";
                document.getElementById("newlista").childNodes.forEach(x => {
                    if (x.id != "") {
                        //console.log(x);
                        c += x.id + ",";
                    }
                })
                c = c.slice(0, c.length - 1);
                document.getElementById("listaPistas").value = c;
                //console.log(document.getElementById("listaPistas").value);
                insertarTabla(hidden.className);

                document.getElementById("thead").innerHTML = "";
                document.getElementById("tbody").innerHTML = "";
                cargar(hidden.className, "cuenta");
            } else {
                alert("Por favor, introduce el usuario");
            }
        });
        btn.appendChild(insertar);
    }

    var modificar = document.createElement("button");
    modificar.innerText = "Modificar";
    modificar.id = "modificar";
    modificar.addEventListener("click", function () {
        if (comprobarAutor()) {
            var c = "";
            document.getElementById("newlista").childNodes.forEach(x => {
                if (x.id != "") {
                    //console.log(x);
                    c += x.id + ",";
                }
            })
            c = c.slice(0, c.length - 1);
            document.getElementById("listaPistas").value = c;
            //console.log(document.getElementById("listaPistas").value);
            modificarTabla(hidden.className);

            document.getElementById("thead").innerHTML = "";
            document.getElementById("tbody").innerHTML = "";
            cargar(hidden.className, "cuenta");
        } else {
            alert("Por favor, introduce tu usuario");
        }
    });
    btn.appendChild(modificar);

    var eliminar = document.createElement("button");
    eliminar.innerText = "Eliminar";
    eliminar.id = "eliminar";
    eliminar.addEventListener("click", function () {
        eliminarTabla(hidden.className);

        document.getElementById("thead").innerHTML = "";
        document.getElementById("tbody").innerHTML = "";
        cargar(hidden.className, "cuenta");
    });
    btn.appendChild(eliminar);
}

function crearHeaderPistas() {
    var pistas = document.getElementById("pistas");
    var div = document.createElement("div");
    div.className = "header";
    div.innerText = "Pistas";
    pistas.appendChild(div);
}

function esconderListas() {
    $(function () {
        $("#listas").hide();
    })
}

function mostrarListas() {
    $(function () {
        $("#listas").show();
    })
}

function cargarListas(item) {
    var pistas = document.getElementById("pistas");

    var div = document.createElement("div");
    div.id = item.id;
    div.draggable = "true";
    div.innerText = item.nombre;
    div.addEventListener("dragstart", fase1);
    pistas.appendChild(div);

    //console.log(item);
}

function cargarTabla(item) {
    var thead = document.getElementById("thead");
    var tbody = document.getElementById("tbody");
    var tabla = document.getElementById("tablahide").className;

    //console.log(tabla);
    if (!thead.hasChildNodes()) {
        var tr = document.createElement("tr");
        thead.appendChild(tr);
        cont = 0;
        Object.getOwnPropertyNames(item).forEach(x => {
            var th = document.createElement("th");
            th.innerText = x;
            tr.appendChild(th);
        });
        //console.log(thead);*/
    }

    var tr = document.createElement("tr");
    tbody.appendChild(tr);

    switch (tabla) {
        case "autor":
            propiedades = ["id", "autor", "email", "password", "fecha_creacion", "foto_perfil", "fondo_perfil", "generos"];
            break;
        case "album":
            propiedades = ["id", "autor", "nombre", "lanzamiento", "caratula"];
            break;
        case "pista":
            propiedades = ["id", "autor", "nombre", "archivo", "idAlbum"];
            break;
        case "lista":
            propiedades = ["id", "autor", "nombre", "fecha", "pistas"];
            break;
    }

    propiedades.forEach(x => {
        var td = document.createElement("td");
        td.innerText = item[x];
        tr.appendChild(td);
    });

    //console.log(propiedades);

    jqueryTabla();
}

function insertarTabla(tabla) {
    var request, bd, transaccion, almacen;
    var item = [];

    switch (tabla) {
        case "autor":
            if (!/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(document.getElementById("email").value)) {
                alert("Por favor, introduce un email válido. Formato: email@ejemplo.com");
                return;
            }
            if (!/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,16}$/.test(document.getElementById("oldpass").value)) {
                alert("La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.");
                return;
            }
            item = [{ autor: document.getElementById("autor").value, email: document.getElementById("email").value, password: document.getElementById("oldpass").value, fecha_creacion: new Date().toLocaleDateString(), foto_perfil: document.getElementById("foto_perfil").value, fondo_perfil: document.getElementById("fondo_perfil").value, generos: document.getElementById("generos").value }];
            //console.log(item)
            break;
        case "album":
            if (document.getElementById("nombre").value == "") {
                alert("Por favor, introduce el Nombre");
                document.getElementById("nombre").focus();
                return;
            }
            item = [{ autor: document.getElementById("autor").value, nombre: document.getElementById("nombre").value, lanzamiento: document.getElementById("lanzamiento").value, caratula: document.getElementById("caratula").value }]
            break;
        case "pista":
            if (document.getElementById("nombre").value == "") {
                alert("Por favor, introduce el Nombre");
                document.getElementById("nombre").focus();
                return;
            }
            if (document.getElementById("idAlbum").value == "") {
                alert("Por favor, introduce el id del Album al que pertence");
                document.getElementById("idAlbum").focus();
                return;
            }
            item = [{ autor: document.getElementById("autor").value, nombre: document.getElementById("nombre").value, archivo: document.getElementById("archivo").value, idAlbum: parseInt(document.getElementById("idAlbum").value) }]
            break;
        case "lista":
            if (document.getElementById("nombre").value == "") {
                alert("Por favor, introduce el Nombre");
                document.getElementById("nombre").focus();
                return;
            }
            if (document.getElementById("newlista").children.length < 2) {
                alert("Por faovr, introduce una o varias pistas");
                return;
            }
            item = [{ autor: document.getElementById("autor").value, nombre: document.getElementById("nombre").value, fecha: new Date().toLocaleDateString(), pistas: document.getElementById("listaPistas").value }]
            //console.log(item);
            break;
    }

    if (window.indexedDB) {
        request = window.indexedDB.open("musica");
        //console.log(item[0]);

        request.onsuccess = function (evento) {
            console.log("Success");

            bd = evento.target.result;
            transaccion = bd.transaction(bd.objectStoreNames, "readwrite");

            almacen = transaccion.objectStore(tabla);
            var peticion = almacen.add(item[0]);

            peticion.onsuccess = function () {
                alert("Inserción correcta");
            }

            peticion.onerror = function (evento) {
                alert("Error al insertar: " + evento.target.errorCode);
            };
        };

        request.onerror = function (evento) {
            alert("No se ha creado la base de datos: " + evento.target.errorCode);
        };

        request.onupgradeneeded = function (evento) {
            console.log("Upgradeneeded");
        };

    } else {
        console.log("IndexedDB no está soportado");
    }

}

function modificarTabla(tabla) {
    var request, bd, transaccion, almacen;
    var item = [];

    if (document.getElementById("id").value == "") {
        alert("Por favor, introduce el id");
        return;
    }

    switch (tabla) {
        case "autor":
            if (!/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(document.getElementById("email").value)) {
                alert("Por favor, introduce un email válido. Formato: email@ejemplo.com");
                return;
            }
            if (!/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,16}$/.test(document.getElementById("oldpass").value)) {
                alert("La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.");
                return;
            }
            item = [{ id: parseInt(document.getElementById("id").value), autor: document.getElementById("autor").value, email: document.getElementById("email").value, password: document.getElementById("oldpass").value, fecha_creacion: new Date().toLocaleDateString(), foto_perfil: document.getElementById("foto_perfil").value, fondo_perfil: document.getElementById("fondo_perfil").value, generos: document.getElementById("generos").value }];
            break;
        case "album":
            if (document.getElementById("nombre").value == "") {
                alert("Por favor, introduce el Nombre");
                document.getElementById("nombre").focus();
                return;
            }
            item = [{ id: parseInt(document.getElementById("id").value), autor: document.getElementById("autor").value, nombre: document.getElementById("nombre").value, lanzamiento: document.getElementById("lanzamiento").value, caratula: document.getElementById("caratula").value }]
            break;
        case "pista":
            if (document.getElementById("nombre").value == "") {
                alert("Por favor, introduce el Nombre");
                document.getElementById("nombre").focus();
                return;
            }
            if (document.getElementById("idAlbum").value == "") {
                alert("Por favor, introduce el id del Album al que pertence");
                document.getElementById("idAlbum").focus();
                return;
            }
            item = [{ id: parseInt(document.getElementById("id").value), autor: document.getElementById("autor").value, nombre: document.getElementById("nombre").value, archivo: document.getElementById("archivo").value, idAlbum: parseInt(document.getElementById("idAlbum").value) }]
            break;
        case "lista":
            if (document.getElementById("nombre").value == "") {
                alert("Por favor, introduce el Nombre");
                document.getElementById("nombre").focus();
                return;
            }
            if (document.getElementById("newlista").children.length < 2) {
                alert("Por faovr, introduce una o varias pistas");
                return;
            }
            item = [{ id: parseInt(document.getElementById("id").value), autor: document.getElementById("autor").value, nombre: document.getElementById("nombre").value, fecha: new Date().toLocaleDateString(), pistas: document.getElementById("listaPistas").value }]
            break;
    }

    if (window.indexedDB) {
        request = window.indexedDB.open("musica");
        console.log(item[0]);

        request.onsuccess = function (evento) {
            console.log("Success");

            bd = evento.target.result;
            transaccion = bd.transaction(bd.objectStoreNames, "readwrite");

            almacen = transaccion.objectStore(tabla);
            var peticion = almacen.put(item[0]);

            peticion.onsuccess = function () {
                alert("Modificación correcta");
            }

            peticion.onerror = function (evento) {
                alert("Error al Modificar: " + evento.target.errorCode);
            };
        };

        request.onerror = function (evento) {
            alert("No se ha creado la base de datos: " + evento.target.errorCode);
        };

        request.onupgradeneeded = function (evento) {
            console.log("Upgradeneeded");
        };
    } else {
        console.log("IndexedDB no está soportado");
    }
}

function eliminarTabla(tabla) {
    var peticion, bd, transaccion, almacen;

    if (document.getElementById("id").value == "") {
        alert("Por favor, selecciona un id de la tabla");
        return;
    }

    if (window.indexedDB) {
        peticion = window.indexedDB.open("musica");

        peticion.onsuccess = function (evento) {
            console.log("Success");

            bd = evento.target.result;

            transaccion = bd.transaction(bd.objectStoreNames, "readwrite");
            almacen = transaccion.objectStore(tabla);

            var peticionEliminacion = almacen.delete(parseInt(document.getElementById("id").value));

            peticionEliminacion.onsuccess = function () {
                alert("Eliminacion correcta");
            }

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

function jqueryTabla() {
    switch (tabla) {
        case "autor":
            item = ["id", "autor", "email", "oldpass", "foto_perfil", "fondo_perfil", "generos"];
            break;
        case "album":
            item = ["id", "autor", "nombre", "lanzamiento", "caratula"];
            break;
        case "pista":
            item = ["id", "autor", "nombre", "archivo", "idAlbum"];
            break;
        case "lista":
            item = ["id", "autor", "nombre", "pistas"];
            break;
    }

    $(function () {
        $("tbody tr").on("click", function () {
            tabla = $(this).closest("#tabla").siblings("#form").children("#tablahide").attr("class");
            console.log(tabla);
            switch (tabla) {
                case "autor":
                    item = ["id", "autor", "email", "oldpass", "aux", "foto_perfil", "fondo_perfil", "generos"];
                    $(this).children("td").each(function () {
                        //console.log($(this).index());
                        if ($(this).index() != 4) {
                            id = "#" + item[$(this).index()];
                            $(id).val($(this).text());
                            //console.log(item[$(this).index()]);
                            //console.log($(this).text());
                        }
                    });
                    break;
                case "album":
                    item = ["id", "autor", "nombre", "lanzamiento", "caratula"];
                    $(this).children("td").each(function () {
                        //console.log($(this).index());
                        id = "#" + item[$(this).index()];
                        $(id).val($(this).text());
                        //console.log(item[$(this).index()]);
                        //console.log($(this).text());
                    });
                    break;
                case "pista":
                    item = ["id", "autor", "nombre", "archivo", "idAlbum"];
                    $(this).children("td").each(function () {
                        //console.log($(this).index());
                        id = "#" + item[$(this).index()];
                        $(id).val($(this).text());
                        //console.log(item[$(this).index()]);
                        //console.log($(this).text());
                    });
                    break;
                case "lista":
                    item = ["id", "autor", "nombre", "aux", "pistas"];
                    $(this).children("td").each(function () {
                        //console.log($(this).index());
                        if ($(this).index() != 3) {
                            if ($(this).index() == 4) {
                                cargarPistas($(this).text());
                            } else {
                                id = "#" + item[$(this).index()];
                                $(id).val($(this).text());
                            }
                            //console.log(item[$(this).index()]);
                            //console.log($(this).text());
                        }
                    });
                    break;
            }

        });
    });
}

function cargarPistas(cadena) {
    var peticion, bd, transaccion, almacen;
    if (window.indexedDB) {
        peticion = window.indexedDB.open("musica");

        peticion.onsuccess = function (evento) {
            console.log("Success");

            var bd = evento.target.result;
            var transaccion = bd.transaction(bd.objectStoreNames, "readwrite");
            var almacen = transaccion.objectStore("pista");
            var peticionGetAll = almacen.getAll();

            peticionGetAll.onsuccess = function () {
                crearPista(peticionGetAll.result, cadena);

            }
        }

        peticion.onerror = function (evento) {
            alert("No se ha creado la base de datos: " + evento.target.errorCode);
        };
    } else {
        console.log("IndexedDB no está soportado");
    }
}

function crearPista(item, cadena) {
    //console.log(item);
    //console.log(cadena);
    var lista = document.getElementById("newlista");
    lista.innerHTML = "<div class='header'>Arrastre la pista deseada</div>";

    item.forEach(x => {
        if (cadena.split(",").includes(x.id.toString())) {
            //console.log(x.nombre);
            var div = document.createElement("div");
            div.id = x.id;
            div.draggable = "true";
            div.innerText = x.nombre;
            div.addEventListener("dragstart", fase1);
            lista.appendChild(div);
        }
    })
}

function comprobarAutor() {
    var autor = localStorage.getItem("user");
    var input_autor = document.getElementById("autor").value;
    if (autor != input_autor && autor != "Admin") {
        return false;
    } else {
        if (input_autor == "") {
            return false;
        }
        return true;
    }
}