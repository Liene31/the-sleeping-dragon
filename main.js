const menuDiv = document.getElementById("menu");
const hamburgerMenuDiv = document.getElementById("hamburger-menu");
const closeMenuImg = document.getElementById("close-menu");

// Opens menu on the smaller screens

hamburgerMenuDiv.addEventListener("click", () => {
  menuDiv.style.display = "block";
  closeMenuImg.style.display = "block";
});
