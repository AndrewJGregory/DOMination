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

  _iteratesOverAllEls(callback) {
    this.HTMLels.forEach(el => callback(el));
  }
}

export default DOMNodeCollection;
