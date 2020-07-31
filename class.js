

const azul = document.getElementById('azul')
const amarillo = document.getElementById('amarillo')
const rojo = document.getElementById('rojo')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ultimo_Nivel = 15
var puntaje = 0
var total = 0


class Juego {
  constructor() {
    this.inicializar = this.inicializar.bind(this)
    this.inicializar()
    this.generarSecuencia()
    setTimeout(this.siguienteNivel,500)
}

  inicializar() {
    this.siguienteNivel = this.siguienteNivel.bind(this)
    this.elegircolor = this.elegircolor.bind(this)
    this.toggleBtnEmpezar()
    this.nivel = 1
    this.colores = {
      azul,
      amarillo,
      rojo,
      verde
    }
  }

  toggleBtnEmpezar(){
    if(btnEmpezar.classList.contains('hide')){
      btnEmpezar.classList.remove('hide')
    }else{
      btnEmpezar.classList.add('hide')
    }
  }

        generarSecuencia() {
          this.secuencia =  new Array(ultimo_Nivel).fill(0).map(n => Math.floor(Math.random() * 4))
        }

        siguienteNivel() {
          this.subnivel = 0
          this.iluminarSecuencia()
          this.agregareventosclick()
        }

        transformarNumeroAColor(numero) {
          switch (numero) {
            case 0:
              return 'azul'
            case 1:
              return 'amarillo'
            case 2:
              return 'rojo'
            case 3:
              return 'verde'
          }
        }

        transformarColorANumero(color) {
          switch (color) {
            case 'azul':
              return 0
            case 'amarillo':
              return 1
            case 'rojo':
              return 2
            case 'verde':
              return 3
          }
        }

        iluminarSecuencia() {
          for (let i = 0; i < this.nivel; i++) {
            const color = this.transformarNumeroAColor(this.secuencia[i])
            setTimeout(() => this.iluminarColor(color), 1000 * i)
          }
        }

        iluminarColor(color) {
          this.colores[color].classList.add('light')
          setTimeout(() => this.apagarColor(color), 350)
        }

        apagarColor(color) {
          this.colores[color].classList.remove('light')
        }

        agregareventosclick(){
          this.colores.azul.addEventListener('click', this.elegircolor)
          this.colores.amarillo.addEventListener('click', this.elegircolor)
          this.colores.rojo.addEventListener('click', this.elegircolor)
          this.colores.verde.addEventListener('click', this.elegircolor)
        }

        eliminarEventosClick(){
          this.colores.azul.removeEventListener('click', this.elegircolor)
          this.colores.amarillo.removeEventListener('click', this.elegircolor)
          this.colores.rojo.removeEventListener('click', this.elegircolor)
          this.colores.verde.removeEventListener('click', this.elegircolor)
        
        }

        elegircolor(ev){
          const nombreColor = ev.target.dataset.color
          const numeroColor = this.transformarColorANumero(nombreColor)
          this.iluminarColor(nombreColor)
          if (numeroColor === this.secuencia[this.subnivel]){
            this.subnivel++
            if (this.subnivel === this.nivel){
              this.nivel++
              this.eliminarEventosClick()
              if (this.nivel === (ultimo_Nivel + 1)){
                this.ganoElJuego()
              } else{
                setTimeout(this.siguienteNivel, 1500)
                puntaje++
              }
              
            }
          } else{
            this.perdioElJuego()
          }
          return total
        }

        ganoElJuego(){
          swal('Simón Dice', 'Felicitaciones Ganaste el Juego', 'success')
          .then(this.inicializar)
        }

        perdioElJuego(){
          swal('Simón Dice', 'Perdiste, Repite el juego', 'error')
          .then(() => {
          this.eliminarEventosClick() 
          this.inicializar() 
          })
        }

      }

      function empezarJuego() {
        window.juego = new Juego()
      }