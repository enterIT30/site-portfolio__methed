{
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

    btnOpen.addEventListener('click', () => {
      modal.style.opacity = opacity;

      modal.classList.add(changeClass);

      let changeOpacity = setInterval(() => {
        opacity = opacity + 0.02;
        modal.style.opacity = opacity;

        if (opacity >= 1) clearInterval(changeOpacity);
      }, speedTypes[openingSpeed] ? speedTypes[openingSpeed] : speedTypes.default);
    });

    btnClose.addEventListener('click', () => {

      let changeOpacity = setInterval(() => {
        opacity = opacity - 0.02;
        modal.style.opacity = opacity;

        if (opacity <= 0) {
          clearInterval(changeOpacity);
          modal.classList.remove(changeClass);
        }
      }, speedTypes[openingSpeed] ? speedTypes[openingSpeed] : speedTypes.default);
    });

  };

  handlerModal(presentOrderBtn, pageOverlayModal, 'page__overlay_modal_open', modalClose, 'slow');
}

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
