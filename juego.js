const canvas = document.getElementById('juego');
const ctx = canvas.getContext('2d');
let jugador = { x: 180, y: 550, radio: 20 };
let monedas = [];
let puntos = 0;

function crearMoneda() {
  monedas.push({ x: Math.random() * 360 + 20, y: 0, radio: 10 });
}

function moverJugador(e) {
  if (e.key === 'ArrowLeft' && jugador.x > 20) jugador.x -= 20;
  if (e.key === 'ArrowRight' && jugador.x < 380) jugador.x += 20;
}

function detectarColision(m) {
  let dx = jugador.x - m.x;
  let dy = jugador.y - m.y;
  return Math.sqrt(dx * dx + dy * dy) < jugador.radio + m.radio;
}

function dibujar() {
  ctx.clearRect(0, 0, 400, 600);

  // Jugador
  ctx.beginPath();
  ctx.arc(jugador.x, jugador.y, jugador.radio, 0, Math.PI * 2);
  ctx.fillStyle = "cyan";
  ctx.fill();

  // Monedas
  for (let i = 0; i < monedas.length; i++) {
    monedas[i].y += 3;
    if (detectarColision(monedas[i])) {
      monedas.splice(i, 1);
      puntos++;
      document.getElementById("puntos").innerText = puntos;
    } else if (monedas[i].y > 600) {
      monedas.splice(i, 1);
    } else {
      ctx.beginPath();
      ctx.arc(monedas[i].x, monedas[i].y, monedas[i].radio, 0, Math.PI * 2);
      ctx.fillStyle = "gold";
      ctx.fill();
    }
  }
}

setInterval(() => {
  crearMoneda();
}, 1000);

setInterval(() => {
  dibujar();
}, 30);

document.addEventListener('keydown', moverJugador);
