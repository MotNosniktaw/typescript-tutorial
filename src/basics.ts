export function doBasics() {
  function add(n1: number, n2: number, printResult: boolean, resultPhrase: string) {
    const output = n1 + n2;
    if (printResult) {
      console.log(resultPhrase + output);
    } else {
      return output;
    }
  }

  const number1 = 5;
  const number2 = 2.8;
  const printResult = true;
  const resultPhrase = "The answer be: ";

  /* Type Inferrence
  You can infer a type to guard a value in a variable

  Not good. Also redundant. Type is inferred by value.
  let number: number = 5

  Good. Prevents assignment of an incorrect type
  let number: number
  number = "string"   - This will be prevented.
  number = 5          - This will be allowed
*/

  const result = add(number1, number2, printResult, resultPhrase);
  // console.log({ result });
}

doBasics();
