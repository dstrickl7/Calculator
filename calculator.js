const calcWindow= document.getElementById("calcWindow");
const number = document.querySelectorAll(".number");
const operator = document.querySelectorAll(".operator");
const equal = document.getElementById("equal");
const decimal = document.getElementById("decimal");
const memory= document.querySelectorAll(".memoryButtons");
const clear = document.getElementById("clear");
const deleteButton= document.getElementById("delete");
const history = document.getElementById("history");
const historyClear = document.getElementById("historyClear");
let currentOp="";
let val1="";
let val2="";
let result= null;
let tempResult;
let isDecimal= false;
let wasEvaluated= false;


/*Math Functions*/
const add= (num1, num2)=>{return num1+num2};
const subtract= (num1, num2)=>{return num1-num2};
const multiply= (num1, num2)=>{return num1*num2};
const divide= (num1, num2)=> {
	if(num2===0){
	  return "Can't divide by zero"
	}else{
	  return num1/num2;
	}};


/*Need to do: if evaluate, update history to include last value and reset all values*/

function evaluate(){
  if(currentOp !== null){
    calcWindow.innerText=operate();
    val2+=val1+" ";
  history.innerText=val2;
  val1="";
  wasEvaluated=true;   
  }
}


function operate(){
  switch(operation){
    case "add":
      tempResult= add(result, val1);
      return tempResult;
    case "subtract":
      tempResult= subtract(result, val1);
      return tempResult;
    case "times":
      tempResult= multiply(result, val1);
     return tempResult;
    case "divide":
      tempResult= divide(result, val1);
      return tempResult;
      
  }
}

clear.addEventListener("click", clearAll);
deleteButton.addEventListener("click", ()=>{
	calcWindow.innerText=calcWindow.innerText.slice(0,-1);
});
equal.addEventListener("click", evaluate);



/*display numbers on screen*/
number.forEach(button => button.addEventListener("click", (x)=>{
  if(x.target.innerText==="." && !isDecimal){
    isDecimal=true;
  }else if (x.target.innerText==="." && isDecimal){
    return
  }
  if(wasEvaluated){
    calcWindow.innerText="";
    result=null;
    currentOp="";
    val1="";
    val2="";
    isDecimal=false;
    wasEvaluated=false;
    val1+=button.innerText;
    calcWindow.innerText= val1;
  }else{
    val1+=button.innerText;
    calcWindow.innerText= val1;
  }
  
}));


operator.forEach(button => button.addEventListener("click", (x)=>{
  
  if(!val1){
    history.innerText=result;
    return;
    
  }
  isDecimal=false;
  const opName = x.target.name;
  currentOp= x.target.innerText;
  if(result && val1 && opName){
    tempResult=operate();
    calcWindow.innerText=operate();
  }else{
    result=parseFloat(val1);
    
  }
  
  clearVar(currentOp);
  operation=opName;
   
  }));


function clearVar(innerText=""){
	if(!tempResult){
		val2+=val1+" " + innerText + " ";
		history.innerText=val2;
		calcWindow.innerText="";
		val1="";
		}else{
		  
		}
  }
  
function clearAll(){
	calcWindow.innerText="";
  currentOp="";
  val1="";
  val2="";
  isDecimal=false;
}