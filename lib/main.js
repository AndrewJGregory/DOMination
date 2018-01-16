import DOMNodeCollection from './dom_node_collection';

const $d = el => {
  if (el instanceof HTMLElement) {
    return new DOMNodeCollection([el]);
  } else if (typeof el === 'string') {
    const arrayOfEls = Array.from(document.querySelectorAll(el));
    if (arrayOfEls.length === 0) {
      const HTMLEl = document.createElement(el);
      return new DOMNodeCollection([HTMLEl]);
    } else {
      return new DOMNodeCollection(arrayOfEls);
    }
  }
};

let defaults = {
  method: 'GET',
  url: "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b",
  success(data) {
    console.log(data);
  },
  error() {
    console.error("Error");
  },
  data: {},
  contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
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

$d.ajax = options => {
  options = $d.extend(defaults, options);
  const xhr = new XMLHttpRequest();
  xhr.open(`${options.method}`, `${options.url}`);
  xhr.onload = () => {
    if (xhr.status === 200) {
      return options.success(JSON.parse(xhr.response));
    } else {
      return options.error(JSON.parse(xhr.response));
    }
  };
  xhr.send();
};

$d.create = str => {
  return document.createElement(str);
};

window.$d = $d;
