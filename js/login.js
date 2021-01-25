function codigo() {
    var inicio = document.getElementById("inicio");
    var registro = document.getElementById("registro");
    var btn_ini = document.getElementById("btn-ini");
    var btn_reg = document.getElementById("btn-reg");

    document.getElementById("btn-iniciar").addEventListener("click", login);
    document.getElementById("btn-registro").addEventListener("click", login);

    btn_ini.addEventListener("click", function () {
        inicio.style.display = "block";
        btn_ini.style.display = "none";
        registro.style.display = "none";
        btn_reg.style.display = "block";
    });

    btn_reg.addEventListener("click", function () {
        inicio.style.display = "none";
        btn_ini.style.display = "block";
        registro.style.display = "block";
        btn_reg.style.display = "none";
    });
}

function login(e) {
    var email_l = document.getElementById("email-l").value;     //Variables Login
    var pass_l = document.getElementById("pass-l").value;

    var user_r = document.getElementById("user-r").value;       //Variables Register
    var email_r = document.getElementById("email-r").value;
    var pass_r = document.getElementById("pass-r").value;
    var confirm_r = document.getElementById("pass-r").value;

    var peticion;

    if (window.indexedDB) {
        peticion = window.indexedDB.open("musica");

        peticion.onsuccess = function (evento) {
            console.log("Success");

            var bd = evento.target.result;

            var transaccion = bd.transaction(bd.objectStoreNames, "readwrite");
            var almacenAutores = transaccion.objectStore("autor");

            switch (e.target.id) {
                case "btn-iniciar":
                    buscar(email_l, pass_l, almacenAutores);
                    break;
                case "btn-registro":
                    buscar(email_r, pass_r, almacenAutores);
                    localStorage.removeItem("user");
                    if (localStorage.getItem("user") != undefined) {
                        console.log("El usuario ya está en la base de datos");
                        alert("Usuario ya registrado");
                    }
                    break;
            }
        }

        peticion.onerror = function (evento) {
            alert("No se ha creado la base de datos: " + evento.target.errorCode);
        };
    } else {
        console.log("IndexedDB no está soportado");
    }
}
function buscar(email, pass, almacenAutores) {
    var peticionGetAll = almacenAutores.getAll();

    peticionGetAll.onsuccess = function () {    //Recorro el almacen de autores de la bd y busco el usuario
        var valores = peticionGetAll.result;

        for (autor in valores) {
            if (valores[autor].email == email && valores[autor].password == pass) {   //Si encuentro el usuario, me logueo
                console.log("Esta");
                window.localStorage.setItem("user", valores[autor].nombre);
            }
        }
    }
}

function register() {
    var transaccionInsertar = bd.transaction(bd.objectStoreNames, "readwrite");
    var almacenInsertar = transaccionInsertar.objectStore("autor");
    var nuevoLibro = {};

    nuevoLibro.isbn = parseInt(document.getElementById("isbn").value);
    nuevoLibro.titulo = document.getElementById("titulo").value;
    nuevoLibro.autor = document.getElementById("autor").value;
    nuevoLibro.editorial = document.getElementById("editorial").value;
    nuevoLibro.paginas = parseInt(document.getElementById("paginas").value);
    nuevoLibro.precio = parseInt(document.getElementById("precio").value);

    almacenInsertar.add(nuevoLibro);
}

window.onload = codigo;