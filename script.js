
function fetchQuizzes() {
  const quizzesElement = document.querySelector(".quizzes");
  axios
    .get(URL_QUIZZES)
    .then(function (response) {
      const elements = response.data.map(
        (quizz) =>
          `<div onclick="beginQuizz(${quizz.id})" class="quizz-card"> <img src="${quizz.image}"></img> <div class="title">${quizz.title}</div> </div>`
      );
      quizzesElement.innerHTML = elements.join("");
      quizzes = response.data;
    })
    .catch(function (err) {
      console.log(err);
      alert("Erro ao buscar os quizzes. Tente mais tarde");
    });
}

function beginCreateQuizz() {
  window.location.href = "thirdPage.html";
}

function beginQuizz(quizzID) {
  const arr = quizzes.filter(function (q) {
    return q.id === quizzID;
  });

  if (arr.length >= 1) {
    selectedQuizz = arr[0];
    console.log(selectedQuizz);
  }
}

fetchQuizzes();