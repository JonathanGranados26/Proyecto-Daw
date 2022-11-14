// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANslGc4nYyKbaKyqjpYs-rcTF0xeBYv-Y",
  authDomain: "proyecto-15e02.firebaseapp.com",
  projectId: "proyecto-15e02",
  storageBucket: "proyecto-15e02.appspot.com",
  messagingSenderId: "301855790332",
  appId: "1:301855790332:web:f686873f342b8dff553379"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Codigo para Agregar un nuevo usuario
let db=firebase.firestore();
const Usuarios=(Usuario)=>{

db.collection("Usuarios").add({Usuario})({ 
    Usuario
})

.then(function(docRef){
    MJSOK();

})
.catch(function(docRef){
    MJSOKerror();
})

}

//alerta de registro
const MJSOK=()=>{
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Registro Exitoso',
        showConfirmButton: false,
        timer: 1500
      })
}
//ALERTA de error de registro
const MJSOKerror=()=>{
Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
    footer: '<a href="">Why do I have this issue?</a>'
  })
   }

  $("btnguardar").on('click',() =>{
    let Correo = $("Correo").val();
    let Password = $("Password").val();
    let Usuario = $("Usuario").val();

    const usu ={
        Correo,
        Password,
        Usuario
    }

    Usuarios(usu);
  })

//alerta de Login
const MJSO2=()=>{
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Usuario Ingresado Exitosamente',
        showConfirmButton: false,
        timer: 1500
      })
 }
