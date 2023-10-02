function createRows(n) {
    const result = [];
    for (let i = 1; i <= n; i++) {
        const fila = { rojo: n / 2, azul: n / 2 }
        result.push(fila);
    }
    return result;
}

function mostrarTablero() {

    tablero.innerHTML = ''

    filas.forEach((fila) => {
        let row = document.createElement("div");
        row.classList.add('fila');
        let string = ''
        for (let i = 1; i <= fila.rojo; i++) {
            string += `<small class="rojo m-1">R</small>`
        }

        for (let i = 1; i <= fila.azul; i++) {
            string += `<small class="azul m-1">A</small>`
        }

        row.innerHTML = string
        tablero.appendChild(row)
    })
}


let filas

let clicks = 0;

let espacios

const paso1 = document.getElementById('paso1');
const tablero = document.getElementById('tablero');
const paso2 = document.getElementById('paso2');

const btn = document.getElementById('next-btn')

btn.addEventListener("click", next)

function next() {

    filas[clicks].rojo += filas[espacios - clicks - 1].rojo - clicks
    filas[clicks].azul = espacios - filas[clicks].rojo

    filas[espacios - clicks - 1].rojo -= filas[espacios - clicks - 1].rojo - clicks
    filas[espacios - clicks - 1].azul = espacios - filas[espacios - clicks - 1].rojo

    clicks++

    if (clicks == espacios) {
        conclusion()
    }

    mostrarTablero()

}

const form = document.getElementById('form-espacios');
form.addEventListener('submit', function (event) {

    event.preventDefault();

    espacios = document.getElementById('espacios').value;

    tablero.innerHTML = ''
    paso2.innerHTML = ''
    btn.classList.remove('btn')
    btn.classList.remove('btn-outline-dark')


    if (espacios % 2 != 0) {
        paso1.innerHTML = `<p>El artista se dio cuenta que necesita ${espacios * espacios} casillas (mitad de cada color) y que con esa cantidad impar no iba a lograrlo.<br>Intenta nuevamente con otro número</p>`
        return
    }

    if (espacios > 20) {
        paso1.innerHTML = `<p>Estás seguro de querer pintar ${espacios * espacios} casillas? Prueba con un número menor a 20 para llegar al resultado antes.</p>`
        return
    }

    paso1.innerHTML = `<p>El artista fue a buscar ${espacios * espacios / 2} fichas de cada color y primero acomodó todas las filas iguales.
    <br>Luego fue moviendo las piezas hasta llegar a la conclusión.<br>
    Clickeá en siguiente para ver los movimientos realizados:</p>`

    filas = createRows(espacios);

    btn.classList.add('btn')
    btn.classList.add('btn-outline-dark')

    mostrarTablero()

})

function conclusion() {

    btn.classList.remove('btn')
    btn.classList.remove('btn-outline-dark')
    paso1.innerHTML = ''
    paso2.innerHTML = `<h2>El artista se dio cuenta de que era imposible.</h2>
    <p>Siempre iba a quedarse con dos filas con ${espacios / 2} casillas rojas.<br>Lo mismo sucede con otras cantidades.</p>
    <h2>Finalmente decidió dedicarse a hacer cuadros con bombas de pintura.</h2>
    <div class="end-img">
    <img src="./AI_Generated_Image.jpeg" alt="">  
</div>`
}