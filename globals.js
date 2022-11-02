const URL_QUIZZES = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";

let selectedQuizz = null;
let quizzes = null;

/** HELPER FUNCTIONS **/

function validateQuizz(quizz) {
  if (!quizz.title || quizz.title.length < 20 || quizz.title.length > 65) {
    showError("Invalid quizz title");
    return false;
  }
  if (!validateImageUrl(quizz.image)) {
    showError("Invalid quizz image url");
    return false;
  }
  if (!quizz.questions || quizz.questions.length < 3) {
    showError("Not enough questions");
    return false;
  }
  if (!quizz.levels || quizz.levels.length < 2) {
    showError("Not enough levels");
    return false;
  }

  for (let i = 0; i < quizz.questions.length; i++) {
    if (!quizz.questions[i].title || quizz.questions[i].title.length < 20) {
      showError(`Invalid question title: question #${i}`);
      return false;
    }
    if (
      !quizz.questions[i].color ||
      !quizz.questions[i].color.match(/^#([a-fA-F0-9]{6})$/)
    ) {
      showError(`Invalid question color: question #${i}`);
      return false;
    }
    if (!quizz.questions[i].answers || quizz.questions[i].answers.length < 2) {
      showError(`Not enough answers: question #${i}`);
      return false;
    }
    let correctAnswers = 0;
    for (let j = 0; j < quizz.questions[i].answers.length; j++) {
      const answer = quizz.questions[i].answers[j];
      if (!answer.text) {
        showError(`Invalid answer text: question #${i}, answer #${j}`);
        return false;
      }
      if (!validateImageUrl(answer.image)) {
        showError(`Invalid answer image url: question #${i}, answer #${j}`);
        return false;
      }
      if (answer.isCorrectAnswer) correctAnswers++;
    }
    if (correctAnswers !== 1) {
      showError(
        `Invalid number of correct answers! question #${i} Expected: 1   Provided: ${correctAnswers}`
      );
      return false;
    }
  }

  let zeroPercentLevels = 0;
  for (let i = 0; i < quizz.levels.length; i++) {
    const level = quizz.levels[i];
    const lvlValue = Number(level.minValue);
    if (!level.title || level.title.length < 10) {
      showError(`Invalid level title: level ${i}`);
      return false;
    }
    if (!(lvlValue >= 0 && lvlValue <= 100)) {
      showError(`Invalid level %: level ${i}, ${lvlValue}`);
      return false;
    }
    if (!validateImageUrl(level.image)) {
      showError(`Invalid level image: level ${i}`);
      return false;
    }
    if (!level.text || level.text.length < 30) {
      showError(`Invalid level description: level ${i}`);
      return false;
    }
    if (lvlValue === 0) zeroPercentLevels++;
  }
  if (zeroPercentLevels === 0) {
    showError(`Expected at least one level with 0% minumum rate`);
    return false;
  }
  return true;
}

function validateImageUrl(imageUrl) {
  if (
    !imageUrl ||
    !(imageUrl.startsWith("http://") || imageUrl.startsWith("https://"))
  ) {
    return false;
  }

  return true;
}

function validateQuizzHeaders(
  title,
  imageUrl,
  numberOfQuestions,
  numberOfLevels
) {
  numberOfLevels = Number(numberOfLevels);
  numberOfQuestions = Number(numberOfQuestions);

  if (!title || title.length < 20 || title.length > 65) {
    showError("Invalid quizz title");
    return false;
  }
  if (!validateImageUrl(imageUrl)) {
    showError("Invalid quizz image url");
    return false;
  }
  if (!numberOfQuestions || numberOfLevels.length < 3) {
    showError("Not enough questions");
    return false;
  }
  if (!numberOfLevels || numberOfLevels.length < 2) {
    showError("Not enough levels");
    return false;
  }

  return true;
}

function showError(error) {
  console.log(`Invalid quizz: ${error}`);
}

// return the id's of all the quizzes created by the user
function getLocalStorageIDs() {
  const ids = localStorage.getItem("created-quizzes");
  if (!ids) return [];
  const lstIds = JSON.parse(ids);
  return lstIds;
}

// add an id to local storage (if not already there)
function addIDtoLocalStorage(id) {
  const ids = getLocalStorageIDs();
  if (ids.find((i) => id === i)) {
    return;
  }
  ids.push(id);
  localStorage.setItem("created-quizzes", JSON.stringify(ids));
}
