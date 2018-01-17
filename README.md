# DOMination

DOMination uses vanilla JavaScript to easily manipulate the DOM.

## How to use

Include the following in the head of your HTML:
```
<script src="https://rawgit.com/AndrewJGregory/DOMination/master/lib/domination.js" charset="utf-8"></script>
```

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
allLis.on('click', () => alert("I've been clicked!"))
allLis.off('click');
```

Note that to remove event listeners, you can only provide the type of event without the original callback.

These methods are also chainable:
* Create a DOMination wrapped li, set the html of it, then append it:
```
const todoList = $d('.todo-list');
const todoLi = $d.create('li').html('buy milk');
todoList.append(todoLi);
```
