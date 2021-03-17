const formInput = document.querySelector(".tag-creator-form__input");
const formButtonAdd = document.querySelector(".tag-creator-form__button");
const tagList = document.querySelector(".tag-list-output");
let tagsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

localStorage.setItem("items", JSON.stringify(tagsArray));
const data = JSON.parse(localStorage.getItem("items"));

// TODO removeItem from localStorage on deleteBtn

listenDeleteTodo = (elem) => {
  elem.addEventListener("click", (event) => {
    elem.parentElement.remove();
    event.stopPropagation();
    tagsArray = [];
  });
};

const tagAdd = (tag) => {
  if (tag.length < 1) {
    return;
  }

  const li = document.createElement("li");
  li.textContent = tag;
  li.setAttribute("class", "output-item");
  tagList.append(li);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("button-remove");
  deleteBtn.textContent = "del";
  li.appendChild(deleteBtn);
  listenDeleteTodo(deleteBtn);
};

formButtonAdd.addEventListener("click", () => {
  if (formInput.value) {
    tagsArray.push(formInput.value);
    localStorage.setItem("items", JSON.stringify(tagsArray));
  }
  tagAdd(formInput.value);
  formInput.value = "";
});

// Добавление tag по enter
formInput.addEventListener("keypress", function (e) {
  if (13 == e.keyCode && formInput.value) {
    tagsArray.push(formInput.value);
    localStorage.setItem("items", JSON.stringify(tagsArray));
    tagAdd(formInput.value);
    formInput.value = "";
  }
});

// Показываем, что есть в localStorage, если что-то есть, то рендерим
data.forEach((item) => {
  tagAdd(item);
});

// Удаление списка и очистка Local storage
// deleteBtn.addEventListener("click", function () {
//   localStorage.clear();
//   while (tagList.firstChild) {
//     tagList.removeChild(tagList.firstChild);
//   }
//   tagsArray = [];
// });
