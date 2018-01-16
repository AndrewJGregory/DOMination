class DOMNodeCollection {
  constructor(HTMLels) {
    this.HTMLels = HTMLels;
  }

  html(text) {
    if (text === "" || text === undefined) {
      this._iteratesOverAllEls(el => {
        el.innerHTML = text;
      });
      return this;
    } else {
      return this.HTMLels[0].innerHTML;
    }
  }

  empty() {
    return this.html("");
  }

  append(arg) {
    this._iteratesOverAllEls(el => {
      if (arg instanceof HTMLElement) {
        el.innerHTML += arg.outerHTML;
      } else if (arg instanceof String) {
        el.innerHTML += el;
      } else if (arg instanceof DOMNodeCollection) {
        arg._iteratesOverAllEls(argEl => {
          el.innerHTML += argEl.outerHTML;
        });
      }
    });
    return this;
  }

  attr(attr, val) {
    if (val) {
      this._iteratesOverAllEls(el => {
        el.setAttribute(attr, val);
      });
      return this;
    } else {
      return this.HTMLels[0].getAttribute(attr);
    }
  }

  addClass(name) {
    this._iteratesOverAllEls(el => {
      el.classList.add(name);
    });
    return this;
  }

  removeClass(name) {
    this._iteratesOverAllEls(el => {
      el.classList.remove(name);
    });
    return this;
  }

  children() {
    const allHTMLels = [];
    let children;
    this._iteratesOverAllEls(el => {
      children = Array.from(el.children);
      children.forEach(child => {
        allHTMLels.push(child);
      });
    });
    return new DOMNodeCollection(allHTMLels);
  }

  _iteratesOverAllEls(callback) {
    this.HTMLels.forEach(el => callback(el));
  }

  parent() {
    const allHTMLels = [];
    let parent;
    this._iteratesOverAllEls(el => {
      parent = el.parentNode;
      if (!allHTMLels.includes(parent)) {
        allHTMLels.push(parent);
      }
    });
    return new DOMNodeCollection(allHTMLels);
  }

  find(selector) {
    let allHTMLels = [];
    let nodeList;
    this._iteratesOverAllEls(el => {
      nodeList = el.querySelectorAll(selector);
      nodeList.forEach(node => {
        if (!allHTMLels.includes(node)) {
          allHTMLels.push(node);
        }
      });
    });
    return new DOMNodeCollection(allHTMLels);
  }

  remove() {
    this._iteratesOverAllEls(el => {
      el.remove();
    });
    return this;
  }

  on(eventType, callback) {
    this._iteratesOverAllEls(el => {
      el.addEventListener(eventType, callback);
      el.callback = callback;
    });
    return this;
  }

  off(eventType) {
    this._iteratesOverAllEls(el => {
      el.removeEventListener(eventType, el.callback);
    });
    return this;
  }

  
}

export default DOMNodeCollection;
