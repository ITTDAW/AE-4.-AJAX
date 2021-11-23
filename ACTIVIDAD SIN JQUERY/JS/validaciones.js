
/*El evento onload, se dispara al final del proceso de carga del documento. Es decir, cuando todos los objetos del DOM 
(imágenes, flash, scripts, frames) han terminado de cargarse. Una excepción son las hojas de estilo, que no siempre están 
cargadas al momento de lanzarse este evento. */

window.onload= function(){
    //Cuando pulsemos el input button con id=procesar del formulario , activamos la funcion de validacion que tenemos descrita debajo.
    //Si todos en todos los campos que validamos no obtenemos un ningun false, la validacion sera correcta. Si obtenemos algun
    //false, mostraremos un alert y no podremos enviar los datos del formulario
    //Hemos utilizado un boton y no un submit para poder utilizar los sweet alert. De esta manera, el submit se realiza
    //cuando pulsamos el boton ok en el ultimo sweet alert de nuestro pedido.
    procesar.onclick =validacion;
    refrescar.onclick=refrescarDatosJson;
    /*Al mismo tiempo, vamos a realizar una petición AJAX al servidor para presentar los datos correspondientes a 
    tamaño e ingredientes de la pizza, para ello ejecutamos la siguiente función que se encuentra en el archivo ajax.js */
    CargarPaginaConDatos();
   

   
}

function validacion(){
   

    //AQUI VALIDAMOS QUE TODOS LOS CAMPOS TIENEN QUE ESTAR CUBIERTOS
    /*Con el  método trim( ) nos devuelve la cadena de texto despojada de los espacios en blanco en ambos extremos. 
    Además el método no afecta al valor de la cadena de texto. Por lo tanto si el valor de los campos que tenemos definidos
    a continuacion quitando los espacios en blanco, estan vacios mostraremos el alert y devolveremos el false en la funcion */


   if (nombre.value.trim() == "" || telefono.value.trim()=="" || direccion.value.trim()=="" || email.value.trim()=="") {
        // Si no se cumple la condicion...
        swal({
            type: 'error',
            title: 'Oops...',
            text: 'Los campos Nombre, Direccion, Telefono y Email deben de estar cubiertos',
            footer: '<a href="">Rellena todos los campos para hacer un pedido</a>'
          })
       
        return false;
    }


     //AQUI IMPLEMENTAMOS CON EXPRESIONES REGULARES QUE LA PRIMERA LETRA DEL NOMBRE EMPIECE POR MAYUSCULAS
     /*Definimos nuestra variable primeramayuscula de tal forma que nuestra palabra tiene que empezar por una letra(^) del rango que 
     establecemos [A-Z]*/
     let primeramayuscula = /^[A-Z]/
    
     /*Con el metodo match nos devuelve todas las ocurrencias que haya dentro de una cadena teniendo en cuenta una expresión regular 
     establecida. Nosotros mediante el condicional if, le decimos que si no existe la ocurrencia de que nuestra palabra empiece por
     mayuscula, enviamos un alert y devolvemos false en la funcion*/
    
    
    
     if (!nombre.value.match(primeramayuscula)){
        swal({
            type: 'error',
            title: 'Oops...',
            text: 'El nombre debe de tener la primera letra Mayúscula',
            footer: '<a href="">Escribe la primera letra mayúscula en el nombre</a>'
          })
          return false;
      }

      //AQUI IMPLEMENTAMOS QUE EL TELEFONO SEA NUMERICO Y SOLO TENGA 9 CARACTERES

      /*De la misma forma que antes, definimos la expresion regular que queremos y la introducimos en nuestra variable
      En este caso le decimos que tiene que empezar por un caracter comprendido entre [0-9] y que la longitud debe de ser de 9 numeros exactos */
    
    
    
      let tel=/^[0-9]{9,9}$/;
      /*El metodo match nos devuele las ocurrencias que haya dentro de la cadena si cumple con nuestra expresion regular, con nuestro 
      condicional if, comprobamos si es falsa esta ocurrencia, pues devolvemos el alert correspondiente y retornamos false en la funcion */
    
    
      if (!telefono.value.match(tel)){
        swal({
            type: 'error',
            title: 'Oops...',
            text: 'El teléfono puede ser movil o fijo, pero ha de tener 9 digitos',
            footer: '<a href="">9 digitos en tu telefono</a>'
          })
         return false;
     }

     //AQUI IMPLEMENTAMOS QUE EL CORREO SEA UN CORREO VALIDO

     /*Definimos una expresión regular para una implementación válida para la mayoria de correos
     Empieza con cualquier caracter menos la @ despues debe de llevar una @ seguido de caracteres excepto @ y cuando lleve el punto, puede llevar
    caracteres letras minimo 2*/
    let correo=/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/

    /*Volvemos a analizar con el condicional if y el metodo match si se produce la ocurrencia de nuestra expresion regular */
    
    
    if (!email.value.match(correo)){
        //Si no se produce devolvemos el alert y el false 
        swal({
            type: 'error',
            title: 'Oops...',
            text: 'El campo email debe de tener un formato correcto',
            footer: '<a href="">Pon un correo electronico correcto</a>'
          })
       return false;
    }



    

    //AQUI VALIDAMOS QUE ESCOGEMOS AL MENOS UN TAMAÑO DE LA PIZZA

    //Seleccionamos nuestro grupo de input radio mediante el name que le definimos en el html y lo introducimos en la variable tamaño
    tamaño=document.getElementsByName("tamaño");
    //Definimos una variable llamada check y la ponemos a false
    let check=false;
    //Definimos la variable ipara el for que despues la utilizaremos para nuestro switch, por esa razon tiene que definirse aqui
    let i;
    //Ahora mediante un bucle for, recorremos el tamaño del array que forma nuestra variable tamaño con los elementos agrupados radio por name
    for(i=0;i<tamaño.length;i++){
        //Cuando el elemento correspondiente se encuentre checked ponemos la variable check a true y salimos del bucle
        if (tamaño[i].checked==true){
            check=true;
            break;
        }
    }
    //Si hemos salido del bucle y la variable check no esta a true, devolvemos un alert y enviamos un false.
    if(check==false){
        swal({
            type: 'error',
            title: 'Oops...',
            text: 'Debes de seleccionar un tamaño de la pizza',
            footer: '<a href="">Escoge un tamaño de pizza</a>'
          })
        return false;
    
    }

 
    
    //AQUI VALIDAMOS QUE ALGUN INGREDIENTE SE ENCUENTRE SELECCIONADO
    //Con checked obligamos a que algun ingrediente se encuentre seleccionado
    ingredientes=document.getElementsByName("ingredientes");
    let check2=false;
    for(i=0;i<ingredientes.length;i++){
        //Cuando el elemento correspondiente se encuentre checked ponemos la variable check a true y salimos del bucle
        if (ingredientes[i].checked==true){
            check2=true;
            break;
        }
    }
    if(!check2){
        //Si no hay ninguno seleccionado, devolvemos un alert y un false.
        swal({
            type: 'error',
            title: 'Oops...',
            text: 'Selecciona al menos un ingrediente en la pizza',
            footer: '<a href="">Escoge al menos un ingrediente</a>'
          })
        return false;

    }

    CargarPaginaParaPrecios();


  

    //SI TODAS LAS VALIDACIONES NO DEVUELVEN NINGUN FALSE, PODEMOS CALCULAR EL PRECIO DE NUESTRA PIZZA

    //Primero mostramos un alert con el tamaño de la pizza pedida y el precio que supone ese tamaño, tenemos los valores en las variables que hemos guardado
    // swal("La pizza pedida es: \n"
    // + "Tamaño : "+ tam.toUpperCase() + " " + preciotamaño + " euros" );

    /*Despues para saber cuantos ingredientes hemos seleccionado, seleccionamos nuestro grupo checkbox con el name que le establecimos
    en el html y lo recorremos con un bucle for */
    
   
    
    

    //Con el siguiente alert mostramos el numero total de ingredientes que hemos seleccionado y el precio de los mismos
    // swal("Has añadido :\n"+ 
    // precioingredientes + " ingredientes: " + precioingredientes + "euros.")

    //Y en el ultimo sweet alert devolvemos el valor total de la pizza desglosando sus apartados
   
   
      
    
   
     


     
            
}





