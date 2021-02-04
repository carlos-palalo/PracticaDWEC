function codigo() {

    if (localStorage.getItem("idUser") != undefined && localStorage.getItem("idUser") != "") {
        window.location.href = "index.html";
    }

    var btn_ini = document.getElementById("btn-ini");
    var btn_reg = document.getElementById("btn-reg");
    var inicio = document.getElementById("inicio");
    var registro = document.getElementById("registro");

    document.getElementById("btn-iniciar").addEventListener("click", loginRegister);
    document.getElementById("btn-registro").addEventListener("click", loginRegister);

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
function loginRegister(e) {
    var pass_r = document.getElementById("pass-r").value;
    var confirm_r = document.getElementById("confirm-r").value;

    if (confirm_r != pass_r) {
        alert("Las contraseñas deben de coincidir");
    } else if (window.indexedDB) {
        peticion = window.indexedDB.open("musica");

        peticion.onsuccess = function (evento) {
            console.log("Sucess");

            var bd = evento.target.result;
            var transaccion = bd.transaction(bd.objectStoreNames, "readwrite");
            var almacenAutores = transaccion.objectStore("autor");
            var peticionCursor = almacenAutores.openCursor();

            peticionCursor.onsuccess = function () {
                var cursor = peticionCursor.result;
                var auxl = false;

                if (cursor) {
                    switch (e.target.id) {
                        case "btn-iniciar":
                            auxl = login(cursor.value);
                            if (auxl) {
                                alert("Login Correcto");
                                window.location.href = "index.html";
                            }
                            break;
                        case "btn-registro":
                            var aux = comprobar(cursor.value);
                            if (aux) {
                                alert("Ya existe un usuario con ese email");
                                return;
                            }
                            break;
                    }
                    cursor.continue(); //continue incrementa el cursor una posición
                } else {
                    if (e.target.id == "btn-registro") {
                        register(almacenAutores);
                    }
                    /*if (localStorage.getItem("idUser") == undefined) {
                        alert("Login Incorrecto");
                    }*/
                    console.log("FIN");
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

function login(autor) {
    var email_l = document.getElementById("email-l").value;
    var pass_l = document.getElementById("pass-l").value;

    if (autor.email == email_l && autor.password == pass_l) {
        console.log("Login Correcto!");
        localStorage.setItem("user", autor.autor);
        localStorage.setItem("idUser", autor.id);
        return true;
    }
}
function comprobar(autor) {
    var email_r = document.getElementById("email-r").value;
    if (autor.email == email_r) {
        return true;
    }
}
function register(almacen) {
    var nuevoAutor = {};
    var email_r = document.getElementById("email-r").value
    nuevoAutor.autor = document.getElementById("user-r").value;
    nuevoAutor.email = email_r;
    nuevoAutor.password = document.getElementById("pass-r").value;
    nuevoAutor.fecha_creacion = new Date().toLocaleDateString();
    console.log(nuevoAutor);
    almacen.add(nuevoAutor);

    var peticion = almacen.getAll();

    peticion.onsuccess = function () {
        var valores = peticion.result;

        for (autor in valores) {
            if (valores[autor].email == email_r) {
                localStorage.setItem("user", valores[autor].autor);
                localStorage.setItem("idUser", valores[autor].id);
                alert("Registro correcto");
                window.location.href = "index.html";
            }
        }
    }
}

window.onload = codigo;