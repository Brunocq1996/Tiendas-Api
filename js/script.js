
var xhr=document.getElementById("XHR");
xhr.addEventListener('click', ()=> ocultar());
var spinner=document.getElementById("spinner");

function ocultar(){
    var pantallaPrincipal=document.getElementById("pantallaPrincipal");
    pantallaPrincipal.style.display="none";
    spinner.style.display="block";
    XHRGET();
}
var datos;
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

console.log(datos);