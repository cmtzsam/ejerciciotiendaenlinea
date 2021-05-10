// Funcion para desplegar el sidebar
function desplegarSidebar(){
    
    // Declarar elemento 
    const element = document.getElementsByClassName('sidebar');

    // Interactuar con la clase activa
    for(let i = 0; i < element.length; i++) {
        element.item(i).classList.toggle("active");
    }    

}

// Funcion para iterar entre secciones
function cambiarSeccion(e){
    
    // Declarar elemento 
    const element = document.getElementsByClassName('sectionChange');

    // Interactuar con la clase activa
    for(let i = 0; i < element.length; i++) {
        element.item(i).classList.toggle("active");
    }


    // Cerrar sidebar cuando se selecciona una seccion
    // Declarar elemento 
    const sideBarElement = document.getElementsByClassName('sidebar');
    
    for(let i = 0; i < sideBarElement.length; i++) {
        sideBarElement.item(i).classList.remove('active');
    }        


}



// Establecer la api y el contenedor de items
const APIKEY = 'http://www.omdbapi.com/?s=star+wars&apikey=b4e9feb4';
const CONTENEDOR = document.getElementById('targetBlock')

// Funcion para llamar a la API
function apiCall(){

    // Declarar variables
    let item, title, picture, relase;

    // Conectar la API
    fetch(APIKEY).then(response => response.json()).then(json => {
        
        // Iterar en los elementos
        // for ( let i = 0 ; i < json.Search.length ; i ++ ){
        for ( let i = 0 ; i < json.Search.length ; i ++ ){

            // Imprimir los valores de la api en consola --oculto
            // console.log(json.Search[i])

            // Crear un div por cada elemento y agregarle la clase item
            item = document.createElement("div");
            item.classList.add('item');
            
            // Obtener el titulo de las películas y crear un h3
            title = json.Search[i].Title;
            let h3 = document.createElement("h3");
            h3.textContent = title;

            // Poner precio a las películas y crear un h4
            relase = json.Search[i].Year;
            let h4 = document.createElement("h4");
            h4.textContent = Math.round(new Number(relase) * .05);

            // Obtener la imagen de las peliculas y crear el elemento img
            picture = json.Search[i].Poster;
            let img = document.createElement("img");
            img.src = picture;

            // Crear boton agregar carrito
            let botonAgregar = document.createElement("a");
            // Agregar clase y texto
            botonAgregar.classList.add('agregar');
            botonAgregar.textContent = "Agregar";
            // Agregar atributos
            botonAgregar.setAttribute('onclick', 'agregarElemento(this)');
            botonAgregar.setAttribute('precio', (Math.round(json.Search[i].Year*.05)));
            botonAgregar.setAttribute('title', (json.Search[i].Title));
            botonAgregar.setAttribute('picURL', (json.Search[i].Poster));
            // botonAgregar.setAttribute('id', ([i])); -------eliminar-------

            // Crear el item
            CONTENEDOR.appendChild(item);
            // Agregar los elementos
            item.appendChild(img);
            item.appendChild(h3);
            item.appendChild(h4);
            item.appendChild(botonAgregar)
            item.setAttribute('precio', (Math.round(json.Search[i].Year*.05)));
        }
        // Fin iteracion

    });
    // Fin API

} apiCall();
// Fin funcion para llamar a la API


// Empieza el codigo para el carrito

// Declaramos variables y contenedor de productos y precio total
let total = 0;
let conta = 0;
let valor = 0;
const CARRITOBLOCK = document.getElementById('targetProds');
const TOTALBLOCK = document.getElementById('totalBlock');

// Funcion para agregar elementos
function agregarElemento(e){

    // Incrementar el contador en 1
    ++conta;

    // Notificar que se agrego un producto
    alert("Producto agregado");    

    // Declarar las variables para construir el elemento
    let photoProd, producto, prodTitle;

    // Obtener el valor
    valor = new Number(e.getAttribute('precio'));
    total = total + valor;
    console.log( total );

    // Cambiar el texto del valor
    TOTALBLOCK.textContent = total;

    // Crear elemento para carrito y pasar la clase y atributo
    producto = document.createElement("div");
    producto.classList.add('producto');
    producto.setAttribute( 'idcartprod' , 'id' + conta );

    // Generar el titulo del producto
    prodTitle = e.getAttribute('title');
    let parraf = document.createElement('p');
    parraf.textContent = prodTitle;

    // Generar la imagen del producto
    photoProd = e.getAttribute('picURL');
    let img = document.createElement('img');
    img.src = photoProd;

    // Crear boton eliminar producto
    let botonEliminar = document.createElement("a");
    // Pasar la clase y texto
    botonEliminar.classList.add('eliminar');
    botonEliminar.textContent = "Eliminar"; 
    // Pasar atributos
    botonEliminar.setAttribute('onclick','eliminarElemento(this)');
    botonEliminar.setAttribute('idcartprod' , 'id' + conta);
    botonEliminar.setAttribute('precio', e.getAttribute('precio'));

    // Crear el elemento producto y agregar elementos
    CARRITOBLOCK.appendChild(producto);
    // producto.appendChild(img);
    producto.appendChild(parraf);
    producto.appendChild(botonEliminar);

}

// Funcion para eliminar un producto
function eliminarElemento(e){

    // Obtener el valor
    valor = new Number(e.getAttribute('precio'));
    total = total - valor;
    console.log( total );

    // Cambiar el texto del valor
    TOTALBLOCK.textContent = total;


    // Notificar que el producto se elimino
    alert("Producto eliminado");
    
    // Contar lo productos para posteriormente iterar
    let contProdsIt = document.getElementsByClassName('eliminar');

    // Obtener el atributo del boton al que se le dio clic
    // Para evaluarlo y posteriormente eliminar el producto
    let comparacion =  e.getAttribute('idcartprod') ;

    // Iterar sobre los productos para eliminar item
    for ( let i  = 0; i <= contProdsIt.length ; i++ ){

        // Se declara el producto a verificar a traves de una clase y posicion
        let productoVerificar = document.getElementsByClassName('producto').item(i);

        // Si ambos atributos son iguales se elimina el item
        if ( productoVerificar.getAttribute('idcartprod') == comparacion ){
            productoVerificar.remove();
        }   
    }



}

