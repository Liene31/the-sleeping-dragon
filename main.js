const menuDiv = document.getElementById("menu");
const hamburgerMenuDiv = document.getElementById("hamburger-menu");

// Opens menu on the smaller screens

hamburgerMenuDiv.addEventListener("click", () => {
  menuDiv.style.display = "block";
});
