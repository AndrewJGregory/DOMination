const submitForm = (e) => {
  e.preventDefault();
  const todoList = $d('.todos-list');
  const title = $d('.title-input').val();
  const todoLi = $d($d.create('li')).html(title);
  todoList.append(todoLi);
};

document.addEventListener("DOMContentLoaded", () => {
  $d('.submit-btn').on('click', (e) => submitForm(e));
});
