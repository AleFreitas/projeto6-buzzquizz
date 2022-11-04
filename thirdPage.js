function proceedpage() {
  const quizztitle = document.querySelector("#quizztitle");
  const quizzimg = document.querySelector("#quizzimg");
  const quizzquestions = document.querySelector("#quizzquestions");
  const quizzlevels = document.querySelector("#quizzlevels");

  if (
    validateQuizzHeaders(
      quizztitle.value,
      quizzimg.value,
      quizzquestions.value,
      quizzlevels.value
    )
  ) {
    const question = {
      title: quizztitle.value,
      image: quizzimg.value,
      numberOfQuestions: Number(quizzquestions.value),
      numberOfLevels: Number(quizzlevels.value),
    };
    window.location.href = `fourthPage.html?quizz=${JSON.stringify(
      question
    )}`;
  } else {
    alert("Quizz Inválido");
  }
}
