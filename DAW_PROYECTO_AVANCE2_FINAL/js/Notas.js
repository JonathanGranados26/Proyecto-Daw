var titulo = document.getElementById('txtTitulo');
var fecha = document.getElementById('dtpFecha');
var descricion = document.getElementById('txtDescipcion');
var alarma = document.getElementById('dtpAlarma');

const btnAgregar = document.getElementById('btnAgregar');
const btnCancelar = document.getElementById('btnCancelar');
const btnBorrar = document.getElementById('btnBorrar');
const btnCerrar = document.getElementById('btnCerrar');
const btnBorrarBase = document.getElementById('btnBorrarBase');

//fuciones para ocultar y mostrar las tablas
function mostrarTablaDatos(){
    document.getElementById('tablaParaAnadir').style.display = "block";
}
function ocutarTabla(){
    document.getElementById('tablaParaAnadir').style.display = "none";
}
btnCancelar.addEventListener('click', function(){
    document.getElementById('anadirTabla').style.display = 'none';
})

btnBorrar.addEventListener('click', function(){
    document.getElementById('borrarBase').style.display = 'block';
})

btnCerrar.addEventListener('click', function(){
    document.getElementById('borrarBase').style.display = 'none';
})


function guardarDatos(){
    //solo validar que los campos no esten vacios, y asi no se mande info vacia a la base
    if(titulo.value !== '' && fecha.value !== '' && descricion.value !== '' && alarma.value !== '')
    {
        //llamar a la funcion que rellena los datos a la base
        guardarRecordatorio();

        //limpiar los txtbox
        titulo.value = '';
        fecha.value = '';
        descricion.value = '';
        alarma.value = '';

        //ocultar la tabla
        document.getElementById('tablaParaAnadir').style.display = "none";
    }
    else
    {
        alert('Rellene todos los campos.');
    }
}

//guardar nota recordatorio en la base de datos
function guardarRecordatorio(){
    var id = document.getElementById('txtTitulo').value;
    db.collection('notasrecordatorios').doc(id).set({
        titulo:document.getElementById("txtTitulo").value,
        categoria:document.getElementById("selecionPri").value,
        fecha:document.getElementById("dtpFecha").value,
        alarma:document.getElementById("dtpAlarma").value,
        descricion:document.getElementById("txtDescipcion").value
    }).then(() =>{
        alert('Los datos se ingresaron correctamente');
    }).catch((error) => {
        alert('Hubo un error.' + error);
    });
}

//mostrar desde la base
function verRecordatorio(){
    document.getElementById('anadirTabla').style.display = "block";
    db.collection("notasrecordatorios").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            document.getElementById("txtTitulo1").innerHTML=`${doc.data().titulo}`;
            document.getElementById("dtpFecha1").innerHTML=`${doc.data().fecha}`;
            document.getElementById("txtDescipcion1").innerHTML=`${doc.data().descricion}`;
            document.getElementById("selecionPri1").innerHTML=`${doc.data().categoria}`;
            document.getElementById("dtpAlarma1").innerHTML=`${doc.data().alarma}`;
        });
    });
}

//borrar de la base de datos
btnBorrarBase.addEventListener('click', function(){
    var id = document.getElementById('txtIdBorrar').value;
    if(id !== '')
    {
        db.collection('notasrecordatorios').doc(id).delete().then(() => {
            alert('Se ha eliminado exitosamente');
        }).catch((error) => {
            alert(error);
        })

        document.getElementById('borrarBase').style.display = 'none';
        document.getElementById('txtIdBorrar').value = '';
    }
    else
    {
        alert('Tiene ingrese el nombre de la nota.');
    }
})