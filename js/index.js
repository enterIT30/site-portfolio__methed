const presentOrderBtn = document.querySelector('.present__order-btn');
const pageOverlayModal = document.querySelector('.page__overlay_modal');
const modalClose = document.querySelector('.modal__close-svg');



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
    console.log(e.target);
    if (e.target === modal) {
      closeModal();
    }
  });
}

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
  position: fixed;
  top: -${document.body.scrollPosition}px; //!!!!!
  left: 0;
  height: 100vh;
  `;
}

function enabledScroll() {
  document.body.style.cssText = 'position: relative';
  window.scroll({top: document.body.scrollPosition}); //!!!!!
}

handlerModal(presentOrderBtn, pageOverlayModal, 'page__overlay_modal_open', modalClose, 'slow');










{
  const headerContactsBurger = document.querySelector('.header__contacts-burger');
  const headerContacts = document.querySelector('.header__contacts');
  
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
}
