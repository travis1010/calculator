

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
  display.textContent += num.value;
  if (display.textContent[0] === '0' && display.textContent[1] != '.') {
    display.textContent = display.textContent.slice(1);
  } else if(display.textContent[0] === '-' && display.textContent[1] === '0' && display.textContent[2] != '.') {
    display.textContent = '-' + display.textContent.slice(2);
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
  if (display.textContent.length >= 11) return;
  if (display.textContent[0] === '-') {
    display.textContent = display.textContent.slice(1);
  } else {
    display.textContent = '-' + display.textContent;
  }
}

function clearDisplay() {
  display.textContent = '0';
}

function addDecimal() {
  if (display.textContent.length >= 11) return;
  if (!display.textContent.match(/\./)) {
    display.textContent += '.';
  }
}

const display = document.getElementById('display');
display.textContent = '0';
