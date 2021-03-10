document.querySelectorAll('.boton').forEach(item => {
    item.addEventListener('click', () => {
        ocultar(event)
        //handle click
    })
})
var ajax;
var aBuscar = false;
function ocultar(event) {
    var pantallaPrincipal = document.getElementById("pantallaPrincipal");
    pantallaPrincipal.style.display = "none";
    spinner.style.display = "block";
    // console.log(event.target);
    if (event.target.getAttribute("id") == "XHR") {
        XHRGET();
        ajax = "XHR"
    } else if (event.target.getAttribute("id") == "Fetch") {
        Fetch();
        ajax = "Fetch"
    } else {
        jQuery();
        ajax = "jQuery"
    }

}

//XHR
async function XHRGET(valor) {

    const consulta = new XMLHttpRequest();
    if ((valor != null) && (valor != "")) {
        consulta.open('GET', 'https://webapp-210130211157.azurewebsites.net/webresources/mitienda/' + valor, true)
        aBuscar = true;
    } else {
        consulta.open('GET', 'https://webapp-210130211157.azurewebsites.net/webresources/mitienda/', true)
    }
    consulta.send();
    consulta.onreadystatechange = function () {
        if (consulta.readyState == 4) {
            if (consulta.status == 200) {



                if (aBuscar) {
                    while (lugarBusca.firstChild) {
                        lugarBusca.removeChild(lugarBusca.firstChild);
                    }
                    botonBuscar.style.display = "none";
                    botonX.style.display = "block";
                    document.getElementsByTagName("svg")[0].style.display = "block";
                    document.getElementsByTagName("img")[1].style.display = "none";
                    lista.style.display = "none"
                }

                var datos = JSON.parse(consulta.responseText);
                spinner.style.display = "none";
                crearLista(datos);

            }
            if (consulta.status == 404) {
                console.log('Error al conectar/ no encontrado');
            }
        }
    }

}

// JQERY
function getJquery(ajaxurl) {
    return $.ajax({
        type: 'GET',
        url: ajaxurl
    });
};

async function jQuery(valor) {
    try {
        if ((valor != null) && (valor != "")) {
            var datos = await getJquery('https://webapp-210130211157.azurewebsites.net/webresources/mitienda/' + valor)
            aBuscar = true;
        } else {
            var datos = await getJquery('https://webapp-210130211157.azurewebsites.net/webresources/mitienda/')
        }
        if (aBuscar) {
            while (lugarBusca.firstChild) {
                lugarBusca.removeChild(lugarBusca.firstChild);
            }
            botonBuscar.style.display = "none";
            botonX.style.display = "block";
            document.getElementsByTagName("svg")[0].style.display = "block";
            document.getElementsByTagName("img")[1].style.display = "none";
            lista.style.display = "none"
        }
        spinner.style.display = "none";
        crearLista(datos);
    } catch (err) {
        console.log(err);
    }
}


//FETCH
async function Fetch(valor) {
    var enlace;

    if ((valor != null) && (valor != "")) {
        enlace = "https://webapp-210130211157.azurewebsites.net/webresources/mitienda/" + valor;
        aBuscar = true;
    } else {
        enlace = "https://webapp-210130211157.azurewebsites.net/webresources/mitienda/";
    }

    return await fetch(enlace)
        .then(response => response.text())
        .then(datosSinJson => {
            var datos = JSON.parse(datosSinJson)

            if (aBuscar) {
                while (lugarBusca.firstChild) {
                    lugarBusca.removeChild(lugarBusca.firstChild);
                }
                botonBuscar.style.display = "none";
                botonX.style.display = "block";
                document.getElementsByTagName("svg")[0].style.display = "block";
                document.getElementsByTagName("img")[1].style.display = "none";
                lista.style.display = "none"
            }
            spinner.style.display = "none";
            crearLista(datos);
        })

}



function crearLista(datos) {
    console.log(datos);
    var main = document.getElementsByTagName("main")[0];
    main.style.height = "auto";
    var lista = document.getElementById("lista");
    var buscadorLista = document.getElementById("buscadorLista")
    buscadorLista.style.display = "flex"
    if (datos.length == undefined) {
        lugarBusca.style.display = "flex";
        var div = document.createElement("div");
        var h1 = document.createElement("h1");
        var textoH1 = document.createTextNode(datos.nombreTienda)
        h1.appendChild(textoH1);
        div.appendChild(h1);
        var pDireccion = document.createElement("p");
        var textoPDireccion = document.createTextNode(datos.direccion + " " + datos.localidad);
        pDireccion.appendChild(textoPDireccion);
        div.appendChild(pDireccion);
        var pTelefono = document.createElement("p");
        var textoPTelefono = document.createTextNode(datos.telefono);
        pTelefono.appendChild(textoPTelefono);
        div.appendChild(pTelefono);
        div.setAttribute("class", "infoCaja");
        lugarBusca.appendChild(div);
    } else {
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
            div.setAttribute("class", "infoCaja");
            lista.appendChild(div);
        });
    }

    var botonBuscar = document.getElementById("botonBuscar");
    botonBuscar.addEventListener('click', () => recogerTienda(event))
}
var idTienda = document.getElementById("idTienda");
var errorBuscador = document.getElementById("errorBuscador");
function buscador() {
    var continuarBuscando=true;
    if (idTienda.validity.valueMissing) {
        errorBuscador.textContent = "El campo no puede estar vacio";
        errorBuscador.style = "color: red";
        idTienda.style = "border: red solid 1px";
        continuarBuscando = false;

    } else if (idTienda.validity.patternMismatch) {
        errorBuscador.textContent = "El campo solo puede contener numeros";
        errorBuscador.style.color = "red";
        idTienda.style.border = "red solid 1px";
        continuarBuscando = false;
    } else {
        errorBuscador.textContent = "";
        idTienda.style.border = "green solid 1px";
    }

    return(continuarBuscando);

}
console.log(document.getElementsByTagName("img")[1]);
function recogerTienda(event) {
    if (buscador()) {
        var valor = idTienda.value;
        event.target.disabled = true;
        document.getElementsByTagName("svg")[0].style.display = "none";
        document.getElementsByTagName("img")[1].style.display = "block";
        if (ajax == "XHR") {
            XHRGET(valor);
        } else if (ajax == "Fetch") {
            Fetch(valor);
        } else {
            jQuery(valor);
        }
    }


}
var quitarBusca = document.getElementById("botonX")
quitarBusca.addEventListener('click', () => volverLista())

function volverLista() {
    botonBuscar.disabled = false;
    botonBuscar.style.display = "block";
    botonX.style.display = "none";
    lista.style.display = "flex";
    lugarBusca.style.display = "none";
}

document.getElementById("toogleForm").addEventListener('click', e => {
    $(e.target.parentNode.nextElementSibling).slideToggle()
})

var continuar = true;
var tlf = document.getElementById("tlf");
var MensajeTlf = document.getElementById("MensajeTlf");
tlf.addEventListener('input', () => {
    telefono();
})
function telefono() {
    if (tlf.validity.valueMissing) {
        MensajeTlf.textContent = "El campo no puede estar vacio";
        MensajeTlf.style = "color: red";
        tlf.style = "border: red solid 1px";
        continuar = false;

    } else if (tlf.validity.patternMismatch) {
        MensajeTlf.textContent = "Tienen que introducirse 9 números y empezar por 6,8 o 9";
        MensajeTlf.style = "color: red";
        tlf.style = "border: red solid 1px";
        continuar = false;
    } else {
        MensajeTlf.textContent = "";
        tlf.style = "border: green solid 1px";
    }
}

var errorName = document.getElementById("errorName");
var nombreTienda = document.getElementById("nombreTienda");
nombreTienda.addEventListener('input', () => {
    nombreTiendaFunct();
})

function nombreTiendaFunct() {

    if (nombreTienda.validity.valueMissing) {
        errorName.textContent = "El campo no puede estar vacio";
        errorName.style = "color: red";
        nombreTienda.style = "border: red solid 1px";
        continuar = false;

    } else if (nombreTienda.validity.valueMissign) {
        errorName.textContent = "El campo no puede estar vacío";
        errorName.style.color = "red";
        nombreTienda.style.border = "red solid 1px";
        continuar = false;
    } else {
        errorName.textContent = "";
        nombreTienda.style.border = "green solid 1px";
    }


}

var errorLocal = document.getElementById("errorLocal");
var local = document.getElementById("local");
local.addEventListener('input', () => {
    localFunct();
})

function localFunct() {
    if (local.validity.valueMissing) {
        errorLocal.textContent = "El campo no puede estar vacio";
        errorLocal.style = "color: red";
        local.style = "border: red solid 1px";
        continuar = false;

    } else if (local.validity.valueMissign) {
        errorLocal.textContent = "El campo no puede estar vacío";
        errorLocal.style.color = "red";
        local.style.border = "red solid 1px";
        continuar = false;
    } else {
        errorLocal.textContent = "";
        local.style.border = "green solid 1px";
    }


}

var errorAddress = document.getElementById("errorAddress");
var address = document.getElementById("address");
address.addEventListener('input', () => {
    addressFunct();
})

function addressFunct() {
    if (address.validity.valueMissing) {
        errorAddress.textContent = "El campo no puede estar vacio";
        errorAddress.style = "color: red";
        address.style = "border: red solid 1px";
        continuar = false;

    } else if (address.validity.valueMissign) {
        errorAddress.textContent = "El campo no puede estar vacío";
        errorAddress.style.color = "red";
        address.style.border = "red solid 1px";
        continuar = false;
    } else {
        errorAddress.textContent = "";
        address.style.border = "green solid 1px";
    }


}

var anadir = document.getElementById("anade");
anadir.addEventListener('click', () => {
    iniciarFormulario(event);
})

function iniciarFormulario(event) {
    event.preventDefault();
    continuar = true;
    telefono();
    nombreTiendaFunct();
    localFunct();
    addressFunct();
    if (continuar) {
        console.log("todo bien");
        
        anadirABaseDatos();
        document.getElementsByTagName("form")[0].reset();
    }
}

function anadirABaseDatos() {
    var nuevaTienda = { nombreTienda: nombreTienda.value, direccion: address.value, localidad: local.value, telefono: tlf.value }
    if (ajax == "XHR") {
        XHRPOST(nuevaTienda);
        XHRGET()
    } else if (ajax == "Fetch") {
        FetchPOST(nuevaTienda);
        Fetch()
    } else {
        jQueryPOST(nuevaTienda);
        jQuery();
    }


}

async function FetchPOST(nuevaTienda) {
    await fetch("https://webapp-210130211157.azurewebsites.net/webresources/mitienda/",
        {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(nuevaTienda)
        })
        .catch(MensajeError => console.log(MensajeError));
}

async function jQueryPOST(nuevaTienda) {
    await $.ajax({
        url: 'https://webapp-210130211157.azurewebsites.net/webresources/mitienda/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(nuevaTienda),
        dataType: 'json'
    });
    alert("json posted!");
}

async function XHRPOST(nuevaTienda) {
    var xhrPost = new XMLHttpRequest();
    xhrPost.open("POST", 'https://webapp-210130211157.azurewebsites.net/webresources/mitienda/');
    xhrPost.setRequestHeader("Content-Type", "application/json");
    await xhrPost.send(JSON.stringify(nuevaTienda));
}