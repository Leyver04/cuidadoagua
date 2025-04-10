const startBtn = document.getElementById('start-btn');
const startForm = document.getElementById('start-form');
const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitBtn = document.getElementById('submit-btn');
const nextBtn = document.getElementById('next-btn');
const nameInput = document.getElementById('name');
const groupInput = document.getElementById('group');
const timerDisplay = document.getElementById('timer');
const questionContainer = document.getElementById('question-container');

const questions = [
  {
    question: "¿Cuál es una consecuencia del desperdicio de agua en las instalaciones del plantel?",
    options: ["Disminución de la presión en los bebederos", "Mayor consumo de electricidad en las bombas de agua", "Reducción de las reservas de agua dulce", "Aumento en los costos de mantenimiento"],
    answer: "Aumento en los costos de mantenimiento"
  },
  {
    question: "En el plantel, ¿qué acción puede generar un mayor desperdicio de agua sin que los estudiantes lo noten de inmediato?",
    options: ["Dejar los grifos abiertos en los baños", "Fugas en tuberías o sanitarios que no se reportan", "Uso excesivo de agua en el riego de áreas verdes", "Uso frecuente de agua en los laboratorios"],
    answer: "Fugas en tuberías o sanitarios que no se reportan"
  },
  {
    question: "¿Cuál es el principal motor del ciclo del agua?",
    options: ["La gravedad", "La energía solar", "El movimiento del viento", "La actividad humana"],
    answer: "La energía solar"
  },
  {
    question: "¿Qué medida comunitaria dentro del plantel puede ayudar a reducir el desperdicio de agua?",
    options: ["Limitar el acceso de agua potable en los pasillos", "Implementar un programa de detección y reparación de fugas", "Optimizar los sistemas de captación y filtración de agua de lluvia", "Diseñar estrategias de reducción de consumo basadas en auditorías hídricas"],
    answer: "Implementar un programa de detección y reparación de fugas"
  },
  {
    question: "¿Cuál de los siguientes contaminantes del agua es más difícil de eliminar?",
    options: ["Desechos orgánicos", "Aceites y grasas", "Metales pesados", "Residuos plásticos"],
    answer: "Metales pesados"
  },
  {
    question: "Si en el plantel se desperdicia agua constantemente, ¿qué efecto a largo plazo podría generar en la infraestructura?",
    options: ["Mayor desgaste y daños en tuberías", "Aparición de hongos y moho en los edificios", "Incremento en el consumo de energía eléctrica", "Falta de suministro en temporadas de sequía"],
    answer: "Mayor desgaste y daños en tuberías"
  },
  {
    question: "¿Qué sucede cuando el vapor de agua se enfría en la atmósfera?",
    options: ["Se condensa en diminutas gotas suspendidas en el aire.", "Forma cristales de hielo si la temperatura es lo suficientemente baja.", "Contribuye a la formación de nubes y posterior precipitación."],
    answer: "Se condensa en diminutas gotas suspendidas en el aire."
  },
  {
    question: "¿Cómo puede afectar la contaminación del agua al bienestar de los estudiantes?",
    options: ["Puede causar enfermedades gastrointestinales", "Provoca fatiga y bajo rendimiento académico", "Reduce la capacidad de hidratación del cuerpo", "Puede aumentar el riesgo de infecciones en la piel"],
    answer: "Puede causar enfermedades gastrointestinales"
  },
  {
    question: "¿Cuál de los siguientes fenómenos provoca el movimiento del agua desde los océanos hacia la atmósfera?",
    options: ["La condensación", "La evaporación", "La precipitación", "La filtración"],
    answer: "La evaporación"
  },
  {
    question: "¿Cuál es un efecto indirecto del desperdicio de agua en las zonas urbanas, incluyendo el área cercana al plantel?",
    options: ["Sobreexplotación de acuíferos que reduce la disponibilidad de agua a largo plazo.", "Incremento en la demanda de energía para el bombeo y distribución de agua.", "Reducción de la calidad del agua debido a la concentración de contaminantes."],
    answer: "Sobreexplotación de acuíferos que reduce la disponibilidad de agua a largo plazo."
  },
  {
    question: "¿Qué parte del ciclo del agua contribuye directamente a la formación de aguas subterráneas?",
    options: ["Infiltración en zonas de recarga hídrica con suelos permeables.", "Acumulación de agua en acuíferos confinados por capas impermeables.", "Percolación lenta a través de estratos geológicos porosos."],
    answer: "Infiltración en zonas de recarga hídrica con suelos permeables."
  },
  {
    question: "¿Qué práctica dentro del plantel ayudaría más a reducir el desperdicio de agua?",
    options: ["Implementar un programa de monitoreo y detección de fugas", "Instalar reguladores de flujo en llaves y sanitarios", "Usar vasos reutilizables en lugar de botellas desechables", "Reparar las fugas de agua en los sanitarios"],
    answer: "Implementar un programa de monitoreo y detección de fugas"
  },
  {
    question: "¿Cuál de las siguientes actividades humanas tiene mayor impacto en la contaminación del agua?",
    options: ["Desechar residuos industriales sin tratamiento previo", "Utilizar fertilizantes químicos en jardines", "Lavar ropa en exceso", "Arrojar basura en los desagües del plantel"],
    answer: "Desechar residuos industriales sin tratamiento previo"
  },
  {
    question: "¿Qué proceso del ciclo del agua implica el paso del agua de estado líquido a gaseoso?",
    options: ["Evaporación acelerada por temperaturas elevadas y vientos secos.", "Transpiración de plantas que libera humedad a la atmósfera.", "Sublimación directa del hielo en zonas de alta altitud."],
    answer: "Evaporación acelerada por temperaturas elevadas y vientos secos."
  },
  {
    question: "¿Cuál es una consecuencia ambiental directa de la contaminación del agua en zonas cercanas al plantel?",
    options: ["Aumento en la cantidad de insectos y plagas", "Disminución de la biodiversidad acuática", "Mayor presencia de polvo y suciedad en el aire", "Contaminación del suelo por filtraciones"],
    answer: "Disminución de la biodiversidad acuática"
  }
];

let currentQuestion = 0;
let score = 0;
let startTime;
let timer;
let timeLeft = 15;
let questionAnswered = false;

startBtn.addEventListener('click', startQuiz);

function startQuiz() {
  startForm.classList.add('hidden');
  quizContainer.classList.remove('hidden');
  startTime = Date.now();
  loadQuestion();
}

function loadQuestion() {
  questionAnswered = false;
  const question = questions[currentQuestion];

  questionContainer.innerHTML = `
    <h3 class="text-xl font-bold mb-4">${question.question}</h3>
    ${question.options.map(option => `
      <label class="block mb-2">
        <input type="radio" name="option" value="${option}" class="mr-2">
        <span class="text-gray-800">${option}</span>
      </label>
    `).join('')}
  `;

  nextBtn.classList.add('hidden');
  submitBtn.classList.add('hidden');
  clearInterval(timer);
  timeLeft = 15;
  timerDisplay.textContent = `⏳ Tiempo restante: ${timeLeft}s`;
  timer = setInterval(updateTimer, 1000);

  const options = document.querySelectorAll('input[name="option"]');
  options.forEach(option => {
    option.addEventListener('change', () => {
      if (!questionAnswered) {
        questionAnswered = true;
        clearInterval(timer);

        const selected = document.querySelector('input[name="option"]:checked');
        if (selected && selected.value === questions[currentQuestion].answer) {
          score++;
        }

        if (currentQuestion === questions.length - 1) {
          submitBtn.classList.remove('hidden');
        } else {
          nextBtn.classList.remove('hidden');
        }
      }
    });
  });
}

function updateTimer() {
  timeLeft--;
  timerDisplay.textContent = `⏳ Tiempo restante: ${timeLeft}s`;

  if (timeLeft <= 0) {
    clearInterval(timer);
    if (!questionAnswered) {
      questionAnswered = true;
      if (currentQuestion === questions.length - 1) {
        submitBtn.classList.remove('hidden');
      } else {
        currentQuestion++;
        loadQuestion();
      }
    }
  }
}

nextBtn.addEventListener('click', () => {
  currentQuestion++;
  loadQuestion();
});

submitBtn.addEventListener('click', () => {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (selectedOption && selectedOption.value === questions[currentQuestion].answer && !questionAnswered) {
    score++;
  }
  const timeTaken = Math.floor((Date.now() - startTime) / 1000);
  showResult(timeTaken);
});

function showResult(timeTaken) {
  quizContainer.classList.add('hidden');
  resultContainer.classList.remove('hidden');

  const name = nameInput.value;
  const group = groupInput.value;

  const percentage = (score / questions.length) * 100;

  let message = "";
  let emoji = "🌊";
  if (percentage === 100) {
    message = "¡Excelente! Eres un maestro del agua 💧👏";
    emoji = "🏆";
  } else if (percentage >= 80) {
    message = "¡Muy bien! Vas por buen camino 💪";
    emoji = "🎉";
  } else if (percentage >= 60) {
    message = "¡Bien hecho! Pero aún puedes mejorar 🤓";
    emoji = "📘";
  } else {
    message = "Ups... a estudiar un poquito más sobre el agua 💦📘";
    emoji = "💧";
  }

  resultContainer.innerHTML = `
    <div class="bg-white rounded-2xl shadow-2xl p-8 text-center">
      <div class="text-6xl mb-4 text-yellow-500">${emoji}</div>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">¡Resultados del Cuestionario!</h2>
      <p class="text-lg mb-2 font-medium text-blue-700">Nombre: ${name} (${group})</p>
      <p class="text-lg mb-2 text-gray-600">Tiempo: ${timeTaken} segundos</p>
      <p class="text-xl mb-4 font-semibold text-green-600">Aciertos: ${score} de ${questions.length}</p>
      <p class="text-base text-gray-700 italic mb-6">${message}</p>
      <button onclick="location.reload()" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition">
        Volver a intentar
      </button>
    </div>
  `;

  saveResult(name, group, score, timeTaken);
}

function saveResult(name, group, score, timeTaken) {
  fetch('/api/guardar-resultados', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, group, score, timeTaken })
  });
}
