function getQuizz(id){
    const quizz = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/"+id)
    quizz.then(buildHeader);
    quizz.catch(function (err) {
        console.log(err);
        alert("Erro ao buscar o quizz. Tente mais tarde");
      });
}
function buildHeader(response){
    console.log("buildingHeader")
    header = document.querySelector(".quizzHeader")
    header.innerHTML = `
    <img src="${response.data.image}">
    <div>
        <p>${response.data.title}</p>
    </div>
    `
}
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("quizzID");
getQuizz(id)