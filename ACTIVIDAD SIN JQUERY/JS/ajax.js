//En una peticion asincrona el JS de nuestro navegador NO se queda bloqueado, por lo 
//que tenemos que tener una funcion de callback que se ejecutará cuando el servidor
//nos mande la respuesta

function CargarPaginaConDatos(){
    //El puerto que utiliza el live Server de Visual Code, recuerda que si lo tienes ocupado, live Server abre otro puerto y lo deberias de cambiar
    const URL_DESTINO = "http://localhost:5500/"
    const RECURSO = "pizzeria.json"
    
       
      
    //Siempre hay que formar el objeto XMLHttpRequest  
            let xmlHttp = new XMLHttpRequest()
            let procesar=document.querySelector("#procesar");
            xmlHttp.onreadystatechange = function () { //Esta funcion se va a ejecutar CADA VEZ que haya un cambio en la propiedad
                //"readyState"
                 //Solo cuando la respuesta este completa y su estado sea 200 (OK) leeremos el mensaje
        //del servidor y la procesamos
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        
                        //Llamamos a nuestra funcion procesarRespuesta y le enviamos el objeto en String por parametro
                        procesarRespuesta(this.responseText)
                        

                       
                    }
                     else {
                        alert("ALGO VA MAL! ESTAS CONECTADO AL SERVIDOR?. LOS DIRECTORIOS DE CON jQUERY Y SIN_JQUERY DEBEN DE ABRIRSE POR SEPARADO EN VISUALCODE")
                    }
                }
            }
           // Para enviar una solicitud al servidor, se utiliza el método Open del objeto XMLHttpRequest () y send ():
            xmlHttp.open('GET', URL_DESTINO + RECURSO, true)
            xmlHttp.send(null)
        
    
}


function procesarRespuesta(jsonDoc) {
    //Convertimos un String a un objeto JSON
    var objetoJson = JSON.parse(jsonDoc)
    
    

    
    
    
    /**
     * Ahora con nuestro objeto JSON, accedemos a los tamaños de la pizza y los introducimos en un array, tendremos un array de objetos
     * ya que tamaños esta formado por TAMAÑO y PRECIO
     */ 
    let arrayTamaños=objetoJson.PIZZA.TAMAÑOS;
    /**
     * Accedemos a los ingredientes de la pizza y los introducimos en un array, tendremos un array de objetos
     * ya que ingredientes esta formado por INGREDIENTES y PRECIO
     */ 
    let arrayIngredientes=objetoJson.PIZZA.INGREDIENTES;
    
    
   
   
    /*A continuacion vamos a formar nuestros elementos del formulario que estan a la espera de recibir los datos del json. En este caso
    estamos esperando a los valores de los tamaños y los ingredientes.
    Para la parte de tamaños, tenemos que formar los radio button correspondientes e introducirlos en el fieldset existente.
    Seleccionamos el elemento fieldset cuadrocheck y lo introducimos en una variable*/
    let cuadrocheck=document.querySelector("#cuadrocheck");
    
    //Con un for recorremos nuestro arrayTamaños que hemos definido anteriormente
    for (let i = 0; i < arrayTamaños.length; i++) {
        //Para cada elemento del array formamos un div y le ponemos el nombre de clase para bootstrap
        let div=document.createElement("div");
        div.className="form-check";
        //Para cada elemento creamos un input, le decimos que es de tipo radio , le introducimos el name tamaño para que formen todos parte del mismo bloque
        //le introducimos el nombre de la clase correspondiente para formato bootstrap
        let input=document.createElement("input");
        input.type="radio";
        input.name="tamaño";
        input.className="form-check-input";
        //creamos una etiqueta para cada radio
        let label=document.createElement("label");
        //Creamos una variable texto que contiene el nombre de cada tamaño segun su indice
        let texto=arrayTamaños[i].TAMAÑO
        //Le introducimos el nombre a la etiqueta la primera en mayuscula y lo restante en minuscula
        label.textContent=texto[0].toUpperCase()+(texto.slice(1).toLowerCase());
        //le establecemos el for a la etiqueta
        label.htmlFor=texto;
        //le establecemos el id al input
        input.id=texto;
        //agregamos al div creado al principio el input y el label
        div.appendChild(input);
        div.appendChild(label);
        
        //agregamos al fieldset el div
        
        cuadrocheck.appendChild(div);
    
    }

    //La forma de crear los checkbox para los ingredientes es de una manera analoga al anterior caso pero con los checkbox y los ingredientes
    let cuadroingredientes=document.querySelector("#cuadroingredientes");

    for (let i = 0; i < arrayIngredientes.length; i++) {
        let div=document.createElement("div");
        div.className="form-check form-switch";
        let input=document.createElement("input");
        input.type="checkbox";
        input.name="ingredientes";
        input.className="form-check-input"
        let label=document.createElement("label");
        let texto=arrayIngredientes[i].INGREDIENTE;
        label.textContent=texto[0].toUpperCase()+(texto.slice(1).toLowerCase());
        label.htmlFor=texto;
        input.id=texto;
        div.appendChild(input);
        div.appendChild(label);
        
        
        
        cuadroingredientes.appendChild(div);
    
    }
    
    
}


//Para traer los precios de los productos seleccionados por el cliente, hacemos una nueva peticion AJAX al servidor de la misma forma que 
//la anterior
function CargarPaginaParaPrecios(){
    const URL_DESTINO = "http://localhost:5500/"
    const RECURSO = "pizzeria.json"
    
       
           
    //Siempre hay que formar el objeto XMLHttpRequest
            let xmlHttp = new XMLHttpRequest()
            
            xmlHttp.onreadystatechange = function () {
                
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        
                        //Esta va a ser la funcion que se ejecutará para calcular el valor de los productos escogidos por el cliente
                        Respuesta(this.responseText)
                        
                        

                       
                    }
                     else {
                        alert("ALGO VA MAL! ESTAS CONECTADO AL SERVIDOR?")
                    }
                }
            }
             // Para enviar una solicitud al servidor, se utiliza el método Open del objeto XMLHttpRequest () y send ():
            xmlHttp.open('GET', URL_DESTINO + RECURSO, true)
            xmlHttp.send(null)
        
    
}

function Respuesta(jsonDoc) {
    //Convertimos un texto a un objeto JSON
    var objetoJson = JSON.parse(jsonDoc)
   
   //Creamos el array de objetos arrayTamaños y arrayIngredientes
    let arrayTamaños=objetoJson.PIZZA.TAMAÑOS;
    
    let arrayIngredientes=objetoJson.PIZZA.INGREDIENTES;
    

    let i=0;
    //Creamos una variable preciotamaño donde vamos a introducir el precio del tamaño escogido
    let preciotamaño=0;
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
    const URL_DESTINO = "http://localhost:5500/"
    const RECURSO = "pizzeria.json"
    
       
           
    //Siempre hay que formar el objeto XMLHttpRequest
            let xmlHttp = new XMLHttpRequest()
            
            xmlHttp.onreadystatechange = function () {
                
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        
                        //Esta va a ser la funcion que se ejecutará para calcular el valor de los productos escogidos por el cliente
                        RefrescarDatos(this.responseText)
                        
                        

                       
                    }
                     else {
                        alert("ALGO VA MAL! ESTAS CONECTADO AL SERVIDOR?")
                    }
                }
            }
             // Para enviar una solicitud al servidor, se utiliza el método Open del objeto XMLHttpRequest () y send ():
            xmlHttp.open('GET', URL_DESTINO + RECURSO, true)
            xmlHttp.send(null)
        
    
}

//Esta es nuestra funcion callback para refrescar los datos de los bloques correspondientes sin refrescar los otros campos

function RefrescarDatos(jsonDoc) {
    
     //Convertimos un texto a un objeto JSON
     
    //Vaciamos nuestros bloques que contienen los tamaños y los ingredientes para no acumular los nuevos sobre los viejos
    let cuadrocheck=document.querySelector("#cuadrocheck");
    let cuadroingredientes=document.querySelector("#cuadroingredientes");
    cuadrocheck.innerHTML="";
    cuadroingredientes.innerHTML="";
   
    //Llamamos a nuestra funcion ya creada que recibe nuestro objeto json nuevo por parametro y vuelve a crear los elementos necesarios
    procesarRespuesta(jsonDoc);
    
   
    
}





   