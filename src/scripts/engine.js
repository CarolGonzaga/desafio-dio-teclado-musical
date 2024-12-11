// Seleciona os elementos relacionados ao piano e teclas MIDI
const pianoKeys = document.querySelectorAll(".piano-keys .key");
const midiKeys = document.querySelectorAll(".midi-keys .square-key");
const volumeSlider = document.querySelector(".volume-slider input");
const keysCheck = document.querySelector(".keys-check input");

// Array para mapear teclas
let mapedKeys = [];
let audio = new Audio("src/tunes/a.wav");

// Função para tocar uma nota
const playTune = (key) => {
  audio.src = `src/tunes/key-${key}.wav`;
  audio.play();

  // Adiciona animação na tecla pressionada
  const clickedKey = document.querySelector(`[data-key="${key}"]`);
  clickedKey.classList.add("active");
  setTimeout(() => {
    clickedKey.classList.remove("active");
  }, 150);
};

// Adiciona eventos de clique às teclas do piano
pianoKeys.forEach((key) => {
  key.addEventListener("click", () => playTune(key.dataset.key));
  mapedKeys.push(key.dataset.key);
});

// Adiciona eventos de clique às teclas MIDI
midiKeys.forEach((key) => {
  key.addEventListener("click", () => playTune(key.dataset.key));
  mapedKeys.push(key.dataset.key);
});

// Detecta a tecla pressionada no teclado físico
document.addEventListener("keydown", (e) => {
  if (mapedKeys.includes(e.key)) {
    playTune(e.key);
  }
});

// Função para ajustar o volume do áudio
const handleVolume = (e) => {
  audio.volume = e.target.value; // Define o volume com base no slider
};

// Função para mostrar ou esconder as legendas das teclas
const showHideKeys = () => {
  pianoKeys.forEach((key) => key.classList.toggle("hide"));
  midiKeys.forEach((key) => key.classList.toggle("hide"));
};

// Adiciona eventos para o controle de volume e a exibição das legendas
volumeSlider.addEventListener("input", handleVolume);
keysCheck.addEventListener("click", showHideKeys);

// Array de cores possíveis
const colors = [
  "var(--cor-midi1)",
  "var(--cor-midi2)",
  "var(--cor-midi3)",
  "var(--cor-midi4)",
  "var(--cor-midi5)",
];

// Variável para armazenar a última cor usada
let lastColor = null;

// Função para alterar a cor do fundo do <li>
function changeColor(event) {
  let randomColor;

  // Garante que a cor escolhida seja diferente da última
  do {
    randomColor = colors[Math.floor(Math.random() * colors.length)];
  } while (randomColor === lastColor);

  // Aplica a nova cor
  event.currentTarget.style.backgroundColor = randomColor;
  lastColor = randomColor;
}

// Função para restaurar a cor original ao sair do mouse
function resetColor(event) {
  event.currentTarget.style.backgroundColor = "var(--cor-branco)";
}

// Adiciona os eventos de mouseover e mouseout a cada tecla
midiKeys.forEach((key) => {
  key.addEventListener("click", changeColor);
  key.addEventListener("mouseout", resetColor);
});