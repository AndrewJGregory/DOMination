const $l = el => {
  return Array.from(document.querySelectorAll(el));
};

window.$l = $l;
