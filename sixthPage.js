function loadImage() {
  const urlParams = new URLSearchParams(window.location.search);
  const imageUrl = decodeURIComponent(urlParams.get("imageUrl"));
  const imgElement = document.querySelector(".insidethesection img");
  imgElement.src = imageUrl;
}
function prepareButton() {
  const urlParams = new URLSearchParams(window.location.search);
  const quizzID = urlParams.get("quizzID");
  const btn = document.querySelector("button");
  btn.innerHTML = `<a href="secondPage.html?quizzID=${quizzID}">Acessar Quizz</a>`;
}

loadImage();
prepareButton();
