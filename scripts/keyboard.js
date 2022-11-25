const keyboard = document.querySelector('.keyboard');
const btnEdit = document.querySelector('header button');
const container = document.querySelector('main .container');
const keyboardSize = document.querySelector('.container .keyboard-size');

var cur_id;

// btnEdit.onclick = () => {
//   keyboard.classList.toggle('hide');
//   console.log('uepa');
// }

window.addEventListener('click', (event) => {
  if (event.target.tagName === 'INPUT' ||
    event.target.tagName === 'TEXTAREA') {
    keyboard.classList.remove('hide');

    let pos = event.target.getBoundingClientRect().bottom;
    if (pos > 560) {
      keyboardSize.style.marginBottom = '240px';
      let res = pos - 560;
      container.scrollBy(0, res);
    }
  }
  else if (keyboard.contains(event.target)) {
    if (event.target.tagName === 'LI') {
      document.getElementById(cur_id).focus();

      handleKeyClick(event.target);
    }
    else if (event.target.parentNode.tagName === 'LI') {
      document.getElementById(cur_id).focus();

      handleKeyClick(event.target.parentNode);
    }
  }
  else {
    keyboardSize.style.marginBottom = '0';
    keyboard.classList.add('hide');
    console.log(event.target.querySelector('.keyboard'));
  }
})

function handleKeyClick(li) {
  let classes = li.classList;
  if (classes.contains('shift')) {
    if (keyboard.classList.contains('next-key-uppercase')) {
      keyboard.classList.remove('next-key-uppercase');
      keyboard.classList.add('full-uppercase');
    }
    else if (keyboard.classList.contains('full-uppercase')) {
      keyboard.classList.remove('full-uppercase');
    }
    else {
      keyboard.classList.add('next-key-uppercase');
    }
  }
  else if (classes.contains('back')) {
    document.getElementById(cur_id).value =
      document.getElementById(cur_id).value.slice(0, -1);
  }
  else if (classes.contains('alt')) {
    keyboard.querySelector('.letters').classList.toggle('hide');
    keyboard.querySelector('.numbers').classList.toggle('hide');
  }
  else {
    switch (li.innerText) {
      case 'space':
        document.getElementById(cur_id).value += ' ';
        break;

      case 'return':
        document.getElementById(cur_id).value += '\n';
        break;

      default:
        document.getElementById(cur_id).value += li.innerText;

        if (keyboard.classList.contains('next-key-uppercase'))
          keyboard.classList.remove('next-key-uppercase');
        break;
    }
  }
}

function setId(id) {
  cur_id = id;
  console.log(cur_id);
}