import arrayProjects from "./arrayProjects.js";

const rootRef = document.querySelector(".section__wrapper__projects-root");
const wrapperBtnRef = document.querySelector(".section__wrapper__list__btn");

const renderProjectsFn = (array) => {
  array.map((item) => {
    rootRef.insertAdjacentHTML(
      "beforeend",
      `<div class="wrapper__projects-root__card">
    <div class="projects-root__card__wrapperImg">
      <div class='projects-root__card__wrapperImg__wrapper_description'>
      <p class='projects-root__card__description'>${item.description}</p>
      </div><picture>
      <source srcset="${item.webp}" type="image/webp">
    <img class="projects-root__card__Img" src="${item.img}" alt="img_project"></picture>
    </div>
    <div class="wrapper__projects-root__card__wrapper__text">
      <h3 class="wrapper__projects-root__card__title"><a target='_blank' href="${item.link}">${item.name}</a></h3>
    <h4 class="wrapper__projects-root__card__subtitle">${item.type}</h4>
  </div>
  </div>`
    );
  });
};
renderProjectsFn(arrayProjects);

const onClickBtnFilter = (event) => {
  const activeBtnRef = event.currentTarget.querySelector(".active");
  if (
    event.target.tagName !== "BUTTON" ||
    event.target.classList.contains("active")
  ) {
    return;
  }
  if (activeBtnRef) {
    activeBtnRef.classList.remove("active");
  }
  event.target.classList.add("active");
  rootRef.classList.add("wrapper__projects-root__card--hidden");
  document.querySelectorAll(".wrapper__projects-root__card").forEach((item) => {
    item.remove();
  });
  if (event.target.dataset.value === "site") {
    setTimeout(() => {
      rootRef.classList.remove("wrapper__projects-root__card--hidden");
    }, 500);

    return renderProjectsFn(
      arrayProjects.filter((item) => item.type === "website")
    );
  }
  if (event.target.dataset.value === "program") {
    setTimeout(() => {
      rootRef.classList.remove("wrapper__projects-root__card--hidden");
    }, 500);
    return renderProjectsFn(
      arrayProjects.filter((item) => item.type === "web-program")
    );
  }
  if (event.target.dataset.value === "design") {
    setTimeout(() => {
      rootRef.classList.remove("wrapper__projects-root__card--hidden");
    }, 500);
    return renderProjectsFn(
      arrayProjects.filter((item) => item.type === "design")
    );
  }
  if (event.target.dataset.value === "all") {
    setTimeout(() => {
      rootRef.classList.remove("wrapper__projects-root__card--hidden");
    }, 500);
    return renderProjectsFn(arrayProjects);
  }
};

wrapperBtnRef.addEventListener("click", onClickBtnFilter);

const closeSideBarRef = document.querySelector(".address__close--js");
const burgerRef = document.querySelector(".header__burger--js");
const sideBarRef = document.querySelector(".header__content-wrapper--js");
const overlayRef = document.querySelector(".form-modal__overlay");
const closeModalRef = document.querySelector(".form__close--js");
const openModalRef = [...document.querySelectorAll(".open-form--js")];
const formModalRef = document.querySelector(".form-modal");
const scrollArrowRef = document.querySelector('.main__arrow');
const menuRef =document.querySelector('.menu');
menuRef.addEventListener("click", (event) => {
  if (!event.target.classList.contains("menu__link")) return;
  [...event.currentTarget.children].forEach((element) =>
    element.firstElementChild.classList.remove("menu__link--active")
  );
  event.target.classList.add("menu__link--active");
  sideBarRef.classList.remove("header__content-wrapper--active");
});
burgerRef.addEventListener("click", () =>
  sideBarRef.classList.add("header__content-wrapper--active")
);
closeSideBarRef.addEventListener("click", () =>
  sideBarRef.classList.remove("header__content-wrapper--active")
);

const removeListeners = () => {
  window.removeEventListener("keydown", closeEsc);
  overlayRef.removeEventListener("click", closeOverlay);
  closeModalRef.removeEventListener("click", closeCrossBtn);
};
const closeEsc = (event) => {
  if (event.code === "Escape") {
    formModalRef.classList.add("form-modal--hidden");
    removeListeners();
  }
};
const closeOverlay = (event) => {
  if (event.target !== event.currentTarget) return;
  formModalRef.classList.add("form-modal--hidden");
  removeListeners();
};
const closeCrossBtn = () => {
  formModalRef.classList.add("form-modal--hidden");
  removeListeners();
};
openModalRef.forEach((element) => {
  element.addEventListener("click", () => {
    formModalRef.classList.remove("form-modal--hidden");
    window.addEventListener("keydown", closeEsc);
    overlayRef.addEventListener("click", closeOverlay);
    closeModalRef.addEventListener("click", closeCrossBtn);
	})
});

function phoneValid() {
	formRemoveError(document.getElementById("phone"));
  const validNumber = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  if(!document.getElementById("phone").value.match(validNumber)){
		document.getElementById("number__span").textContent = "Enter a valid phone number!";
		formAddError(document.getElementById("phone"));
		document.querySelector(".form").onsubmit = function () {
			return false;
		}
	}
	else {
		document.getElementById("number__span").textContent = "";
		document.querySelector(".form").action = "https://formspree.io/f/mdoyldre";
		formModalRef.classList.add("form-modal--hidden");
		document.querySelector(".form").onsubmit = function () {
			return true;
		}
		removeListeners();
		return true;
  }
}

function formAddError(input) {
	input.parentNode.classList.add("_error");
	input.classList.add("_error")
}
function formRemoveError(input) {
	input.parentNode.classList.remove("_error");
	input.classList.remove("_error");
}

document.querySelector(".form__submit").addEventListener('click', phoneValid);
window.addEventListener('scroll', _.throttle(() => {
  if (window.pageYOffset > 680) {
    scrollArrowRef.classList.remove('main__arrow--hidden')
  } else {
    scrollArrowRef.classList.add('main__arrow--hidden')
  }
}, 400));