import DOMNodeCollection from './dom_node_collection';

const $l = el => {
  if (el instanceof HTMLElement) {
    return new DOMNodeCollection([el]);
  } else {
    const arrayOfEls = Array.from(document.querySelectorAll(el));
    return new DOMNodeCollection(arrayOfEls);
  }
};

window.$l = $l;
