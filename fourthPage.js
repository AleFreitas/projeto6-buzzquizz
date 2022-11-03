const urlParams = new URLSearchParams(window.location.search);
const questionJSON = urlParams.get("question");
let questionsObject = null;

function createQuestionContainers(qJSON) {
  const question = JSON.parse(qJSON);
  const nQuestions = question.numberOfQuestions;
  const questionsDiv = document.querySelector(".Questions");
  questionsDiv.innerHTML = "";
  for (let i = 0; i < nQuestions; i++) {
    questionsDiv.innerHTML += `
    <li class="subcontainer">
    <div class="QuestionNumber">
        <h3>Pergunta ${i + 1}</h3>
        <input class="questionTitle" placeholder="Texto da pergunta" type="text" />
        <input class="questionColor" placeholder="Cor de fundo da pergunta" type="color" />
    </div>
    <div class="QuizzAnswers">
        <h3>Resposta Correta</h3>
        <input class="answer" placeholder="Resposta Correta" type="text" />
        <input class="image-url" placeholder="URL da imagem" type="url" />
    </div>
    <div class="WrongAnswers">
        <input class="answer" placeholder="Resposta Incorreta" type="text" />
        <input class="image-url" placeholder="URL da imagem" type="url" />
    </div>
    <div class="WrongAnswers">
        <input class="answer" placeholder="Resposta Incorreta" type="text" />
        <input class="image-url" placeholder="URL da imagem" type="url" />
    </div>
    <div class="WrongAnswers">
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
    questionsObject = questions;
    return true;
  }
  return false;
}

function proceedToLevels() {
  if (validateQuestions()) {
    window.location.href = `fifthPage.html?questions=${JSON.stringify(
      questionsObject
    )}`;
  } else {
    alert("Quizz Inválido. Preencha os dados corretamente");
  }
}
createQuestionContainers(questionJSON);
