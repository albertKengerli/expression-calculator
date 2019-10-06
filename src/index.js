function eval() {
    // Do curt use eval!!!
    return;
}

function expressionCalculator(expr) {

  expr = expr.replace(/\s+/g, '');

  function unbracket(string) {
  	//console.log(string, "THIS WE WILL UNBRACKET");
    let openPos = string.lastIndexOf("(");
    let closePos = string.indexOf(")");

    if ((closePos != -1 && openPos === -1) || (closePos === -1 && openPos != -1)) {
      throw "ExpressionError: Brackets must be paired";
    }

    let currentBracket = add(string.substring(openPos+1, closePos));
		//console.log("RESULT OF UNBR: ",currentBracket);
    currentBracket = currentBracket.toString();
    currentBracket = currentBracket.replace("-","neg");

    let result = string.substring(0,openPos)+currentBracket+string.substring(closePos+1);
    //console.log("UNBRACKETED", result);

    return result;
  }

  function add(string) {
  	//console.log(string, "THIS WE WILL ADD");
    let currentArray = string.split("+");
    currentArray = currentArray.map(substract);
    return currentArray.reduce((a,b) =>  {
    	//console.log("add", a,b, "result:", a+b);
      return a + b});
  }

  function substract(string) {
  	//console.log(string, "THIS WE WILL SUBSTRACT");
    let currentArray = string.split("-");
    //console.log("LETS ROCK", currentArray);
    currentArray = currentArray.map(divide);
    return currentArray.reduce((a,b) => {
    	//console.log("substract", a,b, "result:", a-b);
      return a - b});
  }

  function divide(string) {
  	//console.log(string, "THIS WE WILL DIVIDE");
    let currentArray = string.split("/");
    ////console.log(currentArray);
    currentArray = currentArray.map(multiply);
    ////console.log(currentArray);
    return currentArray.reduce((a,b) => {
      //console.log("divide", a,b, "result:", a/b);
      if (b === 0) {
        throw "TypeError: Division by zero.";
      } else {
        return a / b;
      }
    });
  }

  function multiply(string) {
  	//console.log(string, "THIS WE WILL MULTIPLY");
    let currentArray = string.split("*");

    currentArray = currentArray.map((currentNumber) => {
    	currentNumber = currentNumber.replace("neg","-")
      return Number(currentNumber);
    });

    return currentArray.reduce((a,b) => {
    	//console.log("multiply", a,b, "result:", a*b);
      return a * b});
  }


  while (expr.indexOf("(") != -1 || expr.indexOf(")") != -1) {
  	expr=unbracket(expr);
  }

  return (add(expr));

}


module.exports = {
  expressionCalculator
}
