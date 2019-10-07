function eval() {
    // Do curt use eval!!!
    return;
}

function expressionCalculator(expr) {

  expr = expr.replace(/\s+/g, '');

  function unbracket(string) {

    let openPos = string.lastIndexOf("(");
    let closePos = string.indexOf(")",openPos);

    if ((closePos != -1 && openPos === -1) || (closePos === -1 && openPos != -1)) {
      throw "ExpressionError: Brackets must be paired";
    }

    let currentBracket = add(string.substring(openPos+1, closePos));
    currentBracket = (currentBracket.toString()).replace("-","neg");

    let result = string.substring(0,openPos)+currentBracket+string.substring(closePos+1);
    return result;
  }

  function add(string) {

    let currentArray = string.split("+");
    currentArray = currentArray.map(substract);
    return currentArray.reduce((a,b) =>  {

      return a + b});
  }

  function substract(string) {

    let currentArray = string.split("-");
    currentArray = currentArray.map(multiply);

    return currentArray.reduce((a,b) => {

      return a - b});
  }

  function divide(string) {

    let currentArray = string.split("/");

    currentArray = currentArray.map((currentNumber) => {
      currentNumber = currentNumber.replace("neg","-")
      return Number(currentNumber);
    });

    return currentArray.reduce((a,b) => {
      if (b === 0) {
        throw "TypeError: Division by zero.";
      } else {
        return a / b;
      }
    });
  }

  function multiply(string) {

    let currentArray = string.split("*");
    currentArray = currentArray.map(divide);

    return currentArray.reduce((a,b) => {
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
