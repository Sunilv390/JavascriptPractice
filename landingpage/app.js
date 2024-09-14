function toggleMenu() {
  const toggleMenu = document.querySelector(".toggleMenu");
  const navigation = document.querySelector(".navigation");
  toggleMenu.classList.toggle("active");
  navigation.classList.toggle("active");
}

function lightDark() {
  const lightDark = document.querySelector(".lightDark");
  lightDark.classList.toggle("active");
  var element = document.body;
  element.classList.toggle("dark-mode");
}
