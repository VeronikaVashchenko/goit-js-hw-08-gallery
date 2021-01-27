import galleryItems from "./gallery-items.js";

const gallery = document.querySelector(".js-gallery");
const modal = document.querySelector(".js-lightbox");
const lightboxImage = document.querySelector(".lightbox__image");
const closeModal = document.querySelector(
  'button[data-action="close-lightbox"]'
);

galleryItems.forEach(({ preview, original, description }) => {
  gallery.insertAdjacentHTML(
    "beforeend",
    `<li class="gallery__item">
      <a 
        class="gallery__link"
        href=${original}
        >
        <img
          class="gallery__image"
          src=${preview}
          data-source=${original}
          alt=${description}
        />
      </a>
    </li>`
  );
});

gallery.addEventListener("click", onImgClick);

function onImgClick(event) {
  event.preventDefault();
  const galleryImg = event.target.classList.contains("gallery__image");
  if (!galleryImg) {
    return;
  }

  lightboxImage.src = `${event.target.dataset.source}`;
  lightboxImage.alt = `${event.target.alt}`;

  modal.classList.add("is-open");
}

closeModal.addEventListener("click", onClickCloseBtn);

function onClickCloseBtn() {
  modal.classList.remove("is-open");
  lightboxImage.src = "";
  lightboxImage.alt = "";
}

// Создание и рендер разметки по массиву данных и предоставленному шаблону.
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image.
// Это необходимо для того, чтобы при следующем открытии модального окна,
// пока грузится изображение, мы не видели предыдущее.
