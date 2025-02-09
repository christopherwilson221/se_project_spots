const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
];

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__edit-btn");

const editModal = document.querySelector("#edit-modal");
const editFormElement = editModal.querySelector(".modal__form");
const editModalCloseButton = document.querySelector(".modal__close-button");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);

const newPostButton = document.querySelector(".profile__add-btn");
const addCardModal = document.querySelector("#add-card-modal");
const cardbutton = addCardModal.querySelector(".modal__form");
const addFormElement = addCardModal.querySelector(".modal__form");
const addModalCloseButton = addCardModal.querySelector(".modal__close-button");
const addModalLinkInput = addCardModal.querySelector("#add-card-link-input");
const addModalNameInput = addCardModal.querySelector("#add-card-name-input");
const addCardSubmit = addCardModal.querySelector(".modal__form");

const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = document.querySelector(".modal__image");
const previewModalCaptionEl = document.querySelector(".modal__caption");
const previewModalCloseButton = previewModal.querySelector(
  ".modal__close-button"
);

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImageEL = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  const cardDeletebtn = cardElement.querySelector(".card__delete-button");

  cardNameEl.textContent = data.name;
  cardImageEL.setAttribute("src", data.link);
  cardImageEL.setAttribute("alt", data.name);

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-button_liked");
  });

  cardDeletebtn.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEL.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImageEl.src = data.link;
    previewModalImageEl.alt = data.name;
    previewModalCaptionEl.textContent = data.name;
  });

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", (evt) => {
    if (evt.key === 'Escape') {
      closeModal(modal);
    }
  });
/* selecting with (event.target.id != "modal_opened") (!$(event.target).closest("modal_opened")) (evt.target != this.modal) (!modal == evt.target)
  document.addEventListener("click", function(evt) {
    if (evt.target.classList.contains("modal_opened")) {
      closeModal(modal);
    }
  });
*/
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", (evt) => {
    if (evt.key === 'Escape') {
      closeModal(modal);
    }
  });
  /*
  document.removeEventListener("click", (evt) => {
    if ((evt.target.class != "modal_opened")) {
      closeModal(modal);
    }
  });
  */
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal(editModal);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const inputValues = {
    link: addModalLinkInput.value,
    name: addModalNameInput.value,
  };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  addModalLinkInput.value = "";
  addModalNameInput.value = "";
  disableButton(addCardSubmit, settings);
  /* toggleButtonState(inputList, buttonElement); why did I put this line?*/
  closeModal(addCardModal);
}

profileEditButton.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  resetValidation(editFormElement, [
    editModalNameInput,
    editModalDescriptionInput,
  ]);
  openModal(editModal);
});

editModalCloseButton.addEventListener("click", () => {
  closeModal(editModal);
});

/* for outside click const a area outside of modal?
document.addEventListener("click", (evt) => {
  if (!insidemodal == evt){

  closeModal(editModal);
  };
});
*/

editFormElement.addEventListener("submit", handleEditFormSubmit);

addFormElement.addEventListener("submit", handleAddFormSubmit);

newPostButton.addEventListener("click", () => {
  openModal(addCardModal);
});

addModalCloseButton.addEventListener("click", () => {
  closeModal(addCardModal);
});

addCardModal.addEventListener("keydown", function (e) {
  if (e.keycode == 27) {
    closeModal(addCardModal);
  }
});

previewModalCloseButton.addEventListener("click", () => {
  closeModal(previewModal);
});

initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardsList.prepend(cardElement);
});
