import DOMNodeCollection from './dom_node_collection';

const $d = el => {
  if (el instanceof HTMLElement) {
    return new DOMNodeCollection([el]);
  } else if (typeof el === 'string') {
    const arrayOfEls = Array.from(document.querySelectorAll(el));
    return new DOMNodeCollection(arrayOfEls);
  }
};

$d.extend = (...objs) => {
  let result = {};
  objs.forEach(obj => {
    for(let key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
};

$d.ajax = () => {

};

window.$d = $d;
