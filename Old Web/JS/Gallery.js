function openModal(imageSrc) {
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("modal-image");
    modal.style.display = "block";
    modalImg.src = imageSrc;
}
  
function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

function filterImages(category) {
    var images = document.getElementById("image-gallery").getElementsByClassName("gallery-image");
  
    if (category === "all") {
      for (var i = 0; i < images.length; i++) {
        images[i].style.display = "block";
      }
    } else {
      for (var i = 0; i < images.length; i++) {
        if (images[i].classList.contains(category)) {
          images[i].style.display = "block";
        } else {
          images[i].style.display = "none";
        }
      }
    }
}