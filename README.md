# DOMination

DOMination uses vanilla JavaScript to easily manipulate the DOM.

## Features

* Grab all divs and add a class:
```
const allDivs = $d('div');
allDivs.addClass('active');
```

* Select elements by class name or id:
```
const activeEls = $d('.active');
const board = $d('#chess-board');
```
* Add or remove event listeners to li's:
```
const allLis = $d('li');
allLis.on('click', () =>
alert("I've been clicked!"))
allLis.off('click');
```

Note that to remove event listeners, you can only provide the type of event without the original callback.

```
const oneLi = $d.create('li');
```

These methods are also chainable:
* Create a DOMination wrapped li, then set the html of it:
```
const todoLi = $d.create('li').html('buy milk');
```
