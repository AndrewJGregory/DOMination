# DOMination

DOMination uses vanilla JavaScript to easily manipulate the DOM. Fundamentally, DOMination wraps HTML elements in a JavaScript object that scales many methods that elements have. [Tetrist](http://andrewjgregoryajg.com/Tetrist/) was built entirely with vanilla JavaScript and with the help of DOMination.

## How to use

Include the following in the head of your HTML:

```
<script src="https://cdn.rawgit.com/AndrewJGregory/DOMination/de610a56/lib/domination.js" charset="utf-8"></script>
```

## Features

### Simple DOM manipulation:

- Grab all divs and add a class:

```
const allDivs = $d('div');
allDivs.addClass('active');
```

- Select elements by class name or id:

```
const activeEls = $d('.active');
const board = $d('#chess-board');
```

- Add or remove event listeners to li's:

```
const allLis = $d('li');
allLis.on('click', () => alert("I've been clicked!"))
allLis.off('click');
```

Note that to remove event listeners, you can only provide the type of event without the original callback.

These methods are also chainable:

- Create a DOMination wrapped li, set the html of it, then append it:

```
const todoList = $d('.todo-list');
const todoLi = $d.create('li').html('buy milk');
todoList.append(todoLi);
```

### Constructor function:

`$d()` is extremely versatile. If provided an `HTMLElement`, it will create a `DOMNodeCollection` wrapped collection containing just that element. If simply invoked as `$d()`, then an empty `DOMNodeCollection` will be created. Most importantly, if an element is not found by any CSS type selector, then an `HTMLElement` will be created and wrapped in a `DOMNodeCollection`.

### Class manipulation

Grab all squares and add a class:

```
const greenSquares = $d('.square').addClass('green');
```

Check if **all** elements in a collection have one particular class:

```
greenSquares.hasAllClass('green'); // true
```

Check if at least **one** element in a collection has one particular class:

```
$d('.green').hasOneClass('active');
```

Add/remove a class to a collection:

```
$d('.square').addClass('purple');
$d('.square').removeClass('purple);
```

### Other useful methods

Creating an empty `DOMNodeCollection` with `$d()` is powerful when combined with `concat`. Sometimes, grabbing a particular collection cannot be done in one. `concat` adds elements of one `DOMNodeCollection` to another `DOMNodeCollection`. For example:

```
const generateCollection = (startXpos, yPos, shapeId, deltas) => {
  let collection = $d();
  let newSqPos, newSq, newYpos, delta, newXpos;
  for (let i = 0; i < deltas.length; i++) {
    delta = deltas[i];
    newXpos = startXpos + delta[0];
    newYpos = yPos + delta[1];
    newSqPos = String(newXpos) + String(newYpos);
    newSq = $d(`.pos${newSqPos}`);
    collection.concat(newSq);
  }
  return collection;
};
```

This continually grabs elements with particular coordinates and adds them to a collection. Grabbing all of these elements with one call of `$d()` is not possible.

#### How does it work?

All of the methods here abstract away the nitty-gritty of how everything works. Here are some examples of how a few methods actually work:

- `hasAllClass` uses `reduce` to check if **every** element of a `DOMNodeCollection` has one particular class: (HTMLels is the sole internal array in a `DOMNodeCollection` that holds all of the `HTMLElement`s.)

  ```
  hasAllClass(name) {
    return this.HTMLels.reduce((acc, HTMLel) => {
      return acc && Array.from(HTMLel.classList).includes(name);
  }, true);
  }
  ```

- Similarly, `hasOneClass` only changes the logical operator:

  ```
  hasOneClass(name) {
    return this.HTMLels.reduce((acc, HTMLel) => {
      return acc || Array.from(HTMLel.classList).includes(name);
      }, false);
    }
  ```

- Finally, `attr(attr, val)` can set the same attribute-value pair for all elements in a collection. Otherwise, it simply retrieves the value of the attribute for the first element in the collection:

  ```
  attr(attr, val) {
    const validTypes = ['string', 'boolean', 'number'];
    const valType = typeof val;
    if (validTypes.includes(valType)) {
      this._iteratesOverAllEls(el => {
        el.setAttribute(attr, val);
        });
        return this;
        } else {
          return this.HTMLels[0].getAttribute(attr);
        }
  ```

- An example from [Tetrist](http://andrewjgregoryajg.com/Tetrist/) when constructing the every square of the board:

  ```
  createSquare(x, y) {
    const square = $d.create('div').addClass('square');
    square.attr('x-pos', x);
    square.attr('y-pos', y);
    square.attr('isPiece', false);
    const position = 'pos' + String(x) + String(y);
    square.addClass(position);
    return square;
  }
  ```
