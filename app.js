/*
Para interactuar con los elementos (objetos) de HTML estos se llaman a js a traves de selectores

DOM (Document Object Model)
es la información que entrega HTML a js con su descripción y asi puedan interactuar

CSS es la parte estetica
HTML es la esctructura
JS es la parte funcional
*/


/*
asigna el selector h1 a una variable que es de tipo objeto:

un objeto tiene metodos que definen su comportamiento en este caso el metodo tiene texto

*/
/*let titulo = document.querySelector("h1");  // metodo que permite acceder a los elementos del HTML (selectores) y 
recibe el h1 del archivo HTML

titulo.innerHTML = "Juego del numero secreto"; //el inner es un metodo disponible para el objeto titulo, que ingresa un texto
let descripcion = document.querySelector("p");
descripcion.innerHTML = "Selecciona un numero entre 1 y 10";
(es una forma de hacerlo sin funcion pero es repetitivo, al usar función, mejoras el codigo)*/


let numeroSecreto = 0;
let intentos = 0; //es un contador para llevar la suma de los intentos del usuario
let listaNumeroAleatorios = []; // es la forma de declarar un arreglo y se va usar para almacenar los numeros generados 
let numeroMaximo = 10; //numero maximo de numeros a generar 
let intentosDisponibles = 15; //los intentos que tiene el usuario disponibles
let i = 0;

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return; //es buena practica agregar return
}

// js tiene eventos que pueden ser cuando el usuario da click en un boton del HTML
function verificarIntento() { // es la manera de crear una función
    let numeroDeUsuario = parseInt(document.getElementById("valorUsuario").value);
    /*getElementbyId esta es otra forma de usar el querySelector y es obtener el selector por su id y no por el nombre
    debido a que pueden existir varios selectores con el mismo nombre, despues el .value siginifica que atributo de ese
    objeto se va obtener en este caso queremos obtener el valor de ese input
    aquí NumeroDeUsuario recibe el valor del input (valorUsuario) declarada en el HTML*/

    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento("p", `Acertaste el número en ${intentos} ${(intentos === 1) ? "vez" : "veces"}`);
        //uso de template string con operador ternario que realiza un if dentro
        document.getElementById("reiniciar").removeAttribute("disabled");
        /*
        Aqui se activo el botón nuevo juego y se obtiene el objeto por su id y despues se modifica uno de sus atributos
        en este caso queremos eliminar uno de sus atributos que es si esta activo o no el botón
        y aquí lo que pasa es que una vez que adivinas el numero el botón se habilita para un nuevo juego
        */
    }
    else {
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento("p", "El numero es menor");
        }

        else {
            asignarTextoElemento("p", "El numero es mayor");
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

//esta función es para dejar vacio el valor del input
function limpiarCaja() {
    document.querySelector("#valorUsuario").value = "";
    /*aqí se usa el querySelector para obtner el parametro por ID es igual
     al getElementbyID pero más generico por eso se debe agregar el "#" que siginifca obtner el id del objeto.
     despues al tener el objeto le damos un valor con el .value y en este caso es vacio.*/
}

function generarNumeroSecreto() {

    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;  //no necesitamos declarar variables en funciones
    //si ya jugo con todos los numeros posibles del valor maximo
    if (listaNumeroAleatorios.length == numeroMaximo) { //esta es la condición de salida de la función con recursividad 
        asignarTextoElemento("p", "Alcanzaste el numero maximo de numeros sorteados");
    } else if (i >= intentosDisponibles) {
        asignarTextoElemento("p", "Alcanzaste el limite de intentos");
    } else {
        //si el numero generado esta incluido en la lista hacemos algo
        if (listaNumeroAleatorios.includes(numeroGenerado)) {
            return generarNumeroSecreto();  //recursividad.. es reutilizar en este caso la función generada, aquí al ser el mismo numero
            //regresa otra vez la función con un nuevo numero generado, en recursividad siempre debe existir una condición de salida

        } else {
            listaNumeroAleatorios.push(numeroGenerado);
            i++;
            return numeroGenerado;

        }
        //lo que hace la función es regresar el numero aleatorio
    }
}

function condicionesIniciales() {

    asignarTextoElemento("h1", "Juego del numero secreto"); //aqui ejecuta la función que fue declarada
    asignarTextoElemento("p", `Selecciona un numero entre 1 y  ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    console.log(numeroSecreto);
}


function reiniciarJuego() {
    //limpiar la caja o el objeto input
    limpiarCaja();
    //indicar condiciones de inicio que son los intervalos de numeros, reiniciar los intentos y generar un nuevo numero aleatorio
    condicionesIniciales();
    //deshabilitar el boton de nuevo juego
    document.querySelector("#reiniciar").setAttribute("disabled", "true"); //aqui se llama el boton por su ID para deshabilitarlo
    //necesita dos atributos el setAttrubute que es colocar algo con un valor; que es disabled con valor true

    return;
}

condicionesIniciales();