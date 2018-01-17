const submitForm = e => {
  e.preventDefault();
  const todoList = $d('.todos-list');
  const titleInput = $d('.title-input');
  const titleValue = titleInput.val();
  const todoLi = createTodo(titleValue);
  titleInput.val('');
  todoList.append(todoLi);
};

const createTodo = value => {
  const todoLi = $d.create('li').html(value);
  todoLi.addClass('unfinished');
  return todoLi;
};

document.addEventListener("DOMContentLoaded", () => {
  $d('.submit-btn').on('click', (e) => submitForm(e));
});
