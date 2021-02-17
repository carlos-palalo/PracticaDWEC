function buscar() {
    var jsonBuscador = localStorage.getItem("buscador");
    var buscador = document.getElementById("buscador").value;
    if (buscador != "") {
        document.getElementById("resultado").innerHTML = "";

        obj = JSON.parse(jsonBuscador);

        obj.forEach(x => {
            if (x.autor) {
                //console.log("artist --> " + x.artist);
                filtrar(x.autor, buscador, "autor");
            } else {
                //console.log("album --> " + x.album);
                filtrar(x.album, buscador, "album");
            }
        });
        //console.log(obj);

        $(function () {
            $("#resultado").offset({ top: $("#buscador").offset().top + 40, left: $("#buscador").offset().left });
            $("#resultado").slideDown("fast");
        });
    } else {
        $(function () {
            $("#resultado").hide();
        })
    }
}

function filtrar(item, buscador, tipo) {
    if (item.toLowerCase().indexOf(buscador.toLowerCase()) != -1 && item != "Admin") {
        console.log(item);
        var a = document.createElement("a");
        a.href = tipo + ".html";
        a.innerText = item;

        a.addEventListener("click", function () {
            localStorage.setItem(tipo, item);
        });

        document.getElementById("resultado").appendChild(a);
        //console.log(tipo + " --> " + item);
    }
}

$(function () {
    $("#buscador").on("blur", function () {
        $("#resultado").slideUp(200);
    });
    $(window).resize(function () {
        $("#resultado").hide();
    })
})