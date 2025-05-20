// --- Datos del quiz, ahora incluyendo la pregunta `q` ---
const quizData = [
  {
    q: "¿Que frutas se mencionan en nuestra canción?",
    options: ["Mango - Coco","Mango - Limón","Mango - Sandia","Mango - Banana"],
    answer: 1
  },
  {
    q: "¿Qué plato cocinamos juntos por primera vez?",
    options: ["Tallarines Alfredo","Arroz con huevo","Canchita","Tallarines con mantequilla"],
    answer: 0
  },
  {
    q: "¿De que color era la mariquita que estaba en casa y donde la encontramos?",
    options: ["Roja - Mesa","Amarilla - Refrigerador","Amarilla - Ventilador","Roja - Baño"],
    answer: 2
  },
  {
    q: "¿Que trago te enseñe a preparar primero tu solita?",
    options: ["Cuba Libre","Tinto de verano","Chilcano","Mojito"],
    answer: 1
  },
  {
    q: "¿A qué cafeteria repetimos porque nos encantó?",
    options: ["Amareto","Donofrio","Starbuks","Dédalo"],
    answer: 0
  }
];

// Páginas y controles
const pages = document.querySelectorAll('.page');
const prevBtn = document.getElementById('prevPage');
const nextBtn = document.getElementById('nextPage');
const flipSound = document.getElementById('flipSound');
let idx = 0;
let quizScore = 0;


// Mostrar la página idx
function showPage(i) {
    const lastIndex=pages.length -1;

  pages.forEach(p => p.classList.remove('active'));
  pages[i].classList.add('active');


  // Controles de navegación
  prevBtn.style.visibility = (i > 0 && i < lastIndex) ? 'visible' : 'hidden';
  if (i < lastIndex) {
    nextBtn.style.visibility = 'visible';
    nextBtn.textContent = 'Siguiente';
    nextBtn.onclick = () => flipTo(i+1);
  } else{
    nextBtn.style.visibility = 'visible';
    nextBtn.textContent = 'Inicio';
    nextBtn.onclick = () => flipTo(0);
  }

  // Si es una página de pregunta (índices 11–15), inicializarla
  if (i >= 11 && i <= 15) {
    initQuizPage(i - 11);
  }

  if (i === lastIndex) {
    showResult();
  }
}

// Función de volteo con sonido
function flipTo(i) {
  flipSound.currentTime = 0;
  flipSound.play();
  idx = i;
  showPage(i);
}

// Inicializar
showPage(0);

// Swipe en móvil
let startX = 0;
const fb = document.querySelector('.flipbook');
fb.addEventListener('touchstart', e => startX = e.touches[0].clientX);
fb.addEventListener('touchend', e => {
  let dx = e.changedTouches[0].clientX - startX;
  if (dx > 30 && idx > 0) flipTo(idx -1);
  else if (dx < -30 && idx < pages.length - 1) flipTo(idx+1);
});

// Cargar una pregunta según su índice en quizData
function initQuizPage(qIdx) {
  const page = pages[idx];
  const questionEl = page.querySelector('.quiz-question');
  const optsDiv = page.querySelector('.options');
  const resultEl = document.getElementById('quiz-result');

  // Limpiar previos
  optsDiv.innerHTML = '';
  if (resultEl) resultEl.textContent = '';

  // Mostrar texto de la pregunta
  questionEl.textContent = quizData[qIdx].q;

  // Crear botones de opciones
  quizData[qIdx].options.forEach((opt, j) => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => {
      // Marcar correcto/incorrecto
      if (j === quizData[qIdx].answer) {
        btn.classList.add('correct');
        quizScore++;
      } else {
        btn.classList.add('wrong');
      }
      // Desactivar todas las opciones
      optsDiv.querySelectorAll('button').forEach(b => b.disabled = true);
    };
    optsDiv.appendChild(btn);
  });
}

// Mostrar resultado final en página índice 16
function showResult() {
  const resultEl = document.getElementById('quiz-result');
  resultEl.textContent = quizScore >= 3
    ? `¡Eres una experta en nuestros recuerdos! ${quizScore}/${quizData.length}`
    : `Score: ${quizScore}/${quizData.length}. ¡A repasar recuerdos juntos!`;
}
