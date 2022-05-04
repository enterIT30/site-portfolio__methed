const presentOrderBtn = document.querySelector('.present__order-btn');
const pageOverlayModal = document.querySelector('.page__overlay_modal');
const modalClose = document.querySelector('.modal__close-svg');

const headerContactsBurger = document.querySelector('.header__contacts-burger');
const headerContacts = document.querySelector('.header__contacts');

const portfolioList = document.querySelector('.portfolio__list');
const pageOverlay = document.createElement('div');

const portfolioAdd = document.querySelector('.portfolio__add');
const COUNT_CARD = 2;


// MODAL ==================================================================================

let handlerModal = (btnOpen, modal, changeClass, btnClose, openingSpeed) => {
// можно не исп тернарн опер - присв занчен по умолч openingSpeed = 'default') =>

  let opacity = 0;

  const speedTypes = {
    slow: 15,
    medium: 8,
    fast: 1,
    default: 5,
  };

  function openModal() {
    disabledScroll();
    modal.style.opacity = opacity;

    modal.classList.add(changeClass);

    let changeOpacity = setInterval(() => {
      opacity = opacity + 0.02;
      modal.style.opacity = opacity;

      if (opacity >= 1) clearInterval(changeOpacity);
    }, speedTypes[openingSpeed] ? speedTypes[openingSpeed] : speedTypes.default);
  }

  function closeModal(){
    enabledScroll();
    let changeOpacity = setInterval(() => {
      opacity = opacity - 0.02;
      modal.style.opacity = opacity;

      if (opacity <= 0) {
        clearInterval(changeOpacity);
        modal.classList.remove(changeClass);
      }
    }, speedTypes[openingSpeed] ? speedTypes[openingSpeed] : speedTypes.default);
  }

  btnOpen.addEventListener('click', openModal); // можно опустить стрелочную функцию и скобки вызова

  btnClose.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => { // закрытие при клике на пустоту
    if (e.target === modal) {
      closeModal();
    }
  });
};

handlerModal(presentOrderBtn, pageOverlayModal, 'page__overlay_modal_open', modalClose, 'slow');

// SCROLL ==================================================================================

/* плохо работает на iPhone
  function disabledScroll() {
  document.body.style.overflow = 'hidden';
} */

// более надужный вариант
function disabledScroll() {

  // const widthScroll = window.innerHeight - document.body.offsetWidth;
  /* нужно добавить, если нужно убрать скачек за счет появления скрола
  padding-right: ${widthScroll} */
  

  document.body.scrollPosition = window.scrollY;// создание св-ва эл-та body

  document.body.style.cssText =`
    overflow: hidden;
    top: -${document.body.scrollPosition}px; //!!!
    left: 0;
    height: 100vh;
    `;
}
/* Ломают верстку
  position: fixed;
  width: 100vh;
*/

function enabledScroll() {
  document.body.style.cssText = 'position: relative';
  window.scroll({top: document.body.scrollPosition}); //!!!
}

// BURGER MENU ==================================================================================

let handlerBurger = (btnClick, menu, changeClass) => {
  btnClick.addEventListener('click', () => {

    if (menu.classList.contains(changeClass)) {
      menu.style.height = '';
      menu.classList.remove(changeClass);
    } else {
      menu.style.height = menu.scrollHeight + 'px'; // измерение высоты контента в элементе, включая содержимое
      menu.classList.add(changeClass);  // высота меню будет подстраиваться под наполнения контентом
    }
  });
};

handlerBurger(headerContactsBurger, headerContacts, 'header__contacts_open');

// GALLERY ==================================================================================

pageOverlay.classList.add('page__overlay');

portfolioList.addEventListener('click', (e) => {
  const card = e.target.closest('.card');
  if (card) {
    disabledScroll();
    document.body.append(pageOverlay);
    let title = card.querySelector('.card__client');

    const imgBig = document.createElement('picture');

    imgBig.style.cssText = `
      position: absolute;
      top: 0px;
      right: 50%;
      transform: translateX(50%);
      width: 90%;
      max-width: 1440px;
    `;

    imgBig.innerHTML = `
      <source srcset="${card.dataset.fullImage}.avif" type="image/avif">
      <source srcset="${card.dataset.fullImage}.webp" type="image/webp">
      <img src="${card.dataset.fullImage}.jpg" alt="${title.textContent}">
    `;
    pageOverlay.append(imgBig);
  }
});

pageOverlay.addEventListener('click', (e) => {
  enabledScroll();
  pageOverlay.remove();
  pageOverlay.textContent = ''; // очистить page__overlay
});

// MORE ==================================================================================

//!!! Мало что понял в этом блоке

let getData = () => fetch('db.json')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw `Что-то пошло не так, попробуйте позже. Ошибка: ${response.status}`;
      }
    })
    .catch(error => console.error(error));


//!!! Мало что понял в этом блоке
/*
Сделали функцию асинхронной, она запросила getData(), вернулся fetch,
что-то еще запрашивает, await ничего не присваивает в const data, пока
getData() не закончит свое выполнение. getData() запросила данные, получила,
проверила на response.ok === true, вернула эти данные или вернула ошибку
*/

let createStore = async () => {
  const data = await getData();

  return {
    data,
    counter: 0,
    count: COUNT_CARD, // количество добавляемых карточек
    get length() {
      return this.data.length;
    },
    get cardData() {
      const renderData = this.data.slice(this.counter, this.counter + this.count);
      this.counter += renderData.length;
      return renderData;
    },
  };
};

let renderCard = data => {
  const cards = data.map(({ preview, image, client, year, type }) => {

    //const { preview, image, client, year, type } = item; можно не повторять а поместить в аргумент

    const li = document.createElement('li');
    li.classList.add('portfolio__item');
    li.innerHTML = `
      <article class="card" tabindex="0" role="button" aria-label="открыть макет" data-full-image="${image}">
        <picture class="card__picture">
          <source srcset="${preview}.avif" type="image/avif">
          <source srcset="${preview}.webp" type="image/webp">
          <img src="${preview}.jpg" alt="превью ${client}" width="166" height="103">
        </picture>

        <p class="card__data">
          <span class="card__client">Клиент: ${client}</span>
          <time class="card__date" datetime="${year}">год: ${year}</time>
        </p>

        <h3 class="card__title">${type}</h3>
      </article>
    `;
    return li;
  });

  portfolioList.append(...cards);
};



const initPortfolio = async () => {
  const store = await createStore();
  renderCard(store.cardData);
  portfolioAdd.addEventListener('click', () => {
    renderCard(store.cardData);
    if (store.length === store.counter) {
      portfolioAdd.remove();
    }
  });
};

initPortfolio();
