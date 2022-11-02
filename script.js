function fetchQuizzes() {
  const quizzesElement = document.querySelector(".quizzes-panel .quizzes");
  const localQuizzesElement = document.querySelector(".quizzes");
  const localQuizzesIds = getLocalStorageIDs();
  let hasLocalQuizzes = false;
  console.log(localQuizzesIds);
  axios
    .get(URL_QUIZZES)
    .then(function (response) {
      response.data.forEach((quizz) => {
        const inner = `<div onclick="beginQuizz(${quizz.id})" class="quizz-card"> <img src="${quizz.image}"></img> <div class="title">${quizz.title}</div> </div>`;
        if (localQuizzesIds.find((id) => id == quizz.id)) {
          console.log(inner);
          localQuizzesElement.innerHTML += inner;
          hasLocalQuizzes = true;
          console.log(localQuizzesElement);
        } else {
          quizzesElement.innerHTML += inner;
        }
      });
      quizzes = response.data;
      if (hasLocalQuizzes) {
        const userQuizzes = document.querySelector(".user-quizzes");
        userQuizzes.classList.remove("empty");
        userQuizzes.classList.add("not-empty");
      }
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
  window.location.href = `secondPage.html?quizzID=${quizzID}`;
}

fetchQuizzes();
