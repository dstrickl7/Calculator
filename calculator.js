const calcWindow = document.getElementById("calcWindow");
const number = document.querySelectorAll(".number");
const operator = document.querySelectorAll(".operator");
const equal = document.getElementById("equal");
const decimal = document.getElementById("decimal");
const memory = document.querySelectorAll(".memoryButtons");
const clear = document.getElementById("clear");
const deleteButton = document.getElementById("delete");
const history = document.getElementById("history");
const plusOp = document.getElementById("plus");
const minusOp = document.getElementById("minus");
const timesOp = document.getElementById("times");
const divideOp = document.getElementById("divide");
let currentOp = "";
let opName = "";
let val1 = "";
let val2 = "";
let result = null;
let tempResult;
let isDecimal = false;
let wasEvaluated = false;

/*Math Functions*/
const add = (num1, num2) => {
  return Number(num1) + Number(num2);
};
const subtract = (num1, num2) => {
  return num1 - num2;
};
const multiply = (num1, num2) => {
  return num1 * num2;
};
const divide = (num1, num2) => {
  if (num2 == 0) {
    return "Don't be cheeky";
  } else {
    return num1 / num2;
  }
};

/*Current issues to fix*/
/*If two different operators are selected, only the first operator is registered. Need to return the last operator*/
/*If evaluated, hitting an operation does not continue the operation.*/
/*If large number is returned, value breaks out of it's container*/

function getNums(x) {
  if (wasEvaluated == true) {
    resetCalc();
  }
  if (x.target.innerText === "." && !isDecimal) {
    isDecimal = true;
  } else if (x.target.innerText === "." && isDecimal) {
    return;
  }
  val1 += x.target.innerText;
  calcWindow.innerText = val1;
}

function addNeg() {
  if (calcWindow.innerText === "") {
    return;
  } else {
    calcWindow.innerText = -calcWindow.innerText;
    val1 = calcWindow.innerText;
    wasNegated = true;
  }
}

function getOp(x) {
  if (!val1) {
    history.innerText = result;
    return;
  }
  isDecimal = false;

  currentOp = x.target.innerText;
  opName = x.target.name;

  if (result && val1 && opName) {
    tempResult = operate();
    calcWindow.innerText = operate();
    val2 += val1 + " " + currentOp;
    history.innerText = val2;
    val1 = "";
    result = Number(tempResult);
  } else {
    result = Number(val1);
  }
  clearVar(currentOp);
  operation = opName;
}

function evaluate() {
  if (val2 == "") {
    calcWindow.innerText = Number(val1);
    history.innerText = Number(val1);
    wasEvaluated = true;
  } else if (currentOp !== null) {
    calcWindow.innerText = operate();
    val2 += val1 + " ";
    history.innerText = val2;
    val1 = "";
    wasEvaluated = true;
  }
}

function operate() {
  switch (operation) {
    case "plus":
      tempResult = add(result, val1);
      return tempResult;
    case "minus":
      tempResult = subtract(result, val1);
      return tempResult;
    case "times":
      tempResult = multiply(result, val1);
      return tempResult;
    case "divide":
      return (tempResult = divide(result, val1));
  }
}

function clearVar(innerText = "") {
  if (!tempResult) {
    val2 += val1 + " " + innerText + " ";
    history.innerText = val2;
    val1 = "";
  }
}

function resetCalc() {
  calcWindow.innerText = "";
  result = null;
  tempResult = null;
  currentOp = "";
  val1 = "";
  val2 = "";
  history.innerText = "";
  isDecimal = false;
  wasEvaluated = false;
  wasNegated = false;
}

clear.addEventListener("click", resetCalc);

deleteButton.addEventListener("click", () => {
  calcWindow.innerText = calcWindow.innerText.slice(0, -1);
  val1 = calcWindow.innerText;
  if (calcWindow.innerText.includes(".")) {
    return;
  } else {
    isDecimal = false;
  }
});

equal.addEventListener("click", evaluate);

negate.addEventListener("click", addNeg);

number.forEach((button) => button.addEventListener("click", getNums));

operator.forEach((button) => button.addEventListener("click", getOp));

/*Keyboard Functionality */

document.addEventListener("keydown", (x) => {
  if (x.key >= 0 && x.key <= 9) {
    if (wasEvaluated === true) {
      resetCalc();
    }
    val1 += x.key;
    calcWindow.textContent = val1;
  }
  if (x.key === "+") {
    plusOp.click();
  }
  if (x.key === "-") {
    minusOp.click();
  }
  if (x.key === "*") {
    timesOp.click();
  }
  if (x.key === "/") {
    divideOp.click();
  }
  if (x.key === ".") {
    decimal.click();
  }
  if (x.key === "Enter") {
    x.preventDefault();
    evaluate();
  }
  if (x.key === "Backspace") {
    deleteButton.click();
  }
});
