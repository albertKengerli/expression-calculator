function eval() {
    // Do curt use eval!!!
    return;
}

function expressionCalculator(expr) {

  expr = expr.replace(/\s+/g, '');



  function unbracket(string) {
  	//consle.log(string, "THIS WE WILL UNBRACKET");
    // if (expr.match(/\(/g).length != expr.match(/\)/g).length) {
    //   throw "ExpressionError: Brackets must be paired";
    // }

    let openPos = string.lastIndexOf("(");
    let closePos = string.indexOf(")",openPos);

    if ((closePos != -1 && openPos === -1) || (closePos === -1 && openPos != -1)) {
      throw "ExpressionError: Brackets must be paired";
    }

    let currentBracket = add(string.substring(openPos+1, closePos));
		//consle.log("RESULT OF UNBR: ",currentBracket);
    currentBracket = currentBracket.toString();
    currentBracket = currentBracket.replace("-","neg");

    let result = string.substring(0,openPos)+currentBracket+string.substring(closePos+1);
    //consle.log("UNBRACKETED", result);

    return result;
  }

  function add(string) {
  	//consle.log(string, "THIS WE WILL ADD");
    let currentArray = string.split("+");
    currentArray = currentArray.map(substract);
    return currentArray.reduce((a,b) =>  {
    	//consle.log("add", a,b, "result:", a+b);
      return a + b});
  }

  function substract(string) {
  	//consle.log(string, "THIS WE WILL SUBSTRACT");
    let currentArray = string.split("-");
    //consle.log("LETS ROCK", currentArray);
    currentArray = currentArray.map(multiply);
    return currentArray.reduce((a,b) => {
    	//consle.log("substract", a,b, "result:", a-b);
      return a - b});
  }

  function divide(string) {
  	//consle.log(string, "THIS WE WILL DIVIDE");
    let currentArray = string.split("/");
    //consle.log(currentArray);
    //consle.log(currentArray);

    currentArray = currentArray.map((currentNumber) => {
      currentNumber = currentNumber.replace("neg","-")
      return Number(currentNumber);
    });

    return currentArray.reduce((a,b) => {
      //consle.log("divide", a,b, "result:", a/b);
      if (b === 0) {
        throw "TypeError: Division by zero.";
      } else {
        return a / b;
      }
    });
  }

  function multiply(string) {
    //consle.log(string, "THIS WE WILL MULTIPLY");
    let currentArray = string.split("*");

    currentArray = currentArray.map(divide);

    return currentArray.reduce((a,b) => {
    	//consle.log("multiply", a,b, "result:", a*b);
      return a * b});
  }


  while ((expr.indexOf("(") != -1) || (expr.indexOf(")") != -1)) {
  	expr=unbracket(expr);
  }

  return (add(expr));

}


module.exports = {
  expressionCalculator
}
