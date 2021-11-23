//En una peticion asincrona el JS de nuestro navegador NO se queda bloqueado, por lo 
//que tenemos que tener una funcion de callback que se ejecutará cuando el servidor
//nos mande la respuesta

function CargarPaginaConDatos(){
    //El puerto que utiliza el live Server de Visual Code, recuerda que si lo tienes ocupado, live Server abre otro puerto y lo deberias de cambiar
    const URL_DESTINO = "http://localhost:5500/"
    const RECURSO = "pizzeria.json"
    
        //Con JQuery se hace así lo cual es mucho mas rapido que de la forma tradicional ahorrando bastante codigo.
    $.ajax({
        'type'  : 'GET', //Por defecto es GET
        'url'   : URL_DESTINO + RECURSO,
        'async' : true, //Por defecto es true
    }
        ).done(procesarRespuesta)//funcion de callback que ejecutamos si todo ha ido bien
        .fail(procesarError)//funcion de callback que ejecutamos si ha ido mal, optativa

}


//Aqui implementamos nuestra funcion callback que recibe nuestro objetoJson
// La principal diferencia al utilizar JQuery es que ya recibimos el objeto en formato JSON y no hace falta hacer un parse
function procesarRespuesta(objetoJSon) {
    
    
    /**
     * Ahora con nuestro objeto JSON, accedemos a los tamaños de la pizza y los introducimos en un array, tendremos un array de objetos
     * ya que tamaños esta formado por TAMAÑO y PRECIO
     */ 
    let arrayTamaños=objetoJSon.PIZZA.TAMAÑOS;
    /**
     * Accedemos a los ingredientes de la pizza y los introducimos en un array, tendremos un array de objetos
     * ya que ingredientes esta formado por INGREDIENTES y PRECIO
     */ 
    let arrayIngredientes=objetoJSon.PIZZA.INGREDIENTES;
    
    /*A continuacion vamos a formar nuestros elementos del formulario que estan a la espera de recibir los datos del json. En este caso
    estamos esperando a los valores de los tamaños y los ingredientes.
    Para la parte de tamaños, tenemos que formar los radio button correspondientes e introducirlos en el fieldset existente.
    Con JQUERY es todo mucho mas sencillo y rapido ya que se añade todo en forma de arbol. Nos hace falta el bucle for igualmente para
    añadir el correspondiente bloque segun se vaya recorriendo el array correspondiente*/

    
    
    for (let i = 0; i < arrayTamaños.length; i++) {
        
        let texto=arrayTamaños[i].TAMAÑO
        $("<div>", {
            'class': "form-check"
        }).append(
            $('<input>', {
                'class': "form-check-input",
                'type': 'radio',
                'name': 'tamaño',
            }),
            $('<label>', {
                'id': "texto",
                'text': texto[0].toUpperCase()+(texto.slice(1).toLowerCase()),
                
            })
    
        ).appendTo('#cuadrocheck');
    
    
    }

    //Para los ingredientes realizamos el mismo sistema que para tamaños

    for (let i = 0; i < arrayIngredientes.length; i++) {
        
        let texto=arrayIngredientes[i].INGREDIENTE;
        $("<div>", {
            'class': "form-check form-switch"
        }).append(
            $('<input>', {
                'class': "form-check-input",
                'type': 'checkbox',
                'name': 'ingredientes',
            }),
            $('<label>', {
                'id': "texto",
                'text': texto[0].toUpperCase()+(texto.slice(1).toLowerCase()),
                
            })
    
        ).appendTo('#cuadroingredientes');
    
    
    }
   
    
    
}


//Para traer los precios de los productos seleccionados por el cliente, hacemos una nueva peticion AJAX al servidor de la misma forma que 
//la anterior en formato JQUERY. Cada peticion AJAX lleva asociada su correspondiente funcion callback que es la que nos interesa.

function CargarPaginaParaPrecios(){
    //El puerto que utiliza el live Server de Visual Code, recuerda que si lo tienes ocupado, live Server abre otro puerto y lo deberias de cambiar
    const URL_DESTINO = "http://localhost:5500/"
    const RECURSO = "pizzeria.json"
    
        //Con JQuery se hace así
    $.ajax({
        'type'  : 'GET', //Por defecto es GET
        'url'   : URL_DESTINO + RECURSO,
        'async' : true, //Por defecto es true
    }
        ).done(Respuesta)//funcion de callback que ejecutamos si todo ha ido bien
        .fail(procesarError)//funcion de callback que ejecutamos si ha ido mal, optativa
        
    
      
    
                        
          
           
        
    
}




function Respuesta(objetoJson) {
   
   //Recibimos con JQUERY nuestro objeto ya en formato JSON
   //Creamos el array de objetos arrayTamaños y arrayIngredientes
    let arrayTamaños=objetoJson.PIZZA.TAMAÑOS;
    
    let arrayIngredientes=objetoJson.PIZZA.INGREDIENTES;
    

    let i=0;
    //Creamos una variable preciotamaño donde vamos a introducir el precio del tamaño escogido
    let preciotamaño=0;
    

    //Con JQUERY creamos una variable tamaño y le decimos que son los input con el name tamaño, por lo tanto sera una variable de tipo array
    let tamaño=$("input[name=tamaño]");
    //Recorremos el grupo de los radio, buscando cual esta checked, como todos tienen el mismo name, solamente habrá uno seleccionado,
    //cuando lo encuentra sale del bucle.
    for( i=0;i<tamaño.length;i++){
        
        if (tamaño[i].checked==true){
            //Establecemos el precio del tamaño escogido mediante buscando en nuestro array de objetos el objeto correspondiente al i y su precio establecido
            preciotamaño=arrayTamaños[i].PRECIO;
            break;
        }
    }
    
    //Ahora vamos a hacer lo mismo con los ingredientes
    //Creamos una variable en donde almacenaremos el precio de los ingredientes total
    let precioingredientes=0;
    
    //Creamos una variable en donde vamos a concatenar el texto ingrediente mas precio para la presentacion despues en el sweet alert
    let cadenaIngredientesAñadidos="";
    //Con JQUERY creamos una variable ingredientes que son los input con el name ingredientes, al ser un grupo será una variable de tipo array
    let ingredientes=$("input[name=ingredientes]");
        //Recorremos el array formado por los elementos ingredientes que tienen el mismo name, se podria recorrer tambien el arrayIngredientes
         for(let j=0;j<ingredientes.length;j++){
        //Cada vez que un ingrediente se encuentra seleccionado...
        if(ingredientes[j].checked==true){
            //Sumamos a nuestra variable el precio de ese ingrediente que lo sacamos segun el indice j que ocupa en ese array
            precioingredientes=precioingredientes+arrayIngredientes[j].PRECIO
           //Añadimos a nuestra cadena el nombre del ingrediente añadido y su precio
            cadenaIngredientesAñadidos=cadenaIngredientesAñadidos.concat(arrayIngredientes[j].INGREDIENTE+
            " "+arrayIngredientes[j].PRECIO + " euros"+" // ");
        }
        }
        

        //Ahora solo nos queda presentar en nuestro mensaje final los datos que hemos conseguido
        swal({
            title:"Has pedido una pizza \n"
             + arrayTamaños[i].TAMAÑO.toUpperCase() + " su precio es de " + arrayTamaños[i].PRECIO + " euros",
            text: "Has añadido los siguientes ingredientes:  \n" +cadenaIngredientesAñadidos,
            
            type: 'info',
           
            confirmButtonColor: '#3085d6',
           
            confirmButtonText: 'OK'
          }).then((result) => {
            
                swal(
    
                    {
                        title              : "El precio total de la pizza son: \n" + 
                        "TAMAÑO: "+ preciotamaño+ " euros\n" +
                        "INGREDIENTES: " + precioingredientes + " euros\n"+
                        "TOTAL: " +(preciotamaño+precioingredientes) + " euros",
                        text               : "¿Deseas hacer el pedido?",
                        type               : "success",
                        allowEscapeKey     : false,
                        allowOutsideClick  : false,
                        showCancelButton   : true,
                        confirmButtonColor : "#DD6B55",
                        confirmButtonText  : "Yes",
                        showLoaderOnConfirm: true,
                        closeOnConfirm     : false,
                        //en sweet alert para el submit es necesario el parametro preconfirm, sino no envia formulario, ya que tiene que ser async
                        preConfirm:   function (isConfirm) {
                        
                            if (isConfirm) {
                                //Aqui es donde hacemos el submit del formulario, cuando ya tenemos todo preparado
                                document.formulario.submit();
                                
                                return true;
                            }else{
                                return false;
                            }
                    
                            
                    
                        }
                    }
                
                   
                )    
    
    
       
    
            
          })
}


//Para la funcion refrescar datos de los bloques de tamaño e ingredientes hacemos otra peticion AJAX para traer nuestro archivo actualizado
function refrescarDatosJson(){
    //El puerto que utiliza el live Server de Visual Code, recuerda que si lo tienes ocupado, live Server abre otro puerto y lo deberias de cambiar
    const URL_DESTINO = "http://localhost:5500/"
    const RECURSO = "pizzeria.json"
    
        //Con JQuery se hace así
    $.ajax({
        'type'  : 'GET', //Por defecto es GET
        'url'   : URL_DESTINO + RECURSO,
        'async' : true, //Por defecto es true
    }
        ).done(RefrescarDatos)//funcion de callback que ejecutamos si todo ha ido bien
        .fail(procesarError)//funcion de callback que ejecutamos si ha ido mal, optativa
        
    
      
    
                        
          
           
        
    
}

//Esta es nuestra funcion callback para refrescar los datos de los bloques correspondientes

function RefrescarDatos(objetoJSon) {
    
    
    //Vaciamos nuestros bloques que contienen los tamaños y los ingredientes para no acumular los nuevos sobre los viejos
    $("#cuadrocheck").empty();
    $("#cuadroingredientes").empty();
   
    //Llamamos a nuestra funcion ya creada que recibe nuestro objeto json nuevo por parametro y vuelve a crear los elementos necesarios
    procesarRespuesta(objetoJSon);
    
   
    
}


function procesarError (error){
    alert("ALGO VA MAL! ESTAS CONECTADO AL SERVIDOR?. LOS DIRECTORIOS DE CON jQUERY Y SIN_JQUERY DEBEN DE ABRIRSE POR SEPARADO EN VISUALCODE");
}