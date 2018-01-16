const submitForm = (e) => {
  e.preventDefault();
  const todoList = $d('.todos-list');
  const titleInput = $d('.title-input');
  const titleValue = titleInput.val();
  const todoLi = $d($d.create('li')).html(titleValue);
  titleInput.val('');
  todoList.append(todoLi);
};

document.addEventListener("DOMContentLoaded", () => {
  $d('.submit-btn').on('click', (e) => submitForm(e));
});
