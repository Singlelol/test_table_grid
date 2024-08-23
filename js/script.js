(function () {
  const footer_btns = document.querySelector(".footer_btns");
  const footer_text = document.querySelector(".footer_text");
  const tab_btn_5 = document.getElementById("tab-btn-5");
  const tab_btn_6 = document.getElementById("tab-btn-6");

  //Функция переключения стилей у блоков в футере

  function toggle_class(e) {
    const btns_class = "footer_btns";
    const text_class = "footer_text";
    const hidden_class = " hidden";
    if (e.target.id === "tab-btn-5") {
      footer_btns.classList.value = btns_class + hidden_class;
      footer_text.classList.value = text_class;
    } else {
      footer_btns.classList.value = btns_class;
      footer_text.classList.value = text_class + hidden_class;
    }
  }

  tab_btn_5.onclick = toggle_class;
  tab_btn_6.onclick = toggle_class;
})();

function create_custom_select(e) {
  //Создание блока кастомного селекта

  const form_select = document.getElementsByClassName("form_select")[e];
  const form_select_element = form_select.getElementsByTagName("select")[0];

  const form_options = document.getElementsByTagName("li");

  const len = form_options.length;
  const parent = document.createElement("div");
  parent.setAttribute("class", "select-selected");
  parent.innerHTML = form_select_element.options[0].innerHTML;
  form_select.appendChild(parent);
  const children = document.createElement("div");
  children.setAttribute("class", "select-items select-hide");
  parent.appendChild(children);

  for (let i = 0; i < len; i++) {
    const childrens = document.createElement("div");
    const options = document.createElement("option");
    childrens.innerHTML = form_options[i].childNodes[7].innerHTML;
    options.innerHTML = form_options[i].childNodes[7].innerHTML;
    options.setAttribute("value", `${1 + i}`);
    childrens.onclick = update_select;
    children.appendChild(childrens);
    form_select_element.appendChild(options);
  }

  //Открытие закрытие блока выбора содержимого, добавление класса для работы стрелки

  function toggle_class(e) {
    e.stopPropagation();
    const children = this.childNodes;
    const len = children.length;
    if (children[1].classList[1] === "select-hide") {
      children[1].classList.remove("select-hide");
    } else {
      children[1].classList.add("select-hide");
    }
    this.classList.toggle("select-arrow-active");
  }

  //Добавление класса выбранного элемента и обновление контента в блоке селекта

  function update_select() {
    const form_select_length = form_select_element.length;
    const parent_select = this.parentNode.previousSibling;
    console.log(this.parentNode);
    for (let i = 0; i < form_select_length; i++) {
      if (form_select_element.options[i].innerHTML == this.innerHTML) {
        form_select_element.selectedIndex = i;
        parent_select.textContent = `${this.innerHTML}`;
        const select_elements =
          this.parentNode.getElementsByClassName("same-as-selected");
        const select_elements_lenght = select_elements.length;
        for (let k = 0; k < select_elements_lenght; k++) {
          select_elements[k].removeAttribute("class");
        }
        this.setAttribute("class", "same-as-selected");
        break;
      }
    }
  }

  parent.onclick = toggle_class;
}

create_custom_select(0);
create_custom_select(1);

(function () {
  const create_button = document.getElementById("create_lock");
  const edit_button = document.getElementById("edit_button");
  const modal = document.getElementById("modal_wrapper");
  const modal_create = document.getElementById("modal_create");
  const modal_change = document.getElementById("modal_change");

  const save_button = document.querySelector(".save_button");
  const delete_button = document.querySelector(".delete_button");

  //Функция переключения видимости модального окна

  function toggle_modal(e) {
    e.stopPropagation();
    const arr_classname = [
      "modal",
      "save_button",
      "delete_button",
      "cansel_button",
    ];

    //Функция проверяет содержимое class name узла активировавщего событие
    function check_classname() {
      for (let key of arr_classname) {
        if (e.target.classList.contains(key)) return true;
      }
    }

    if (!check_classname()) {
      modal.classList.remove("hidden");
      if (e.target.id === "create_lock") {
        modal_create.classList.remove("hidden");
      }

      if (e.target.id === "edit_button") {
        is_edit(e.target.parentNode.childNodes[7].innerHTML);
        modal_change.classList.remove("hidden");
      }
    } else {
      modal.classList.add("hidden");
      modal_create.classList.add("hidden");
      modal_change.classList.add("hidden");
    }
  }

  create_button.onclick = toggle_modal;
  save_button.onclick = toggle_modal;
  delete_button.onclick = toggle_modal;
  edit_button.onclick = toggle_modal;
  modal.onclick = toggle_modal;
})();

const is_edit = (el) => {
  const form_select = document.getElementsByClassName("form_select")[1];
  const form_select_element =
    form_select.getElementsByClassName("select-selected");
  form_select_element[0].firstElementChild.previousSibling.textContent = el;
  const childrens = form_select_element[0].firstElementChild.children;

  for (let child of childrens) {
    child.classList.remove("same-as-selected");
    if (child.textContent === el) child.classList.add("same-as-selected");
  }
};
