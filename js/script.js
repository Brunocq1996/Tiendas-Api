var datos;
document.querySelectorAll('.boton').forEach(item => {
    item.addEventListener('click', () => { ocultar(event)
      //handle click
    })
})
var xhr=document.getElementById("XHR");
xhr.addEventListener('click', ()=> ocultar(event));
var spinner=document.getElementById("spinner");

function ocultar(event){
    var pantallaPrincipal=document.getElementById("pantallaPrincipal");
    pantallaPrincipal.style.display="none";
    spinner.style.display="block";
    console.log(event.target);
    if(event.target.getAttribute("id")=="XHR"){
        XHRGET();
    }else if(event.target.getAttribute("id")=="Fetch"){
        console.log("Fetch");        
    }else{
        datos=getJquery();
        crearLista();
    }   
    
}

async function XHRGET(){
    
    const consulta = new XMLHttpRequest();
    consulta.onreadystatechange = function(){
        if (consulta.readyState == 4) {
            if (consulta.status == 200) {

                console.log(consulta.responseText);
                datos = JSON.parse(consulta.responseText);
                //OCULTAR LOADER
                spinner.style.display = "none";
                //document.getElementById("NewTyBus").style.display = "flex";
                crearLista();
                //constructor(datos);

            }
            if (consulta.status == 404) {
                console.log('Error al conectar/ no encontrado');
            }
        }
    }
    consulta.open('GET','https://webapp-210130211157.azurewebsites.net/webresources/mitienda/',true)
    consulta.send();
}
async function getJquery() {
    return await $.ajax({
     type: "GET",
     url: "https://webapp-210130211157.azurewebsites.net/webresources/mitienda/",
     async: true,
     dataType: "json",
     success: datos => {
       spinner.style.display= "none";       
       return datos;
     }
   });
 }
console.log(datos);

function crearLista(){
    console.log(datos);
    var main=document.getElementsByTagName("main")[0];
    console.log(main);
    var lista=document.createElement("div");
    lista.setAttribute("id", "lista");
    main.appendChild(lista);
    datos.forEach(element => {        
        var div=document.createElement("div");
        var h1=document.createElement("h1");
        var textoH1=document.createTextNode(element.nombreTienda)
        h1.appendChild(textoH1);
        div.appendChild(h1);
        var pDireccion=document.createElement("p");
        var textoPDireccion=document.createTextNode(element.direccion+" "+element.localidad);
        pDireccion.appendChild(textoPDireccion);
        div.appendChild(pDireccion);
        var pTelefono=document.createElement("p");
        var textoPTelefono=document.createTextNode(element.telefono);
        pTelefono.appendChild(textoPTelefono);
        div.appendChild(pTelefono);
        lista.appendChild(div);
    });
    

}