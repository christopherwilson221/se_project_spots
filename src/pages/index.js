import "./index.css";
import {enableValidation, validationConfig, resetValidation, disableButton} from "../scripts/validation.js";
import Api from "../utils/Api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "87bbadf6-03b9-43cf-8ecb-375d8493d0fc",
    "Content-Type": "application/json"
  }
});

api.getAppInfo()
  .then(([cards, userData]) => {
    cards.forEach((item) => {
     const cardElement = getCardElement(item);
     cardsList.prepend(cardElement);
    });
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    avatarPicture.src = userData.avatar;
  })
  .catch(console.error);

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__edit-btn");

const editModal = document.querySelector("#edit-modal");
const editFormElement = editModal.querySelector(".modal__form");
const editModalCloseButton = document.querySelector(".modal__close-button");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalSubmit = editModal.querySelector(".modal__submit-button");
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
const avatarCardSubmit = avatarModal.querySelector(".modal__submit-button");
const avatarFormElement = avatarModal.querySelector(".modal__form");

const cardDeleteModal = document.querySelector("#card-delete-modal");
const cardModalConfirm = cardDeleteModal.querySelector(".modal__delete-button");
const cardModalCancel = cardDeleteModal.querySelector(".modal__no-delete-button");

let cardToDelete = null

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
  const cardId = data._id;

  cardNameEl.textContent = data.name;
  cardImageEL.setAttribute("src", data.link);
  cardImageEL.setAttribute("alt", data.name);

  if(data.isLiked){
    cardLikeBtn.classList.add("card__like-button_liked")
  }

  cardLikeBtn.addEventListener("click", () => {
    if (cardLikeBtn.classList.contains("card__like-button_liked")){
      api.dislikeCardInfo(cardId)
      .then(() => {
        cardLikeBtn.classList.toggle("card__like-button_liked");})
        .catch(console.error);
    }
    else {
      api.likeCardInfo(cardId)
       .then(() => {
        cardLikeBtn.classList.toggle("card__like-button_liked");})
        .catch(console.error);
    }
  });

  cardDeletebtn.addEventListener("click", () => {
    cardToDelete = {
      element: cardElement,
      id: cardId
    };
    openModal(cardDeleteModal);
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
  handleLoadingState(editModalSubmit, true);
  api.editUserInfo({
    name:  editModalNameInput.value,
    about: editModalDescriptionInput.value
  })
    .then((data) =>{
  profileName.textContent = data.name;
  profileDescription.textContent = data.about;
  closeModal(editModal);
    })
    .catch(console.error)
    .finally(() =>{
      handleLoadingState(editModalSubmit, false)}
    )};


function handleAddFormSubmit(evt) {
  evt.preventDefault();
  handleLoadingState(addCardSubmit, true);
  api.createCardInfo({
    link: addModalLinkInput.value ,
    name: addModalNameInput.value
  })
   .then((data) =>{
    const cardElement = getCardElement(data);
    cardsList.prepend(cardElement);
    addFormElement.reset();
    disableButton(addCardSubmit);
    closeModal(addCardModal);
  })
  .catch(console.error)
  .finally(() =>{
  handleLoadingState(addCardSubmit, false)
});
}

function handleAvatarFormSubmit(evt){
  evt.preventDefault();
  handleLoadingState(avatarCardSubmit, true);
  api.editAvatarInfo(avatarModalInput.value)
  .then((res) => {
    avatarPicture.src = res.avatar;
    closeModal(avatarModal);
  })
  .catch(console.error)
  .finally(() =>{
  handleLoadingState(avatarCardSubmit, false)});
}

function handleLoadingState(button, isLoading) {
  button.textContent = isLoading ? "Saving..." : "Save";
}

function handleDeleteLoadingState(button, isLoading) {
  button.textContent = isLoading ? "Deleting..." : "Delete";
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

avatarFormElement.addEventListener("submit", handleAvatarFormSubmit);

newPostButton.addEventListener("click", () => {
  openModal(addCardModal);
});

avatarEditButton.addEventListener("click", () => {
  openModal(avatarModal);
});

cardModalCancel.addEventListener("click", () => {
  closeModal(cardDeleteModal) });

cardModalConfirm.addEventListener("click", () => {
  handleDeleteLoadingState(cardModalConfirm, true);
  api.deleteCardInfo(cardToDelete.id)
  .then(() => {
   cardToDelete.element.remove();
   closeModal(cardDeleteModal);
  })
  .catch(console.error)
  .finally(() => {
   handleDeleteLoadingState(cardModalConfirm, false);
  });
   });


enableValidation(validationConfig);
