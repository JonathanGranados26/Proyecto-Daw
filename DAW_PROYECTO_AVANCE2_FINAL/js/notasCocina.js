//variables que usaremos
const btnAbrir = document.getElementById('btnAbrir');
const btnCancelar = document.getElementById('btnCancelar');
const btnAgregar = document.getElementById('btnAgregar');
const btnBorrar = document.getElementById('btnBorrar');
const btnVer = document.getElementById('btnVer');
const btnCanBorrador = document.getElementById('btnCanBorrador');
const bntBorrarBase = document.getElementById('bntBorrarBase');
const btnCerrarDatos = document.getElementById('btnCerrarDatos');

var nombreReceta = document.getElementById('txtTitulo');
var tiempo = document.getElementById('txtTiempo');
var dificultad = document.getElementById('seleciondif');
var ingredientes = document.getElementById('txtIngredientes');
var proceso = document.getElementById('txtProceso');

//habre la tabla para ingresar los datos
btnAbrir.addEventListener('click', function(){
    document.getElementById('agregarNota').style.display = "block";
})

//oculta la tabla pors si se desea cancelar
btnCancelar.addEventListener('click', function(){
    //limpia los los cuadros de texto
    nombreReceta.value = '';
    tiempo.value = '';
    dificultad.value = '';
    ingredientes.value = '';

    document.getElementById('agregarNota').style.display = "none";
})

//habre la tabla para borrar de la base
btnBorrar.addEventListener('click', function(){
    document.getElementById('borrarBase').style.display = 'block';
})

//ocultar la tablar por si desea cancelar el eliminar de la base
btnCanBorrador.addEventListener('click', function(){
    document.getElementById('borrarBase').style.display = 'none';
    document.getElementById('txtIdBorrar').value = '';
})

//cerrar la tabla de ver datos
btnCerrarDatos.addEventListener('click', function(){
    document.getElementById('anadirTabla').style.display = 'none';
})

btnAgregar.addEventListener('click', function(){
    if(nombreReceta.value !== '' && tiempo.value !== '' && ingredientes.value !== '' && proceso.value !== '')
    {
        //guardar los datos en la base
        notasCocina();

        //limpiar los campos donde se llena la info
        nombreReceta.value = '';
        tiempo.value = '';
        dificultad.value = '';
        ingredientes.value = '';
        document.getElementById('agregarNota').style.display = "none";
    }
    else
    {
        alert('Rellene todos los campos.');
    }
})

//guardar nota cocina en firebase
function notasCocina(){
    //darle un nombre especifico a la coleccion
    var id = document.getElementById('txtTitulo').value;
    db.collection("notacocina").doc(id).set({
        nombrereceta:document.getElementById("txtTitulo").value,
        dificultad:document.getElementById("seleciondif").value,
        ingredientes:document.getElementById("txtIngredientes").value,
        procedimiento:document.getElementById("txtProceso").value,
        tiempo:document.getElementById("txtTiempo").value
    })
    .then(() => {
        alert('Los datos se ingresaron correctamente');
    })
    .catch((error) => {
        alert('Hubo un error.' + error);
    });
}


//mostrar desde la base
btnVer.addEventListener('click', function(){
    document.getElementById('anadirTabla').style.display = "block";
    db.collection("notacocina").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            document.getElementById("txtTitulo1").innerHTML=`${doc.data().nombrereceta}`;
            document.getElementById("txtTiempo1").innerHTML=`${doc.data().tiempo}`;
            document.getElementById("seleciondif1").innerHTML=`${doc.data().dificultad}`;
            document.getElementById("txtIngredientes1").innerHTML=`${doc.data().ingredientes}`;
            document.getElementById("txtProceso1").innerHTML=`${doc.data().procedimiento}`;
        });
    });
})


//borrar de la base de datos
bntBorrarBase.addEventListener('click', function borrarBase(){
    var id = document.getElementById('txtIdBorrar').value;
    if(id !== '')
    {
        db.collection("notacocina").doc(id).delete().then(() => {
            alert('Se ha eliminado exitosamente.')
        }).catch((error) => {
            alert(error);
        });

        document.getElementById('borrarBase').style.display = 'none';
        document.getElementById('txtIdBorrar').value = '';
    }
    else
    {
        alert('Tiene ingrese el nombre de la receta a eliminar.');
    }
})