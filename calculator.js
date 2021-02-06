const add= (num1, num2)=>{return num1+num2};
const subtract= (num1, num2)=>{return num1-num2};
const multiply= (num1, num2)=>{return num1*num2};
const divide= (num1, num2)=> {if(num2===0){
  return "Can't divide by zero"
}else{
  return num1/num2;
}};

let display =document.getElementById("display");
let buttons =document.getQuerySelector("button").onclick()