var txtLista = document.querySelector('#txtLista');
var btnAnadir = document.querySelector('#btnIngresar');
var lista = document.querySelector('#contenidoDatos');
var empty = document.querySelector('#empty');

var registroLista = new Array;

btnAnadir.addEventListener('click', (e) =>{
    e.preventDefault();

    var listatxt = txtLista.value;

    if(listatxt !== "")
    {
        guardarcompra();
        var li = document.createElement('li');
        var p = document.createElement('p');
        p.textContent = listatxt;

        li.appendChild(elementoChecked())
        li.appendChild(p);
        li.appendChild(elemetoBorrar());
        registroLista = lista.appendChild(li);

        txtLista.value = "";
    }
    else{alert('Ingrese alguna compra');}
});

//boton que borra los elementos de la lista
function elemetoBorrar(){
    var btnBorrar = document.createElement('button');
    btnBorrar.textContent = 'x';
    btnBorrar.id = 'btn-Borrar';

    btnBorrar.addEventListener('click',(e) =>{
        const item = e.target.parentElement;
        lista.removeChild(item);
    });
    return btnBorrar;
}

//agrega el check
function elementoChecked(){
    var check = document.createElement('input');
    check.setAttribute('type', 'checkbox');
    check.id = 'btncheckbox'
    return check;
}

//funcion lista compras para la base de datos
function guardarcompra(){
    var id = document.getElementById('txtLista').value;
    db.collection('lista compra').doc(id).set({
        Compras:document.getElementById("txtLista").value
    }).then(() =>{
        alert('Los datos se ingresaron correctamente');
    }).catch((error) => {
        alert('Hubo un error.' + error);
    });
}