function codigo() {
    document.getElementById("btn").addEventListener("click", function () {
        crearBD();
    });
    document.getElementById("inicio").addEventListener("click", function () {
        window.location.href = "inicio.html";
    });
}

function crearBD() {
    var peticion, bd, almacenAutor, almacenAlbum, almacenPista, almacenLista;

    if (window.indexedDB) {
        peticion = window.indexedDB.open("musica", 1);

        peticion.onsuccess = function (evento) {
            bd = peticion.result;
            var transaccion = bd.transaction(bd.objectStoreNames, "readwrite");

            /*************** AUTORES *************/
            almacenAutor = transaccion.objectStore("autor");
            almacenAutor.add({ id: 1, autor: "Admin", email: "admin@gmail.com", password: "Admin12", fecha_creacion: new Date().toLocaleDateString(), foto_perfil: "", fondo_perfil: "", generos: "" });
            almacenAutor.add({ id: 2, autor: "Desakato", email: "desakato@gmail.com", password: "Desakato1", fecha_creacion: new Date().toLocaleDateString(), foto_perfil: "img/perfil_desakato.jpg", fondo_perfil: "img/fondo_desakato.jpg", generos: "Rock, Punk" });
            almacenAutor.add({ id: 3, autor: "Thirty Seconds To Mars", email: "thirtysecondstomars@gmail.com", password: "Thirtyecondstomars1", fecha_creacion: new Date().toLocaleDateString(), foto_perfil: "img/perfil_thirtysecondstomars.jpg", fondo_perfil: "img/fondo_thirtysecondstomars.jpg", generos: "Rock alternativo, Post-grunge, Hard Rock, Rock Indie" });
            almacenAutor.add({ id: 4, autor: "La Raíz", email: "laraiz@gmail.com", password: "Laraiz1", fecha_creacion: new Date().toLocaleDateString(), foto_perfil: "img/perfil_laraiz.jpg", fondo_perfil: "img/fondo_laraiz.jpg", generos: "Ska, Rock, Reggae, Fusion, Rap" });
            almacenAutor.add({ id: 5, autor: "The Offspring", email: "theoffspring@gmail.com", password: "Theoffspring1", fecha_creacion: new Date().toLocaleDateString(), foto_perfil: "img/perfil_theoffspring.jpg", fondo_perfil: "img/fondo_theoffspring.jpg", generos: "Pop Punk, Punk Rock, Rock alternativo" });

            /*************** ALBUM *************/
            almacenAlbum = transaccion.objectStore("album");
            //Desakato
            almacenAlbum.add({ id: 1, autor: "Desakato", nombre: "Con el viento de cara", lanzamiento: "2008", caratula: "img/con-el-viento-de-cara-500x500.jpg" });
            almacenAlbum.add({ id: 2, autor: "Desakato", nombre: "Miseria, sangre y plomo", lanzamiento: "2010", caratula: "img/miseria-sangre-y-plomo-500x500.jpg" });
            almacenAlbum.add({ id: 3, autor: "Desakato", nombre: "Inercia", lanzamiento: "2012", caratula: "img/inercia-500x500.jpg" });
            almacenAlbum.add({ id: 4, autor: "Desakato", nombre: "Buen Viaje", lanzamiento: "2014", caratula: "img/buen-viaje-500x500.jpg" });
            almacenAlbum.add({ id: 5, autor: "Desakato", nombre: "La teoría del fuego", lanzamiento: "2016", caratula: "img/la-teoria-del-fuego-500x500.jpg" });
            almacenAlbum.add({ id: 6, autor: "Desakato", nombre: "Antártida", lanzamiento: "2018", caratula: "img/antartida-500x500.jpg" });
            almacenAlbum.add({ id: 7, autor: "Desakato", nombre: "La miel de las flores muertas", lanzamiento: "2020", caratula: "img/la-miel-de-las-flores-muertas-500x500.jpg" });
            //La Raíz
            almacenAlbum.add({ id: 8, autor: "La Raíz", nombre: "Guerra al Silencio", lanzamiento: "2009", caratula: "img/guerra-al-silencio-500x500.jpg" });
            almacenAlbum.add({ id: 9, autor: "La Raíz", nombre: "El Lado de los Rebeldes", lanzamiento: "2011", caratula: "img/el-lado-de-los-rebeldes-500x500.jpg" });
            almacenAlbum.add({ id: 10, autor: "La Raíz", nombre: "Así en el Cielo cmo en la Selva", lanzamiento: "2013", caratula: "img/asi-en-el-cielo-como-en-la-selva-500x500.jpg" });
            almacenAlbum.add({ id: 11, autor: "La Raíz", nombre: "Entre Poetas y Presos", lanzamiento: "2016", caratula: "img/entre-poetas-y-presos-500x500.jpg" });
            //Thirty Seconds To Mars
            almacenAlbum.add({ id: 12, autor: "Thirty Seconds To Mars", nombre: "A Beautiful Lie", lanzamiento: "2005", caratula: "img/a-beautiful-lie-500x500.jpg" });
            almacenAlbum.add({ id: 13, autor: "Thirty Seconds To Mars", nombre: "This Is War", lanzamiento: "2009", caratula: "img/this-is-war-500x500.jpg" });
            //The Offspring
            almacenAlbum.add({ id: 14, autor: "The Offspring", nombre: "Ixnay On The Hombre", lanzamiento: "1997", caratula: "img/ixnay-on-the-hombre-500x500.jpg" });
            almacenAlbum.add({ id: 15, autor: "The Offspring", nombre: "Smash", lanzamiento: "1994", caratula: "img/smash-500x500.jpg" });

            /*************** PISTA *************/
            almacenPista = transaccion.objectStore("pista");
            //Desakato
            almacenPista.add({ id: 1, autor: "Desakato", nombre: "Ritcher 7.5", archivo: "media/Desakato/Desakato - Con El Viento De Cara/01- Ritcher 7'5.mp3", idAlbum: 1 });
            almacenPista.add({ id: 2, autor: "Desakato", nombre: "Los mineros", archivo: "media/Desakato/Desakato - Con El Viento De Cara/02- Los Mineros.mp3", idAlbum: 1 });
            almacenPista.add({ id: 3, autor: "Desakato", nombre: "Tu disfraz", archivo: "media/Desakato/Desakato - Con El Viento De Cara/03- Tu Disfraz.mp3", idAlbum: 1 });
            almacenPista.add({ id: 4, autor: "Desakato", nombre: "Contra el dolor", archivo: "media/Desakato/Desakato - Con El Viento De Cara/04- Contra El Dolor.mp3", idAlbum: 1 });
            almacenPista.add({ id: 5, autor: "Desakato", nombre: "África", archivo: "media/Desakato/Desakato - Miseria,Sangre y Plomo/01 - Desakato - África.mp3", idAlbum: 2 });
            almacenPista.add({ id: 6, autor: "Desakato", nombre: "En el Ojo Ajerno", archivo: "media/Desakato/Desakato - Miseria,Sangre y Plomo/02 - Desakato - En el ojo ajeno.mp3", idAlbum: 2 });
            almacenPista.add({ id: 7, autor: "Desakato", nombre: "Cada Vez", archivo: "media/Desakato/Desakato - Miseria,Sangre y Plomo/03 - Desakato - Cada vez.mp3", idAlbum: 2 });
            almacenPista.add({ id: 8, autor: "Desakato", nombre: "Contra la Pared", archivo: "media/Desakato/Desakato - Miseria,Sangre y Plomo/04 - Desakato - Contra la pared.mp3", idAlbum: 2 });
            almacenPista.add({ id: 9, autor: "Desakato", nombre: "...", archivo: "media/Desakato/Desakato - Inercia/01 - Desakato - ....mp3", idAlbum: 3 });
            almacenPista.add({ id: 10, autor: "Desakato", nombre: "Iceberg", archivo: "media/Desakato/Desakato - Inercia/01 - Desakato - ....mp3", idAlbum: 3 });
            almacenPista.add({ id: 11, autor: "Desakato", nombre: "R.I.P.", archivo: "media/Desakato/Desakato - Inercia/03 - Desakato - R.I.P..mp3", idAlbum: 3 });
            almacenPista.add({ id: 12, autor: "Desakato", nombre: "Cuando Salga el Sol", archivo: "media/Desakato/Desakato - Inercia/04 - Desakato - Cuando salga el sol.mp3", idAlbum: 3 });
            almacenPista.add({ id: 13, autor: "Desakato", nombre: "Estepa", archivo: "media/Desakato/Desakato - Buen Viaje/01. Desakato - Estepa.mp3", idAlbum: 4 });
            almacenPista.add({ id: 14, autor: "Desakato", nombre: "Héroes", archivo: "media/Desakato/Desakato - Buen Viaje/02. Desakato - Héroes.mp3", idAlbum: 4 });
            almacenPista.add({ id: 15, autor: "Desakato", nombre: "La Tormenta", archivo: "media/Desakato/Desakato - Buen Viaje/03. Desakato - La Tormenta.mp3", idAlbum: 4 });
            almacenPista.add({ id: 16, autor: "Desakato", nombre: "Pánico en Frankfurt", archivo: "media/Desakato/Desakato - Buen Viaje/04. Desakato - Pánico en Frankfurt.mp3", idAlbum: 4 });
            almacenPista.add({ id: 17, autor: "Desakato", nombre: "Tiempos de Cobardes", archivo: "media/Desakato/Desakato - La Teoría del Fuego/01. Desakato - Tiempo de cobardes.mp3", idAlbum: 5 });
            almacenPista.add({ id: 18, autor: "Desakato", nombre: "Animales Hambrientos", archivo: "media/Desakato/Desakato - La Teoría del Fuego/01. Desakato - Tiempo de cobardes.mp3", idAlbum: 5 });
            almacenPista.add({ id: 19, autor: "Desakato", nombre: "Estigma", archivo: "media/Desakato/Desakato - La Teoría del Fuego/03. Desakato - Estigma.mp3", idAlbum: 5 });
            almacenPista.add({ id: 20, autor: "Desakato", nombre: "Heridas Abiertas", archivo: "media/Desakato/Desakato - La Teoría del Fuego/04. Desakato - Heridas abiertas.mp3", idAlbum: 5 });
            almacenPista.add({ id: 21, autor: "Desakato", nombre: "Humo Negro", archivo: "media/Desakato/Desakato - Antártida/01- Humo Negro.mp3", idAlbum: 6 });
            almacenPista.add({ id: 22, autor: "Desakato", nombre: "Salvajes", archivo: "media/Desakato/Desakato - Antártida/02- Salvajes.mp3", idAlbum: 6 });
            almacenPista.add({ id: 23, autor: "Desakato", nombre: "La Cura", archivo: "media/Desakato/Desakato - Antártida/03- La Cura.mp3", idAlbum: 6 });
            almacenPista.add({ id: 24, autor: "Desakato", nombre: "Huellas", archivo: "media/Desakato/Desakato - Antártida/04- Huellas.mp3", idAlbum: 6 });
            almacenPista.add({ id: 25, autor: "Desakato", nombre: "Apátridas", archivo: "media/Desakato/Desakato - La Miel de las Flores Muertas/01. Desakato - Apátridas.mp3", idAlbum: 7 });
            almacenPista.add({ id: 26, autor: "Desakato", nombre: "Hipnotizados", archivo: "media/Desakato/Desakato - La Miel de las Flores Muertas/02. Desakato - Hipnotizados.mp3", idAlbum: 7 });
            almacenPista.add({ id: 27, autor: "Desakato", nombre: "Nuestro Legado", archivo: "media/Desakato/Desakato - La Miel de las Flores Muertas/03. Desakato - Nuestro Legado.mp3", idAlbum: 7 });
            almacenPista.add({ id: 28, autor: "Desakato", nombre: "Elegante Entierro", archivo: "media/Desakato/Desakato - La Miel de las Flores Muertas/04. Desakato - Elegante Entierro.mp3", idAlbum: 7 });
            //La Raíz
            almacenPista.add({ id: 29, autor: "La Raíz", nombre: "Intro", archivo: "media/La Raíz/La Raiz - Guerra al Silencio/01. Intro.mp3", idAlbum: 8 });
            almacenPista.add({ id: 30, autor: "La Raíz", nombre: "Malos Tiempos", archivo: "media/La Raíz/La Raiz - Guerra al Silencio/02. Malos Tiempos.mp3", idAlbum: 8 });
            almacenPista.add({ id: 31, autor: "La Raíz", nombre: "Pobre Manuel", archivo: "media/La Raíz/La Raiz - Guerra al Silencio/03. Pobre Manuel.mp3", idAlbum: 8 });
            almacenPista.add({ id: 32, autor: "La Raíz", nombre: "África", archivo: "media/La Raíz/La Raiz - Guerra al Silencio/04. África.mp3", idAlbum: 8 });
            almacenPista.add({ id: 33, autor: "La Raíz", nombre: "El Lado de los Rebeldes", archivo: "media/La Raíz/La Raiz - El Lado de los Rebeldes/01. El Lado de los Rebeldes.mp3", idAlbum: 9 });
            almacenPista.add({ id: 34, autor: "La Raíz", nombre: "La Voz", archivo: "media/La Raíz/La Raiz - El Lado de los Rebeldes/02. La Voz.mp3", idAlbum: 9 });
            almacenPista.add({ id: 35, autor: "La Raíz", nombre: "De Mar en Mar", archivo: "media/La Raíz/La Raiz - El Lado de los Rebeldes/03. De Mar en Mar.mp3", idAlbum: 9 });
            almacenPista.add({ id: 36, autor: "La Raíz", nombre: "Noches en Babilón", archivo: "media/La Raíz/La Raiz - El Lado de los Rebeldes/04. Noches en Babylon.mp3", idAlbum: 9 });
            almacenPista.add({ id: 37, autor: "La Raíz", nombre: "Jilgueros", archivo: "media/La Raíz/La Raiz - Así en el Cielo como en la Selva/01. Jilgueros.mp3", idAlbum: 10 });
            almacenPista.add({ id: 38, autor: "La Raíz", nombre: "Nuestra Nación", archivo: "media/La Raíz/La Raiz - Así en el Cielo como en la Selva/02. Nuestra Nación.mp3", idAlbum: 10 });
            almacenPista.add({ id: 39, autor: "La Raíz", nombre: "A la Sombra de la Sierra", archivo: "media/La Raíz/La Raiz - Así en el Cielo como en la Selva/03. A la Sombra de la Sierra.mp3", idAlbum: 10 });
            almacenPista.add({ id: 40, autor: "La Raíz", nombre: "Llueve en Semana Santa", archivo: "media/La Raíz/La Raiz - Así en el Cielo como en la Selva/04. Llueve en Semana Santa.mp3", idAlbum: 10 });
            almacenPista.add({ id: 41, autor: "La Raíz", nombre: "Intro 'Las Miserias de sus Crímenes'", archivo: "media/La Raíz/La Raiz - Entre Poetas y Presos/01. Intro - Las Miserias de Sus Crímenes.mp3", idAlbum: 11 });
            almacenPista.add({ id: 42, autor: "La Raíz", nombre: "Entre Poetas y Presos", archivo: "media/La Raíz/La Raiz - Entre Poetas y Presos/02. Entre Poetas y Presos.mp3", idAlbum: 11 });
            almacenPista.add({ id: 43, autor: "La Raíz", nombre: "Rueda la Corona", archivo: "media/La Raíz/La Raiz - Entre Poetas y Presos/03. Rueda la Corona.mp3", idAlbum: 11 });
            almacenPista.add({ id: 44, autor: "La Raíz", nombre: "Por Favor", archivo: "media/La Raíz/La Raiz - Entre Poetas y Presos/04. Por Favor.mp3", idAlbum: 11 });
            //Thirty Seconds To Mars
            almacenPista.add({ id: 45, autor: "Thirty Seconds To Mars", nombre: "Attack", archivo: "media/Thirty Seconds To Mars/30 Seconds to Mars  - A Beautiful Lie/01. Attack .mp3", idAlbum: 12 });
            almacenPista.add({ id: 46, autor: "Thirty Seconds To Mars", nombre: "A beautiful lie", archivo: "media/Thirty Seconds To Mars/30 Seconds to Mars  - A Beautiful Lie/02. A beautiful lie .mp3", idAlbum: 12 });
            almacenPista.add({ id: 47, autor: "Thirty Seconds To Mars", nombre: "The kill", archivo: "media/Thirty Seconds To Mars/30 Seconds to Mars  - A Beautiful Lie/03. The kill .mp3", idAlbum: 12 });
            almacenPista.add({ id: 48, autor: "Thirty Seconds To Mars", nombre: "Was it a dream", archivo: "media/Thirty Seconds To Mars/30 Seconds to Mars  - A Beautiful Lie/04. Was it a dream.mp3", idAlbum: 12 });
            almacenPista.add({ id: 49, autor: "Thirty Seconds To Mars", nombre: "Escape", archivo: "media/Thirty Seconds To Mars/30 Seconds to Mars  - This Is War/01. Escape.mp3", idAlbum: 13 });
            almacenPista.add({ id: 50, autor: "Thirty Seconds To Mars", nombre: "Night of the hunter", archivo: "media/Thirty Seconds To Mars/30 Seconds to Mars  - This Is War/02. Night of the hunter.mp3", idAlbum: 13 });
            almacenPista.add({ id: 51, autor: "Thirty Seconds To Mars", nombre: "Kings and queens", archivo: "media/Thirty Seconds To Mars/30 Seconds to Mars  - This Is War/03. Kings and queens.mp3", idAlbum: 13 });
            almacenPista.add({ id: 52, autor: "Thirty Seconds To Mars", nombre: "This is war", archivo: "media/Thirty Seconds To Mars/30 Seconds to Mars  - This Is War/04. This is war.mp3", idAlbum: 13 });
            //The Offspring
            almacenPista.add({ id: 53, autor: "The Offspring", nombre: "Disclaimer", archivo: "media/The Offspring/The Offspring - Ixnay On The Hombre/01 - Disclaimer.mp3", idAlbum: 14 });
            almacenPista.add({ id: 54, autor: "The Offspring", nombre: "The Meaning Of Life", archivo: "media/The Offspring/The Offspring - Ixnay On The Hombre/02 - The Meaning Of Life.mp3", idAlbum: 14 });
            almacenPista.add({ id: 55, autor: "The Offspring", nombre: "Mota", archivo: "media/The Offspring/The Offspring - Ixnay On The Hombre/03 - Mota.mp3", idAlbum: 14 });
            almacenPista.add({ id: 56, autor: "The Offspring", nombre: "Me & My Old Lady", archivo: "media/The Offspring/The Offspring - Ixnay On The Hombre/04 - Me & My Old Lady.mp3", idAlbum: 14 });
            almacenPista.add({ id: 57, autor: "The Offspring", nombre: "Time To Relax", archivo: "media/The Offspring/The Offspring - Smash/01 - Time To Relax.mp3", idAlbum: 15 });
            almacenPista.add({ id: 58, autor: "The Offspring", nombre: "Nitro (Youth Energy)", archivo: "media/The Offspring/The Offspring - Smash/02 - Nitro (Youth Energy).mp3", idAlbum: 15 });
            almacenPista.add({ id: 59, autor: "The Offspring", nombre: "Bad Habit", archivo: "media/The Offspring/The Offspring - Smash/03 - Bad Habit.mp3", idAlbum: 15 });
            almacenPista.add({ id: 60, autor: "The Offspring", nombre: "Gotta Get Away", archivo: "media/The Offspring/The Offspring - Smash/04 - Gotta Get Away.mp3", idAlbum: 15 });

            /*************** LISTA *************/
            //Desakato
            almacenLista = transaccion.objectStore("lista");
            almacenLista.add({ id: 1, autor: "Desakato", nombre: "Desakato - Favoritas", fecha: new Date().toLocaleDateString(), pistas: "5,6,7,8,10,12" });
            almacenLista.add({ id: 2, autor: "Desakato", nombre: "Desakato - Favoritas v2", fecha: new Date().toLocaleDateString(), pistas: "12,13,14,19,22,25" });
            //La Raíz
            almacenLista.add({ id: 3, autor: "La Raíz", nombre: "La Raíz", fecha: new Date().toLocaleDateString(), pistas: "29,31,35,37,41" });
            almacenLista.add({ id: 4, autor: "La Raíz", nombre: "La Raíz v2", fecha: new Date().toLocaleDateString(), pistas: "30,32,35,38,40" });
            //Thirty Seconds To Mars
            almacenLista.add({ id: 5, autor: "Thirty Seconds To Mars", nombre: "Thirty Seconds To Mars - Favoritas", fecha: new Date().toLocaleDateString(), pistas: "45,46,48,50,52" });

            window.location.href = "index.html";
        };

        peticion.onerror = function (evento) {
            alert("No se ha creado la base de datos: " + event.target.errorCode);
        };

        peticion.onupgradeneeded = function (evento) {
            bd = peticion.result;

            /***** Tabla almacenAutor *****/
            almacenAutor = bd.createObjectStore("autor", { keyPath: "id", autoIncrement: true });

            /**** Tabla almacenAlbum ****/
            almacenAlbum = bd.createObjectStore("album", { keyPath: "id", autoIncrement: true });

            /**** Tabla almacenPista *****/
            almacenPista = bd.createObjectStore("pista", { keyPath: "id", autoIncrement: true });

            /**** Tabla almacenLista ****/
            almacenLista = bd.createObjectStore("lista", { keyPath: "id", autoIncrement: true });

            /********* ÍNDICES *********/
            almacenAutor.createIndex("por_id", "id", { unique: true });
            almacenAutor.createIndex("por_autor", "autor");
            almacenAutor.createIndex("por_email", "email", { unique: true });
            almacenAutor.createIndex("por_password", "password");
            almacenAutor.createIndex("por_fecha_creacion", "fecha_creacion");
            almacenAutor.createIndex("por_origen", "origen");
            almacenAutor.createIndex("por_fondo_perfil", "fondo_perfil");
            almacenAutor.createIndex("por_foto_perfil", "foto_perfil");
            almacenAutor.createIndex("por_generos", "generos");

            almacenAlbum.createIndex("por_id", "id", { unique: true });
            almacenAlbum.createIndex("por_autor", "autor");
            almacenAlbum.createIndex("por_nombre", "nombre");
            almacenAlbum.createIndex("por_lanzamiento", "lanzamiento");
            almacenAlbum.createIndex("por_caratula", "caratula");

            almacenPista.createIndex("por_id", "id", { unique: true });
            almacenPista.createIndex("por_autor", "autor");
            almacenPista.createIndex("por_nombre", "nombre");
            almacenPista.createIndex("por_archivo", "archivo");
            almacenPista.createIndex("por_idAlbum", "idAlbum");

            almacenLista.createIndex("por_id", "id", { unique: true });
            almacenLista.createIndex("por_autor", "autor");
            almacenLista.createIndex("por_nombre", "nombre");
            almacenLista.createIndex("por_fecha", "fecha");
            almacenLista.createIndex("por_pistas", "pistas");
        };
    }
}

window.onload = codigo;