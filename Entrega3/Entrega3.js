
class Usuario{
    constructor(nombre, marca, modelo, precio,medioDepago) {
        this.nombre = nombre;
        this.marca = marca;
        this.modelo = modelo;
        this.precio = precio;
        this.medioDepago = medioDepago;
    }

}
const planes = [
    {
        nombre: 'PLAN 5',
        valor: 993,
        descuento: 0.10,
        condicion: precioDispositivo => precioDispositivo <= 50000
    }, {
        nombre: 'PLAN 8',
        valor: 1588,
        descuento: 0.10,
        condicion: precioDispositivo => precioDispositivo >= 50001
    }
  ];

let usuarios = []

let formularioCotizacion = document.getElementById("formularioCotizacion")
let botonCotizar = document.getElementById("botonCotizar")
let cotizaciones = document.getElementById("cotizaciones")

formularioCotizacion.addEventListener("submit", (e) => {
    e.preventDefault()
 
    let dataform =new FormData(e.target)
    let usuario = new Usuario(
        dataform.get("nombre"),
        dataform.get("marca"),
        dataform.get("modelo"),
        dataform.get("precio"),
        dataform.get("mediodepago")
    );
    usuarios.push(usuario)
    localStorage.setItem("usuarios",JSON.stringify(usuarios))
})

botonCotizar.addEventListener("click", ()=>{
    let usuarios = JSON.parse(localStorage.getItem ("usuarios"))
        
    cotizaciones.innerHTML = "";

    usuarios.forEach((usuarioEnArray, indice) => {
         const plan = planes.find(plan => plan.condicion(usuarioEnArray.precio));
         let montoAPagar = 0
        
         if(plan){
            montoAPagar = plan.valor;
            
            if(usuarioEnArray.medioDepago=="TARJETA"){
                montoAPagar = descuentoTarjeta(plan.valor,plan.descuento);
            }
        }
        

                cotizaciones.innerHTML += `
            <div class="card" id="usuario${indice}" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">nombre: ${usuarioEnArray.nombre}</h5>
                    <p class="card-text">marca: ${usuarioEnArray.marca}</p>
                    <p class="card-text">modelo: ${usuarioEnArray.modelo}</p>
                    <p class="card-text">precio: $${usuarioEnArray.precio}</p>
                    <p class="card-text">medio de pago: ${usuarioEnArray.medioDepago}</p>
                    <p class="card-text">precio plan: $${montoAPagar}</p>
                    <button type="button" class="btn btn-danger">Eliminar</button>
                </div>
            </div>
        `;


})

})

function descuentoTarjeta (precio, descuento) {
    return precio - (precio * descuento);
}



let darkMode;

if(localStorage.getItem('darkMode')) {
    darkMode = localStorage.getItem('darkMode')

} else{
    darkMode = "light"
}

localStorage.setItem('darkMode' , darkMode)

$(()=> {
    if(localStorage.getItem('darkMode') == "dark"){
        $('body').addClass('darkMode')
        $('#botonDarkMode').fadeOut()
        $('#botonLightModde').fadeIn()
    }else{
        $('#botonLightMode').fadeOut()
    }

    $('#botonLightMode').click(() => {
        $('#botonDarkMode').fadeIn()
        $('#botonLightMode').fadeOut()

      /*  $('body').css({
            "background-color": "beige",
            "color": "black" 
        })*/

        $('body').removeClass('darkMode')
        localStorage.setItem('darkMode', 'light')
    })

    $('#botonDarkMode').click(() => {
        $('#botonDarkMode').fadeOut()
        $('#botonLightMode').fadeIn()
        $('body').addClass('darkMode')
        localStorage.setItem('darkMode', 'dark')
    })

})













