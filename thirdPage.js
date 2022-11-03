function proceedpage (){
    const quizztitle = document.querySelector('#quizztitle');
    const quizzimg = document.querySelector('#quizzimg');
    const quizzquestions = document.querySelector('#quizzquestions');
    const quizzlevels = document.querySelector('#quizzlevels');

    if(validateQuizzHeaders(quizztitle.value, quizzimg.value, quizzquestions.value, quizzlevels.value)){
        window.location.href='fourthPage.html';
    }
    else {
        alert('Quizz Inválido');
    }
}