'use strict';

const input = document.querySelector('input');
const todoActive = document.querySelector('.todo__active');
const todoHidden = document.querySelectorAll('.todo__hidden');
const itemsLeft = document.querySelector('.items--left');
const clearBtn = document.querySelector('.clear');
const selectPhone = document.querySelector('.select__mobile');
const optionSelectPhone = document.querySelectorAll('.select__mobile div');
const select = document.querySelector('.select');
const optionSelect = document.querySelectorAll('.select div');
const tasks = [];
let temporal = [];

function thereIsTextToDo(position) {
  // if (tasks.length > 0) {
  //   todoHidden[0].classList.add('todo__hidden-off');
  // } else {
  //   todoHidden[0].classList.remove('todo__hidden-off');
  // }
  if (position === 0) {
    if (tasks.length > 0) {
      console.log(tasks.length, 'thereIsTextToDo');
      todoHidden[0].classList.add('todo__hidden-off');
    } else {
      todoHidden[0].classList.remove('todo__hidden-off');
    }
  } else {
    if (tasks.length > 0 && temporal.length === 0) {
      todoHidden[position].classList.remove('todo__hidden-off');
    } else {
      todoHidden[position].classList.add('todo__hidden-off');
    }
  }
}

function updateLeftItems() {
  console.log(tasks.length);
  thereIsTextToDo(0);

  itemsLeft.textContent = tasks.length.toString();
}
updateLeftItems();

function createElementTodo(textTodo) {
  const activity = document.createElement('div');
  const check = document.createElement('div');
  const checkBox = document.createElement('div');
  const text = document.createElement('div');
  const exs = document.createElement('div');
  const bar1 = document.createElement('div');
  const bar2 = document.createElement('div');

  /// ///////////

  activity.className = 'activity';
  check.className = 'check';
  checkBox.className = 'checkbox';
  text.className = 'text';
  exs.className = 'exs';
  bar1.className = 'bar1';
  bar2.className = 'bar3';

  /// ////////////

  text.innerText = textTodo.trim();

  check.addEventListener('click', () => {
    text.classList.toggle('text--done');
    checkBox.classList.toggle('checkbox--hidden');
    tasks.forEach((item) => {
      if (item.text === text.innerText) {
        item.check = !item.check;
      }
    });

    console.log(tasks);
  });

  exs.addEventListener('click', () => {
    activity.remove();
    for (let i = 0; i < tasks.length; i += 1) {
      if (tasks[i].text === text.innerText) {
        tasks.splice(i, 1);
      }
    }
    console.log(tasks);
    // all();
    updateLeftItems();
  });

  exs.append(bar1, bar2);
  check.append(checkBox);
  activity.append(check, text, exs);
  return activity;
}

function hidingText() {
  todoHidden.forEach((value) => value.classList.add('todo__hidden-off'));
}

function clearCompleted() {
  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].check === true) {
      tasks[i].objectTask.remove();
      tasks.splice(i, 1);
      i -= 1;
    }
  }
  updateLeftItems();

  // all();
}

function renderUI(parameter) {
  parameter.forEach((value) => todoActive.append(value.objectTask));
  console.log('dd');
  // hidingText();
  updateLeftItems();
}

// function removeUI() {
//   // needed for render options tasks
//   tasks.forEach((value) => value.objectTask.remove());
// }

function completed() {
  // Array temporal needed for render completed tasks
  temporal = tasks.filter((value) => value.check === true);
  hidingText();
  thereIsTextToDo(2);
  // removeUI();
  renderUI(temporal);
}

function active() {
  // Array temporal needed for render active tasks
  temporal = tasks.filter((value) => value.check === false);
  // tasks.forEach();
  hidingText();
  thereIsTextToDo(1);
  // removeUI();
  renderUI(temporal);
}

function all() {
  hidingText();
  thereIsTextToDo(0);
  // removeUI();
  renderUI(tasks);
}

function activeBtn(event) {
  if (event.target.className !== 'select') {
    console.log(event.currentTarget);
    optionSelect.forEach((value) => value.classList.remove('active--btn'));
    event.target.classList.add('active--btn');
  }
}

function createItem(event) {
  for (let i = 0; i < tasks.length; i += 1) {
    if (event.target.value === tasks[i].text) {
      return;
    }
  }
  if (event.key === 'Enter' && event.target.value !== '') {
    // console.log(event);

    let checked = false;
    const activity = createElementTodo(event.target.value);
    const task = {
      // id: Math.random(),
      check: checked,
      text: event.target.value.trim(),
      objectTask: activity,
    };
    tasks.push(task);
    console.log(tasks);
    updateLeftItems();
    input.value = '';
    todoActive.append(activity);

    // all();
  }
}

select.addEventListener('click', activeBtn);
optionSelect[0].addEventListener('click', all);
optionSelect[1].addEventListener('click', active);
optionSelect[2].addEventListener('click', completed);
selectPhone.addEventListener('click', activeBtn);
optionSelectPhone[0].addEventListener('click', all);
optionSelectPhone[1].addEventListener('click', active);
optionSelectPhone[2].addEventListener('click', completed);
input.addEventListener('keypress', createItem);
clearBtn.addEventListener('click', clearCompleted);

// if (tasks.length > 0) {
//   todoHidden[0].classList.add('todo__hidden-off');
// } else {
//   todoHidden[0].classList.remove('todo__hidden-off');
// }
