const urlParams = new URLSearchParams(window.location.search);
const quizzJSON = decodeURIComponent(urlParams.get("quizz"));
let quizzObject = null;

function createLevelsContainers(qJSON) {
  quizzObject = JSON.parse(qJSON);
  const nLevels = quizzObject.numberOfLevels;
  const levelsDiv = document.querySelector(".subcontainer2");
  levelsDiv.innerHTML = "";
  for (let i = 0; i < nLevels; i++) {
    levelsDiv.innerHTML += `
    <li class="subcontainer2">
        <div class="LevelNumber">
          <div class="LevelWindow">
            <div class="ToClick">
              <h3>Nível ${i + 1}</h3>
              <ion-icon onclick="hideandopen()" name="create-outline"></ion-icon>
            </div>
          </div>
            <div class="LevelConfig">
              <input class="levelTitle" placeholder="Título do nível" type="text">
              <input class="levelPercentage" placeholder="% de acerto mínima" type="number">
              <input class="image-url"placeholder="URL da imagem do nível" type="url">
              <input class="level-description" placeholder="Descrição do nível" type="text">
            </div>
          </div>
        </div>
    </li>
    `;
  }
}

function validateLevels() {
  const levelsElement = document.querySelectorAll(".subcontainer2");
  const levels = [];
  levelsElement.forEach((levelElement) => {
    const level = {};
    const title = levelElement.querySelector(".levelTitle").value;
    const minValue = levelElement.querySelector(".levelPercentage").value;
    const image = levelElement.querySelector(".image-url").value;
    const text = levelElement.querySelector(".level-description").value;

    level.title = title;
    level.minValue = minValue;
    level.image = image;
    level.text = text;
    levels.push(level);
  });
  console.log(levels);
  if (validateQuizzLevels(levels)) {
    quizzObject.levels = levels;
    return true;
  }
  return false;
}

function createQuizz() {
  if (validateLevels()) {
    delete quizzObject.numberOfLevels;
    delete quizzObject.numberOfQuestions;
    axios
      .post(URL_QUIZZES, quizzObject)
      .then(function (response) {
        if (response.data.id) {
          addIDtoLocalStorage(response.data.id);
        }
      })
      .catch();
    alert("passando pra proxima pagina");
    window.location.href = "sixthPage.html";
  } else {
    alert("Quizz Inválido. Preencha os dados corretamente");
  }
}
createLevelsContainers(quizzJSON);
