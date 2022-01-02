

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b);
  }
}

function displayNum(num) {
  if (display.textContent.length >= 11) return;
  if (getNewNum) {
    display.textContent = num;
    getNewNum = false;
  } else {
    display.textContent += num;
  }
  if (display.textContent[0] === '0' && display.textContent[1] != '.') {
    display.textContent = display.textContent.slice(1);
  } else if(display.textContent[0] === '-' && display.textContent[1] === '0' && display.textContent[2] != '.') {
    display.textContent = '-' + display.textContent.slice(2);
  }
  if (display.textContent == '') {
    display.textContent = '0';
  }
}

function backspace() {
  if (display.textContent.length > 1) {
    display.textContent = display.textContent.slice(0, -1);
  } else {
    display.textContent = '0';
  }
  
}

function toggleNegative() {
  if(getNewNum == true) {
    display.textContent = "-";
    getNewNum = false;
  } else {
    if (display.textContent.length >= 11) return;
    if (display.textContent[0] === '-') {
      display.textContent = display.textContent.slice(1);
    } else {
      display.textContent = '-' + display.textContent;
    }
  }
  if(display.textContent == '') {
    display.textContent = '0';
  }
}

function clearDisplay() {
  display.textContent = '0';
  savedNum = null;
  currentOperator = null;
}

function addDecimal() {
  if (display.textContent.length >= 11) return;
  if(getNewNum) {
    display.textContent = '0.';
  }
  if (!display.textContent.match(/\./)) {
    display.textContent += '.';
  }
  getNewNum = false;
}

function operatorClicked(operator) {
  
  if(!savedNum) {
    savedNum = Number(display.textContent);
    display.textContent = '0';
  } else {
    opEquals();
  }
  currentOperator = operator;
}

function equals() {
  if (!savedNum || !currentOperator) return;
  display.textContent = operate(currentOperator, savedNum, Number(display.textContent));
  getNewNum = true;
  currentOperator = null;
  savedNum = null;
  //fix long decimals
  if(display.textContent.match(/\./)) {
    display.textContent = parseFloat(Number(display.textContent).toFixed(5))
  }
}

function opEquals() {
  if (!savedNum || !currentOperator) return;
  display.textContent = operate(currentOperator, savedNum, Number(display.textContent));
  savedNum = Number(display.textContent)
  getNewNum = true;
  //fix long decimals
  if(display.textContent.match(/\./)) {
    display.textContent = parseFloat(Number(display.textContent).toFixed(5))
  }
}


const display = document.getElementById('display');
display.textContent = '0';

let savedNum = null;
let getNewNum = true; //this var will track whether to add onto current number in display or start a new number
let currentOperator = null;

//keyboard functionality:
window.addEventListener('keydown', function (e) {
  this.document.getElementById('equals').focus();
  switch (e.key) {
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    case '0':
      displayNum(e.key);
      break;
    case 'c':
      clearDisplay();
      break;
    case 'Backspace':
      backspace();
      break;
    case '+':
    case '-':
    case '*':
    case '/':
      operatorClicked(e.key);
      break;
    case 'Enter':
    case '=':
      equals();
      break;
    case '.':
      addDecimal()
      break;
  }
});
