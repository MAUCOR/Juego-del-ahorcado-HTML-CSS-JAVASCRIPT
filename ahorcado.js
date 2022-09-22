
btnInicar=document.querySelector("#iniciar");
let palabras=["HTML","CSS","JAVASCRIPT","JAVA"];
let palabraSecreta="";
const btnLetras=document.querySelectorAll("#letras button");
const imagen= document.getElementById('imagen');
let cant_errores=0;
let cant_aciertos=0;


//Empezar el juego

document.getElementById("nuevasPalabras").style.display="none";
document.getElementById('contenedor').style.display="none";

function iniciar(event) {
    document.getElementById("iniciall").style.display="none";
    document.getElementById("nuevasPalabras").style.display="none";
    document.getElementById("body").style.background="url(imagenes/atardecer-morado.jpg) no-repeat center";
    document.getElementById("body").style.backgroundSize="cover";
    document.getElementById('contenedor').style.display="flex";
    imagen.source= 'imagen/img0.png';
    cant_errores=0;
    cant_aciertos=0;
    elegirPalabraSecreta();
}

btnInicar.addEventListener('click',iniciar);


// boton para entrar al apartado de ingresar palabra
let btnIngresarPalabra=document.getElementById('ingresarPalabra');
function ingresarPalabra() {
    document.getElementById("iniciall").style.display="none";
    document.getElementById('contenedor').style.display="none";
    document.getElementById("nuevasPalabras").style.display="block";
    document.getElementById('body').style.background= "url(imagenes/montanas-con-nieve.jpg) no-repeat center";
    document.getElementById('mostrarArray').innerHTML=palabras;
}
btnIngresarPalabra.onclick=ingresarPalabra;

let agregarTexto=document.getElementById('agregarTexto');
let btnComenzar=document.getElementById('comenzar');

btnComenzar.addEventListener('click',iniciar);


// agregar nuevas palabras al array
function nuevaPalabra() {
    let palabraTexto= document.getElementById('palabrasTexto').value.toUpperCase();
    palabras.push(palabraTexto);
    document.getElementById('mostrarArray').innerHTML=palabras;
    console.log(palabras);
}

agregarTexto.onclick=nuevaPalabra;

//elige al azar entre el array de palabras
function elegirPalabraSecreta() {
    const cant_palabras=palabras.length;
    let palabraAlAzar= palabras[Math.floor(Math.random()*cant_palabras)];
    palabraSecreta=palabraAlAzar;
    console.log(palabraSecreta);

    const palabrasOculta=document.getElementById("palabra_a_adivinar");

    for (let i = 0; i < palabraSecreta.length; i++) {
        const span=document.createElement( 'span' );
        palabrasOculta.appendChild(span);
    } 
}

//Click de adivinar letra
for (let i = 0; i < btnLetras.length; i++) {
    btnLetras[i].addEventListener('click',clickLetras);
}

function clickLetras(event) {
    const spansCorrecto= document.querySelectorAll('#palabra_a_adivinar span');
    const button=event.target;
    button.disabled=true;
    button.style.background="grey";
    button.style.transform="none";
    button.style.border="none";
    button.style.color="white";
    console.log(palabraSecreta);

    const letra=button.innerHTML.toUpperCase( );
    const palabra= palabraSecreta.toUpperCase( );
    let acerto=false;
    for (let i = 0; i < palabra.length; i++) {
        if (letra==palabra[i]) {
            spansCorrecto[i].innerHTML=letra;
            cant_aciertos++;
            acerto=true;
        }
    }

    if (acerto==false) {
        cant_errores++;
        const source=`imagenes/img${cant_errores}.png`;
        const imagen= document.getElementById('imagen');
        imagen.src=source;
    }
    
    if (cant_errores==6) {
        document.getElementById('resultado').innerHTML="Perdiste, la palabra era: "+palabra;
        setTimeout(finDelJuego,3000);
    }else if(cant_aciertos==palabra.length){
        document.getElementById('resultado').innerHTML="Has ganado";
        setTimeout(finDelJuego,3000);
    }
    console.log(letra+" " +palabra+" "+acerto);
}

//me redirecciona al inicio
function finDelJuego() {
    window.location.href = "index.html";
}
