const criptomonedasSelect = document.querySelector('#criptomonedas');
const monedaSelect = document.querySelector('#moneda');
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

const objBusqueda = {
    moneda:'',
    criptomoneda:''
}

//Crear un Promise
const obtenerCriptomendas = criptomonedas => new Promise(resolve =>{
    resolve(criptomonedas);
});

document.addEventListener('DOMContentLoaded', ()=>{
consultarCriptomonedas();
formulario.addEventListener('submit', submitFormulario);

criptomonedasSelect.addEventListener('change', leerValor)
monedaSelect.addEventListener('change', leerValor)


} )

async function consultarCriptomonedas(){
    const url = api;
    
    try {
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        const criptomonedas = await obtenerCriptomendas(resultado.Data);
        selectCriptomonedas(criptomonedas);
        
    } catch (error) {
        console.log(error);
    }
    
}

function selectCriptomonedas(criptomonedas){
criptomonedas.forEach(cripto =>{
    const { FullName, Name}= cripto.CoinInfo;

    const option = document.createElement('option');
    option.value = Name;
    option.textContent = FullName;
    criptomonedasSelect.appendChild(option);
})

}
function leerValor(e){
    objBusqueda[e.target.name]=e.target.value;

}
function submitFormulario(e){
e.preventDefault();

//validar

const { moneda, criptomoneda} = objBusqueda;

if(moneda === ''|| criptomoneda === ''){
    mostrarAlerta('Ambos campos son obligatorios');
    return;
}


//Consultar la api
consultarAPI();
}

function mostrarAlerta(msg){
    const existeError = document.querySelector('.error');

    if(!existeError){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('error');
        // mensaje error
        divMensaje.textContent = msg;
        formulario.appendChild(divMensaje);
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);

    }
}

async function consultarAPI(){

const {moneda, criptomoneda} = objBusqueda;

const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
mostrarSpinner();
fetch (url)
.then (respuesta => respuesta.json())
.then (cotizacion  =>{
    mostrarCotizacionHTML(cotizacion.DISPLAY[criptomoneda][moneda]);

})



}

function mostrarCotizacionHTML(cotizacion){
    limpiarHTML();
    const { PRICE} =  cotizacion;
    const precio = document.createElement('p');
    precio.innerHTML = `el Precio es : ${PRICE}`;



    resultado.appendChild(precio);


}

function limpiarHTML(){
    while (resultado.firstChild){
        resultado.removeChild(resultado.firstChild);

    }
}

function mostrarSpinner(){
    limpiarHTML();

    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    spinner.innerHTML=`  
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>`;

    resultado.appendChild(spinner);

}