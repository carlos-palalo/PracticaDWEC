

eliminar("autor",1,0);
var rango = IDBKeyRange.bound(2, 4);
eliminar("autor",0,rango);

var json = cargar("autor");
console.log(json);