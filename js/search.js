function buscar() {
    var jsonBuscador = sessionStorage.getItem("buscador");
    var buscador = document.getElementById("buscador").value;
    if (buscador != "") {
        $(function () {
            $("#resultado").offset({ top: $("#buscador").offset().top + 40, left: $("#buscador").offset().left });
            //console.log($("#resultado").offset().left);
            $("#resultado").slideDown("fast");
        });

        document.getElementById("resultado").innerText = "";

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
    } else {
        $(function () {
            $("#resultado").slideUp(200);
        })
    }

}

function filtrar(item, buscador, tipo) {
    if (item.toLowerCase().indexOf(buscador.toLowerCase()) != -1 && item != "Admin") {
        //console.log(item);
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
    $("#buscador").on("focus", function () {
        if ($(this).val() != "") {
            $("#resultado").slideDown(200);
        }
    });
    $("#buscador").on("blur", function () {
        $("#resultado").slideUp(200);
    });
    $(window).resize(function () {
        $("#resultado").hide();
    })
})