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
    for(i=0;i<response.data.questions.length;i++){
        let question = response.data.questions[i];
        let answers = "";
        for(j=0;j<question.answers.length;j++){
            answers += `
            <div class="answer ${question.answers[j].isCorrectAnswer}">
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
            </div>
        </div>
        `
        questionsSection.innerHTML += newQuestion
        let color = document.getElementById(`${i}`);
        color.style.backgroundColor = question.color;
    }
}

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("quizzID");
getQuizz(id)