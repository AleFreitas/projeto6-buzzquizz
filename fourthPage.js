const urlParams = new URLSearchParams(window.location.search);
const quizzJSON = urlParams.get("quizz");
let quizzObject = null;

function createQuestionContainers(qJSON) {
  quizzObject = JSON.parse(qJSON);
  const nQuestions = quizzObject.numberOfQuestions;
  const questionsDiv = document.querySelector(".Questions");
  questionsDiv.innerHTML = "";
  for (let i = 0; i < nQuestions; i++) {
    questionsDiv.innerHTML += `
    <li class="subcontainer ${i === 0 ? "" : "hidden"}">
    <div class="QuestionNumber">
        <div class="QuestionWindow">
        <div class="ToClick">
          <h3>Pergunta ${i + 1}</h3>
          <ion-icon onclick="openandhide(this)" name="create-outline"></ion-icon>
        </div>
        <div class="QuestionConfig">
          <input class="questionTitle" placeholder="Texto da pergunta" type="text" />
          <input class="questionColor" placeholder="Cor de fundo da pergunta" type="text" />
        </div>
      </div>
    </div>
    <div class="QuizzAnswers">
        <h3>Resposta Correta</h3>
        <input class="answer" placeholder="Resposta Correta" type="text" />
        <input class="image-url" placeholder="URL da imagem" type="url" />
    </div>
    <div class="WrongAnswers">
        <h3>Resposta Incorreta</h3>
        <input class="answer" placeholder="Resposta Incorreta" type="text" />
        <input class="image-url" placeholder="URL da imagem" type="url" />
    </div>
    <div class="WrongAnswers">
        <h3>Resposta Incorreta</h3>
        <input class="answer" placeholder="Resposta Incorreta" type="text" />
        <input class="image-url" placeholder="URL da imagem" type="url" />
    </div>
    <div class="WrongAnswers">
        <h3>Resposta Incorreta</h3>
        <input class="answer" placeholder="Resposta Incorreta" type="text" />
        <input class="image-url" placeholder="URL da imagem" type="url" />
    </div>
</li>


    `;
  }
}

function validateQuestions() {
  const questionElements = document.querySelectorAll(".subcontainer");
  const questions = [];
  questionElements.forEach((questionElement) => {
    const question = {};
    const answers = [];
    const title = questionElement.querySelector(".questionTitle").value;
    const color = questionElement.querySelector(".questionColor").value;
    const correctAnswerElement = questionElement.querySelector(".QuizzAnswers");
    answers.push({
      text: correctAnswerElement.querySelector("input.answer").value,
      image: correctAnswerElement.querySelector("input.image-url").value,
      isCorrectAnswer: true,
    });

    const wrongAnswersElements =
      questionElement.querySelectorAll(".WrongAnswers");
    wrongAnswersElements.forEach((wrongAnswerElement) => {
      answers.push({
        text: wrongAnswerElement.querySelector("input.answer").value,
        image: wrongAnswerElement.querySelector("input.image-url").value,
        isCorrectAnswer: false,
      });
    });

    question.title = title;
    question.color = color;
    question.answers = answers;

    questions.push(question);
  });
  if (validateQuizzQuestions(questions)) {
    quizzObject.questions = questions;
    return true;
  }
  return false;
}

function proceedToLevels() {
  if (validateQuestions()) {
    window.location.href = `fifthPage.html?quizz=${encodeURIComponent(
      JSON.stringify(quizzObject)
    )}`;
  } else {
    alert("Quizz Inválido. Preencha os dados corretamente");
  }
}

function openandhide(element) {
  const el = element.parentNode.parentNode.parentNode.parentNode;
  el.classList.remove("hidden");
  const allContainers = document.querySelectorAll(".subcontainer");
  allContainers.forEach((c) => {
    if (c !== el) {
      c.classList.add("hidden");
    }
  });
}

createQuestionContainers(quizzJSON);
