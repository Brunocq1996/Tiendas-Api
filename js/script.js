document.querySelectorAll('.boton').forEach(item => {
    item.addEventListener('click', () => {
        ocultar(event)
        //handle click
    })
})

function ocultar(event) {
    var pantallaPrincipal = document.getElementById("pantallaPrincipal");
    pantallaPrincipal.style.display = "none";
    spinner.style.display = "block";
    console.log(event.target);
    if (event.target.getAttribute("id") == "XHR") {
        XHRGET();
    } else if (event.target.getAttribute("id") == "Fetch") {
        getFetch();
    } else {
        test();
    }

}

//XHR
async function XHRGET() {

    const consulta = new XMLHttpRequest();
    consulta.onreadystatechange = function () {
        if (consulta.readyState == 4) {
            if (consulta.status == 200) {

                console.log(consulta.responseText);
                var datos = JSON.parse(consulta.responseText);
                spinner.style.display = "none";
                crearLista(datos);

            }
            if (consulta.status == 404) {
                console.log('Error al conectar/ no encontrado');
            }
        }
    }
    consulta.open('GET', 'https://webapp-210130211157.azurewebsites.net/webresources/mitienda/', true)
    consulta.send();
}

// JQERY
function getJquery(ajaxurl) {
    return $.ajax({
        url: ajaxurl,
        type: 'GET',
    });
};

async function test() {
    try {
        var datos = await getJquery('https://webapp-210130211157.azurewebsites.net/webresources/mitienda/')
        spinner.style.display = "none";
        crearLista(datos);
    } catch (err) {
        console.log(err);
    }
}


//FETCH
async function getFetch() {
    var link;
  
    // if ((valor != null) && (valor != "")){
    //   link = "https://webapp-210130211157.azurewebsites.net/webresources/mitienda/" + valor;
    // }else{
      link = "https://webapp-210130211157.azurewebsites.net/webresources/mitienda/";
    // }
  
    return await fetch(link)
    .then(response => response.text())    
    .then(datosSinJson => {
      var datos=JSON.parse(datosSinJson)
      spinner.style.display = "none";
      crearLista(datos);
      
    })
    
  }



function crearLista(datos) {
    var main=document.getElementsByTagName("main")[0];
    console.log(main);
    main.style.height = "auto";
    console.log(datos);     
    var lista = document.getElementById("lista");
    var buscadorLista=document.getElementById("buscadorLista")
    buscadorLista.style.display="block"
    datos.forEach(element => {
        var div = document.createElement("div");
        var h1 = document.createElement("h1");
        var textoH1 = document.createTextNode(element.nombreTienda)
        h1.appendChild(textoH1);
        div.appendChild(h1);
        var pDireccion = document.createElement("p");
        var textoPDireccion = document.createTextNode(element.direccion + " " + element.localidad);
        pDireccion.appendChild(textoPDireccion);
        div.appendChild(pDireccion);
        var pTelefono = document.createElement("p");
        var textoPTelefono = document.createTextNode(element.telefono);
        pTelefono.appendChild(textoPTelefono);
        div.appendChild(pTelefono);
        lista.appendChild(div);
    });


}

