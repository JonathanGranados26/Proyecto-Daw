const btnIngresar = document.getElementById('btnagregar');
var titulo = document.getElementById('txtNombre');
var descripcion = document.getElementById('txtDescipcion');
var prioridad = document.getElementById('prioridad');
var txtIdBorrar = document.getElementById('txtIdBorrar');
const btnBorrar = document.getElementById('btnBorrar');
const btnCerrarDatos = document.getElementById('btnCerrarDatos');
const btnCanBorrador = document.getElementById('btnCanBorrador');
const bntBorrarBase = document.getElementById('bntBorrarBase');

//solo ocultan o muestran tablas
function mostrarTablaDatos(){
    document.getElementById('tablaParaAnadir').style.display = "block";
}
function ocutarTabla(){
    document.getElementById('tablaParaAnadir').style.display = "none";
    document.getElementById('txtNombre').value = "";
    document.getElementById('txtDescipcion').value = "";
}
//mueestra la tabla para eliminar de la base
btnBorrar.addEventListener('click', function(){
    document.getElementById('borrarBase').style.display = 'block';
})
//oculta la tablar de eliminar de la base
btnCanBorrador.addEventListener('click', function(){
    document.getElementById('borrarBase').style.display = 'none';
    txtIdBorrar.value = '';
})
//oculta la tabla para ver los datos
btnCerrarDatos.addEventListener('click', function(){
    document.getElementById('anadirTabla').style.display = 'none';
})

//verificacion que los campos no esten vacios
btnIngresar.addEventListener('click', function(){
    if(titulo.value !== '' && descripcion.value !== ''){
        //llama a la funcion para mandarlo a la base de datos
        guardarNotaClase();

        //limpiar los campos
        titulo.value = '';
        descripcion.value = '';
        prioridad.value = 'Baja';

        //ocultar la tabla
        document.getElementById('tablaParaAnadir').style.display = "none";
        document.getElementById('txtNombre').value = "";
        document.getElementById('txtDescipcion').value = "";

    }
    else{
        alert('Rellene todos los campos');
    }
})
//fuccion para guardar en la base de datos
function guardarNotaClase(){
    var id = document.getElementById('txtNombre').value;
    db.collection('notaclase').doc(id).set({
        nombre:document.getElementById('txtNombre').value,
        descripcion:document.getElementById('txtDescipcion').value,
        prioridad:document.getElementById('prioridad').value
    })
    .then(() => {
        alert('Los datos se ingresaron correctamente');
    })
    .catch((error) => {
        console.log('Hubo un error.' + error);
    });
}

//mostrar los datos de la base
function verNotas(){
    document.getElementById('anadirTabla').style.display = "block";
    db.collection("notaclase").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            document.getElementById("descripcion").innerHTML=`${doc.data().descripcion}`;
            document.getElementById("nombre").innerHTML=`${doc.data().nombre}`;
            document.getElementById("prioridad1").innerHTML=`${doc.data().prioridad}`;
        });
    });
}

//borrar de la base de datos
bntBorrarBase.addEventListener('click', function(){
    var id = document.getElementById('txtIdBorrar').value;
    if(id !== '')
    {
        db.collection('notaclase').doc(id).delete().then(() => {
            alert('Se ha eliminado exitosamente.')
        }).catch((error) => {
            alert(error)
        });

        document.getElementById('txtIdBorrar').value = '';
        document.getElementById('borrarBase').style.display = 'none';
    }
    else
    {
        alert('Tiene ingrese el nombre de la nota a eliminar.');
    }
})

