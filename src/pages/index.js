import "./index.css";
import {enableValidation, validationConfig, resetValidation} from "../scripts/validation.js";
import Api from "../utils/Api.js";

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

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "87bbadf6-03b9-43cf-8ecb-375d8493d0fc",
    "Content-Type": "application/json"
  }
});


//destructure 2nd item in callback of .then()
api
.getAppInfo()
.then(([cards]) => {
  cards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardsList.prepend(cardElement);

  //handle user info
  //set src of avatar inmage
  //textcontent of boh text elements
});
})
.catch(console.error);



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
const addFormElement = addCardModal.querySelector(".modal__form");
const addModalCloseButton = addCardModal.querySelector(".modal__close-button");
const addModalLinkInput = addCardModal.querySelector("#add-card-link-input");
const addModalNameInput = addCardModal.querySelector("#add-card-name-input");
const addCardSubmit = addCardModal.querySelector(".modal__submit-button");

const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = document.querySelector(".modal__image");
const previewModalCaptionEl = document.querySelector(".modal__caption");
const previewModalCloseButton = previewModal.querySelector(
  ".modal__close-button"
);

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

const modals = document.querySelectorAll(".modal");

const avatarEditButton = document.querySelector(".profile__avatar-button");
const avatarModal = document.querySelector("#avatar-modal");
const avatarModalInput = avatarModal.querySelector("#profile-avatar-input");
const avatarPicture = document.querySelector(".profile__avatar");
const avatarModalNameInput = avatarModal.querySelector("#profile-name-input");
const avatarCardSubmit = addCardModal.querySelector(".modal__submit-button");

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const activeModal = document.querySelector(".modal_opened");
    closeModal(activeModal);
  }
}

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
  document.addEventListener("keyup", handleEscape);
}

modals.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("modal") ||
      evt.target.classList.contains("modal__close-button")
    ) {
      closeModal(modal);
    }
  });
});

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keyup", handleEscape);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  api.editUserInfo({name:  editModalNameInput.value, about: editModalDescriptionInput.value})
    .then((data) =>{
  profileName.textContent = data.name;
  profileDescription.textContent = data.about;
  closeModal(editModal);
    })
    .catch(console.error);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  api.createCardInfo({link: addModalLinkInput.value , name:addModalNameInput.value })
  .then((data) =>{
    const cardElement = getCardElement(data);
    cardsList.prepend(cardElement);
    data.link = "";
    data.name = "";
    disableButton(addCardSubmit, settings);
    closeModal(addCardModal);
  })
  };

function handleAvatarFormSubmit(evt){
  evt.preventDefault();
  api.editAvatarInfo({avatar: avatarModalInput.value})
  .then((data) => {
    data.avatar = avatarPicture.value;
  })

}

profileEditButton.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  resetValidation(editFormElement, [
    editModalNameInput,
    editModalDescriptionInput,
  ], validationConfig);
  openModal(editModal);
});

editFormElement.addEventListener("submit", handleEditFormSubmit);

addFormElement.addEventListener("submit", handleAddFormSubmit);

avatarCardSubmit.addEventListener("submit", handleAvatarFormSubmit);

newPostButton.addEventListener("click", () => {
  openModal(addCardModal);
});

avatarEditButton.addEventListener("click", () => {
  openModal(avatarModal);
});




enableValidation(validationConfig);
