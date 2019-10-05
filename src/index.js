function eval() {
    // Do curt use eval!!!
    return;
}

function expressionCalculator(expr) {

  expr = expr.replace(/\s+/g, '');

  function add(string) {
    let currentArray = string.split("+");
    currentArray = currentArray.map(substract);
    return currentArray.reduce((a,b) => a+b);
  }

  function substract(string) {
    let currentArray = string.split("-");
    currentArray = currentArray.map(multiply);
    return currentArray.reduce((a,b) => a-b);
  }

  function divide(string) {
    let currentArray = string.split("/");
    currentArray = currentArray.map(Number);
    return currentArray.reduce((a,b) => {
      if (b === 0) {
        throw "TypeError: Division by zero."
      } else {
        return a / b;
      }
    });
  }

  function multiply(string) {
    let currentArray = string.split("*");
    currentArray = currentArray.map(divide);
    return currentArray.reduce((a,b) => a*b);
  }


  //  return (add(expr));
  // this will only take strings containing * operator [ cur + ]
// const parseMultiplicationSeparatedExpression = (expression) => {
// 	const numbersString = expression.split('*');
// 	const numbers = numbersString.map(element => {
//     return +element;
//   });

// 	const result = numbers.reduce((acc, cur) => acc * cur);
// 	return result;
// };

// // * +
// function add (expression){
// 	const numbersString = expression.split('+');
// 	const numbers = numbersString.map(parseMultiplicationSeparatedExpression);
// 	const result = numbers.reduce((first,next) => first + next);
// 	return result;
// };

  return add(expr);

}


module.exports = {
  expressionCalculator
}
