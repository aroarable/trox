const profilLogo = document.querySelectorAll(".profil-logo");
const roleAdd = document.querySelectorAll(".role-add");
const input = document.querySelectorAll(".message input");
// BU SİTENİN TÜM KODLAMASI VE TASARIMI MAZGE TARAFINDAN ÖZENLE YAZILMIŞ VE TASARLANMIŞTIR.
const modal = document.querySelector(".modal-container");
const helpBtn = document.querySelector(".help-btn");
const feedbackInput = document.querySelector("#feedback-input");
// BU SİTENİN TÜM KODLAMASI VE TASARIMI MAZGE TARAFINDAN ÖZENLE YAZILMIŞ VE TASARLANMIŞTIR.

const randomHexColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
// BU SİTENİN TÜM KODLAMASI VE TASARIMI MAZGE TARAFINDAN ÖZENLE YAZILMIŞ VE TASARLANMIŞTIR.
};

const ramdomWord = () => {
// BU SİTENİN TÜM KODLAMASI VE TASARIMI MAZGE TARAFINDAN ÖZENLE YAZILMIŞ VE TASARLANMIŞTIR.
  const words = [
    "Awesome",
    "Cool",
// BU SİTENİN TÜM KODLAMASI VE TASARIMI MAZGE TARAFINDAN ÖZENLE YAZILMIŞ VE TASARLANMIŞTIR.
    "Great",
    "Nice",
    "Super",
// BU SİTENİN TÜM KODLAMASI VE TASARIMI MAZGE TARAFINDAN ÖZENLE YAZILMIŞ VE TASARLANMIŞTIR.
    "Superb",
    "Superior",
    "Wonderful",
// BU SİTENİN TÜM KODLAMASI VE TASARIMI MAZGE TARAFINDAN ÖZENLE YAZILMIŞ VE TASARLANMIŞTIR.
    "Amazing",
    "Fantastic",
    "Fabulous",
// BU SİTENİN TÜM KODLAMASI VE TASARIMI MAZGE TARAFINDAN ÖZENLE YAZILMIŞ VE TASARLANMIŞTIR.
    "Incredible",
    "Marvelous",
    "Spectacular",
// BU SİTENİN TÜM KODLAMASI VE TASARIMI MAZGE TARAFINDAN ÖZENLE YAZILMIŞ VE TASARLANMIŞTIR.
    "Stupendous",
    "Terrific",
    "Astounding",
// BU SİTENİN TÜM KODLAMASI VE TASARIMI MAZGE TARAFINDAN ÖZENLE YAZILMIŞ VE TASARLANMIŞTIR.
  ];
  return words[Math.floor(Math.random() * words.length)];
};
// BU SİTENİN TÜM KODLAMASI VE TASARIMI MAZGE TARAFINDAN ÖZENLE YAZILMIŞ VE TASARLANMIŞTIR.

const addRole = (card) => {
  const role = document.createElement("div");
// BU SİTENİN TÜM KODLAMASI VE TASARIMI MAZGE TARAFINDAN ÖZENLE YAZILMIŞ VE TASARLANMIŞTIR.
  const roleColor = document.createElement("div");
  const roleText = document.createElement("p");
  role.classList.add("role");
// BU SİTENİN TÜM KODLAMASI VE TASARIMI MAZGE TARAFINDAN ÖZENLE YAZILMIŞ VE TASARLANMIŞTIR.
  roleColor.classList.add("role-color");
  roleColor.style.backgroundColor = randomHexColor();
  roleText.innerText = ramdomWord();
// BU SİTENİN TÜM KODLAMASI VE TASARIMI MAZGE TARAFINDAN ÖZENLE YAZILMIŞ VE TASARLANMIŞTIR.
  role.append(roleColor, roleText);
  card.parentElement.append(role, card);
  removeRole();
// BU SİTENİN TÜM KODLAMASI VE TASARIMI MAZGE TARAFINDAN ÖZENLE YAZILMIŞ VE TASARLANMIŞTIR.
};

const removeRole = () => {
// BU SİTENİN TÜM KODLAMASI VE TASARIMI MAZGE TARAFINDAN ÖZENLE YAZILMIŞ VE TASARLANMIŞTIR.
  const roles = document.querySelectorAll(".role-color");
  roles.forEach((role) => {
    role.addEventListener("click", (e) => {
// BU SİTENİN TÜM KODLAMASI VE TASARIMI MAZGE TARAFINDAN ÖZENLE YAZILMIŞ VE TASARLANMIŞTIR.
      e.target.parentElement.remove();
    });
  });
// BU SİTENİN TÜM KODLAMASI VE TASARIMI MAZGE TARAFINDAN ÖZENLE YAZILMIŞ VE TASARLANMIŞTIR.
};

const toggleModal = () => {
// BU SİTENİN TÜM KODLAMASI VE TASARIMI MAZGE TARAFINDAN ÖZENLE YAZILMIŞ VE TASARLANMIŞTIR.
  modal.classList.toggle("active");
};

profilLogo.forEach((logo) => {
  logo.addEventListener("click", toggleModal);
});
// BU SİTENİN TÜM KODLAMASI VE TASARIMI MAZGE TARAFINDAN ÖZENLE YAZILMIŞ VE TASARLANMIŞTIR.

roleAdd.forEach((add) => {
  add.addEventListener("click", () => {
// BU SİTENİN TÜM KODLAMASI VE TASARIMI MAZGE TARAFINDAN ÖZENLE YAZILMIŞ VE TASARLANMIŞTIR.
    addRole(add);
  });
});
// BU SİTENİN TÜM KODLAMASI VE TASARIMI MAZGE TARAFINDAN ÖZENLE YAZILMIŞ VE TASARLANMIŞTIR.

input.forEach((input) => {
  input.addEventListener("keyup", (e) => {
// BU SİTENİN TÜM KODLAMASI VE TASARIMI MAZGE TARAFINDAN ÖZENLE YAZILMIŞ VE TASARLANMIŞTIR.
    if (e.key === "Enter") {
      input.value = "";
      input.blur();
// BU SİTENİN TÜM KODLAMASI VE TASARIMI MAZGE TARAFINDAN ÖZENLE YAZILMIŞ VE TASARLANMIŞTIR.
      toggleModal();
    }
  });
// BU SİTENİN TÜM KODLAMASI VE TASARIMI MAZGE TARAFINDAN ÖZENLE YAZILMIŞ VE TASARLANMIŞTIR.
});

modal.addEventListener("click", (e) => {
// BU SİTENİN TÜM KODLAMASI VE TASARIMI MAZGE TARAFINDAN ÖZENLE YAZILMIŞ VE TASARLANMIŞTIR.
  if (e.target === modal) {
    toggleModal();
  }
// BU SİTENİN TÜM KODLAMASI VE TASARIMI MAZGE TARAFINDAN ÖZENLE YAZILMIŞ VE TASARLANMIŞTIR.
});

helpBtn.addEventListener("click", () => {
// BU SİTENİN TÜM KODLAMASI VE TASARIMI MAZGE TARAFINDAN ÖZENLE YAZILMIŞ VE TASARLANMIŞTIR.
  toggleModal();
});

feedbackInput.addEventListener("keyup", (e) => {
  const feedbackState = document.querySelector(".feedback-state");
  if (e.key === "Enter") {
// BU SİTENİN TÜM KODLAMASI VE TASARIMI MAZGE TARAFINDAN ÖZENLE YAZILMIŞ VE TASARLANMIŞTIR.
    feedbackInput.blur();
    // Api wiil be add soon for a complete feedback system for me ( more big project will be add soon on my github, that's why would be nice to have a feedback system ) :)
    feedbackState.classList.add("error");
// BU SİTENİN TÜM KODLAMASI VE TASARIMI MAZGE TARAFINDAN ÖZENLE YAZILMIŞ VE TASARLANMIŞTIR.
    feedbackState.innerText = "Api is not available for the moment, try later.";
  }
});
// BU SİTENİN TÜM KODLAMASI VE TASARIMI MAZGE TARAFINDAN ÖZENLE YAZILMIŞ VE TASARLANMIŞTIR.

removeRole();
