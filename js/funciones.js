function cargar(nombre) {
    var json = [];
    if (window.indexedDB) {
        peticion = window.indexedDB.open("musica");

        peticion.onsuccess = function (evento) {
            console.log("Sucess");

            var bd = evento.target.result;
            var transaccion = bd.transaction(bd.objectStoreNames, "readwrite");
            var almacen = transaccion.objectStore(nombre);

            var peticion = almacen.openCursor();
            peticion.onsuccess = function () {
                var cursor = peticion.result;

                if (cursor) {
                    json.push(cursor.value);
                    cursor.continue(); //continue incrementa el cursor una posición
                } else {
                    console.log("FIN Carga");
                }
            }
            bd.close();
        };
        peticion.onerror = function (evento) {
            alert("No se ha creado la base de datos: " + evento.target.errorCode);
        };
        peticion.onupgradeneeded = function (evento) {
            console.log("Upgradeneeded");
        };
    } else {
        console.log("IndexedDB no está soportado");
    }
    return json;
}

function eliminar(nombre, id, rango) {
    if (window.indexedDB) {
        peticion = window.indexedDB.open("musica");

        peticion.onsuccess = function (evento) {
            console.log("Success");

            bd = evento.target.result;
            transaccion = bd.transaction(bd.objectStoreNames, "readwrite");
            almacen = transaccion.objectStore(nombre);

            if (rango == 0) {
                var peticionEliminacion = almacen.delete(id);
            } else {
                //var rango = IDBKeyRange.bound(7, 34);
                peticionEliminacion = almacen.delete(rango);
            }

            peticionEliminacion.onsuccess = function () {
                console.log("FIN Eliminación");
            }
            bd.close();
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