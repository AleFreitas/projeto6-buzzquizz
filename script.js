const URL_QUIZZES = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";

function fetchQuizzes() {
  const quizzesElement = document.querySelector(".quizzes");
  axios
    .get(URL_QUIZZES)
    .then(function (response) {
      const elements = response.data.map(
        (quizz) =>
          `<div class="quizz-card"> <img src="${quizz.image}"></img> <div class="title">${quizz.title}</div> </div>`
      );
      quizzesElement.innerHTML = elements.join("");
    })
    .catch(function (err) {
      console.log(err);
      alert("Erro ao buscar os quizzes. Tente mais tarde");
    });
}

fetchQuizzes();
