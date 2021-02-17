function cuenta() {
    header("cuenta");
    cargarNav();
    cargarForm(["id", "autor", "email", "oldpass", "newpass", "confpass", "fecha_creacion", "foto_perfil", "fondo_perfil", "generos"]);
    cargar("autor", "cuenta");
}

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
            cargar(this.className, "cuenta");
        });
        nodoNav.appendChild(nodo);
    }
}

function cargarForm(item) {
    var form = document.getElementById("form");
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
                input.placeholder = "Autor.";
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
            case "newpass":
                input.placeholder = "Contraseña nueva.";
                input.type = "password";
                break;
            case "confpass":
                input.placeholder = "Confirmación de contraseña.";
                input.type = "password";
                break;
            case "fecha_creacion":
                input.placeholder = "Fecha de creación.";
                input.type = "text";
                input.readOnly = "true";
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
        }
    });
}

function cargarTabla(item) {
    var tabla = document.getElementById("tabla");
    if (localStorage.getItem("user") == "Admin") {
    } else {
    }
}

window.onload = cuenta;