//----------------- Скролл меню -----------------// 
const rect = document.querySelector(".menu-page__rectnagle span");
const menu_list = document.querySelectorAll("[data-menu]");
const block_list = document.querySelectorAll("[data-block]");

// Изменение меню при скроле на блок
document.addEventListener("scroll", () => {
  const view_top = window.scrollY;

  block_list.forEach(block => {
    const coords = getCoords(block);
    if (view_top >= coords.top - 150 && view_top <= coords.bottom - 150) {
      setMenuItemActiveByDataset(block.dataset.block);
    }
  });
});

// Скролл к блоку по нажатию на меню
menu_list.forEach(item => {
  item.addEventListener('click', () => {
    scrollToBlockByDataset(item.dataset.menu);
  });
});

const getCoords = (elem) => {
  let box = elem.getBoundingClientRect();
  return {
    top: box.top + window.pageYOffset,
    right: box.right + window.pageXOffset,
    bottom: box.bottom + window.pageYOffset,
    left: box.left + window.pageXOffset
  };
}

const setMenuItemActiveByDataset = (data) => {
  menu_list.forEach((el, i) => {
    el.classList.remove("_active");
    if (el.dataset.menu == data) {
      el.classList.add("_active");
      let precent = i == 0 ? 10 : (i + 1) * 25;
      if (!!rect) rect.style.height = precent + "%";
    }
  })
}

const scrollToBlockByDataset = (data) => {
  block_list.forEach(block => {
    if (block.dataset.block == data) {
      const coords = getCoords(block);
      window.scrollTo({ top: coords.top - 40, behavior: 'smooth' });
    }
  })
}
//----------------- Скролл меню -----------------//
//
//
//
//----------------- Загрузка файла -----------------//
const file_block = document.querySelectorAll('.__file');

file_block.forEach(block => {
  const input = block.querySelector('input');
  const label = block.querySelector('label');
  const btn_remove = block.querySelector('.file-view__remove');
  const btn_rechoose = block.querySelector('.file-view__another');

  label.addEventListener('click', (e) => {
    if (label.classList.contains('_active') && e.target != btn_rechoose || e.target == btn_remove)
      e.preventDefault();
  });

  input.onchange = function () {
    if (this.files.length == 0)
      label.classList.remove('_active');
    else {
      label.classList.add('_active');

      let src = URL.createObjectURL(this.files[0]);
      document.querySelector('.file-view__file img').src = src;
    }
  }

  btn_remove.addEventListener('click', (e) => {
    input.value = '';
    label.classList.remove('_active');
  });
})

//----------------- Загрузка файла -----------------//


