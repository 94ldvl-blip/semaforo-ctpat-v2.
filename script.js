// Semáforo AVISO (C-TPAT)
// Probabilidad: Rojo 60% / Verde 40%
const umbralRojo = 0.6; // 60% rojo

function decidirColor() {
  return Math.random() < umbralRojo ? 'rojo' : 'verde';
}

function activar(color) {
  const luzVerde = document.getElementById('luzVerde');
  const luzRoja = document.getElementById('luzRoja');
  luzVerde.classList.remove('activa');
  luzRoja.classList.remove('activa');
  if (color === 'rojo') {
    luzRoja.classList.add('activa');
  } else {
    luzVerde.classList.add('activa');
  }
}

function apagar() {
  document.getElementById('luzVerde').classList.remove('activa');
  document.getElementById('luzRoja').classList.remove('activa');
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btnAccionar').addEventListener('click', () => activar(decidirColor()));
  document.getElementById('btnApagar').addEventListener('click', apagar);
});
