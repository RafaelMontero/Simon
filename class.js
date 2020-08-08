

const rojo = document.getElementById('rojo')
const azul = document.getElementById('azul')
const verde = document.getElementById('verde')
const negro = document.getElementById('negro')
const amarillo = document.getElementById('amarillo')
const naranja = document.getElementById('naranja')
const gris = document.getElementById('gris')
const morado = document.getElementById('morado')
const oro = document.getElementById('oro')

const ultimo_Nivel = 10
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
      rojo,
      azul,
      verde,
      negro,
      amarillo,
      naranja,
      gris,
      morado,
      oro
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
          this.secuencia =  new Array(ultimo_Nivel).fill(0).map(n => Math.floor(Math.random() * 9))
        }

        siguienteNivel() {
          this.subnivel = 0
          this.iluminarSecuencia()
          this.agregareventosclick()
        }

        transformarNumeroAColor(numero) {
          switch (numero) {
            case 0:
              return 'rojo'
            case 1:
              return 'azul'
            case 2:
              return 'verde'
            case 3:
              return 'negro'
            case 4:
              return 'amarillo'
            case 5:
              return 'naranja'
            case 6:
              return 'gris'
            case 7:
              return 'morado'
            case 8:
              return 'oro'
          }
        }

        transformarColorANumero(color) {
          switch (color) {
            case 'rojo':
              return 0
            case 'azul':
              return 1
            case 'verde':
              return 2
            case 'negro':
              return 3
            case 'amarillo':
              return 4
            case 'naranja':
              return 5
            case 'gris':
              return 6
            case 'morado':
              return 7
            case 'oro':
              return 8
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
          this.colores.rojo.addEventListener('click', this.elegircolor)
          this.colores.azul.addEventListener('click', this.elegircolor)
          this.colores.verde.addEventListener('click', this.elegircolor)
          this.colores.negro.addEventListener('click', this.elegircolor)
          this.colores.amarillo.addEventListener('click', this.elegircolor)
          this.colores.naranja.addEventListener('click', this.elegircolor)
          this.colores.gris.addEventListener('click', this.elegircolor)
          this.colores.morado.addEventListener('click', this.elegircolor)
          this.colores.oro.addEventListener('click', this.elegircolor)
        }

        eliminarEventosClick(){
          this.colores.rojo.removeEventListener('click', this.elegircolor)
          this.colores.azul.removeEventListener('click', this.elegircolor)
          this.colores.verde.removeEventListener('click', this.elegircolor)
          this.colores.negro.removeEventListener('click', this.elegircolor)
          this.colores.amarillo.removeEventListener('click', this.elegircolor)
          this.colores.naranja.removeEventListener('click', this.elegircolor)
          this.colores.gris.removeEventListener('click', this.elegircolor)
          this.colores.morado.removeEventListener('click', this.elegircolor)
          this.colores.oro.removeEventListener('click', this.elegircolor)
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