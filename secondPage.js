let rightAnswers = 0;
let wrongAnswers = 0;
let NumberOfQuestions = 0;
let levels = []
function getQuizz(id){
    const quizz = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/"+id)
    quizz.then(buildQuizz);
    quizz.catch(function (err) {
        console.log(err);
        alert("Erro ao buscar o quizz. Tente mais tarde");
      });
}
function buildQuizz(response){
    //building header
    const header = document.querySelector(".quizzHeader")
    header.innerHTML = `
    <img src="${response.data.image}">
    <div>
        <p>${response.data.title}</p>
    </div>
    `
    //building questions
    const questionsSection = document.querySelector("section") 
    NumberOfQuestions = response.data.questions.length;
    for(i=0;i<response.data.questions.length;i++){
        let question = response.data.questions[i];
        let answers = "";
        for(j=0;j<question.answers.length;j++){
            answers += `
            <div class="answer ${question.answers[j].isCorrectAnswer} answerNotChosen" onclick="selectAnswer(this)">
                <img src="${question.answers[j].image}" alt="answer image">
                <p>
                    ${question.answers[j].text}
                </p>
            </div>
            `
        }
        newQuestion = `
        <div class="question">
            <div class="questionTitle" id="${i}">
                ${question.title}
            </div>
            <div class="questionAnswers">
                ${answers}
                <div class="select hidden"></div>
            </div>
        </div>
        `
        questionsSection.innerHTML += newQuestion
        let color = document.getElementById(`${i}`);
        color.style.backgroundColor = question.color;
        levels = response.data.levels
    }
}
function selectAnswer(element){
    const parent = element.parentNode
    element.classList.add("selected")
    if(element.classList.contains("true")){
        rightAnswers++
    }else{
        wrongAnswers++
    }
    for(i=0;i<parent.children.length;i++){
        let option = parent.children[i]
        if(option.classList.contains("select")){
            option.classList.remove("hidden")
            break;
        }else{
            option.classList.remove("answerNotChosen")
        }
    }
    if((rightAnswers+wrongAnswers) === NumberOfQuestions){
        finishGame()   
    }
}
function finishGame(){
    endGame = document.querySelector(".endGame");
    endGame.classList.remove("hidden");
    percentage = (rightAnswers/NumberOfQuestions)*100;
    levelReached = ""
    for(i=0;i<levels.length;i++){
        if(levels[i].minValue < percentage){
            levelReached = levels[i]
        }
    }
    endGame.innerHTML+=`
    <div class="endTitle">
        ${levelReached.title}
    </div>
    <div class="endContent">
        <img src="${levelReached.image}">
        <p>${levelReached.text}</p>
    </div>
    <button onclick="resetGame()">Reiniciar Quizz</button>
    <a href="index.html">Voltar pra home</a>
    `
}


const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("quizzID");
getQuizz(id)