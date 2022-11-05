function loadImage() {
  const urlParams = new URLSearchParams(window.location.search);
  const imageUrl = decodeURIComponent(urlParams.get("imageUrl"));
  const imgElement = document.querySelector(".insidethesection img");
  imgElement.src = imageUrl;
}

loadImage();
