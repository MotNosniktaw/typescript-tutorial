function doFunctions() {
  // These 2 functions do nearly the same thing but ts can determine the output type but the nature of code flow
  // i.e. the first returns number and the second a string
  function addWithAssumedOutput(n1: number, n2: number) {
    return n1 + n2;
  }
  function concatenateWithAssumedOutput(n1: number, n2: number) {
    return n1.toString() + n2.toString();
  }
  console.log(addWithAssumedOutput(1, 2), concatenateWithAssumedOutput(1, 2));

  // the following sets the output type as number
  // this can be seen as good to control logic and inform caller of type
  // but ts does a decent job of type inferrence, so perfectly fine to leave it to ts to infer
  function addWithDefinedOutput(n1: number, n2: number): number {
    return n1 + n2;
    // return n1.toString() + n2.toString() // ts knows this will return string which doesnt fit defined return type
  }

  // this doesnt return anything
  // void is not a clearly defined thing in js
  //   function printResult(num: number): undefined { // regardless of how pointless this might be, ts gets angry
  //   function printResult(num: number): void { // use void instead
  function printResult(num: number): void {
    console.log("Result: " + num);

    // can call return of nothing, null and undefined (maybe to break a flow)
    // return;
    // return null;
    // return undefined;
  }

  const result = printResult(addWithDefinedOutput(1, 2)); // ts doesnt get angry about assigning result
  console.log(printResult(addWithDefinedOutput(1, 2))); // no value returned, so nothing fed to log() => output of "undefined"

  // we can instantiate a value, assign it to an existing function and then assign it further to something
  let combineValues;
  combineValues = addWithAssumedOutput;

  // we can call the addWithAssumedOutput function with the combineValues variable
  console.log(combineValues(1, 2));

  // reassignment can cause issues with caling of function i.e. throw typeErrors
  combineValues = 5;
  //   console.log(combineValues(1, 2));

  // we can specifiy function as type a variable should be
  let combineValuesISFUNCTION: Function;
  combineValuesISFUNCTION = addWithAssumedOutput;

  // the following is prevented by ts
  //   combineValuesISFUNCTION = 5;

  //   we can reassign to a different function
  combineValuesISFUNCTION = printResult;

  // FUNCTION TYPES
  // This specifies that this variable should contain a function that takes no variables and returns a number
  let functionVariableWithNoParameters: () => number;
  let functionVariableWith2NumberParametersThatReturnsNumber: (a: number, b: number) => number;
  let functionVariableWith2NumberParametersThatReturnsString: (a: number, b: number) => string;

  // ts does not allow assignemnt of function that takes parameters to this variable
  //   functionVariableWithNoParameters = addWithAssumedOutput;

  // The following blocks show how typing prevents assignment of functions to variables
  //    that although take the right variables, do not return the right types
  //   functionVariableWith2NumberParametersThatReturnsNumber = concatenateWithAssumedOutput;
  functionVariableWith2NumberParametersThatReturnsNumber = addWithAssumedOutput;

  //   functionVariableWith2NumberParametersThatReturnsString = addWithAssumedOutput;
  functionVariableWith2NumberParametersThatReturnsString = concatenateWithAssumedOutput;

  // Here we specify a function as a parameter type.
  //    we specify the inout and output types of the function
  // ts will prevent compilation for invalid parameters passed to parameter function
  function addAndHandle(n1: number, n2: number, cb: (num: number) => void): void {
    const result = n1 + n2;
    cb(result);
  }

  //
  addAndHandle(1, 2, num => console.log("I'm in a callback. " + num));

  // THis gets angry when we pass parameters our function didnt specify
  // addAndHandle(1, 2, (num, farts) => console.log("I'm in a callback. " + num));

  // But it doesn't care about the passed callbacks return value when the return value is void
  // this would care if i had defined a return type for callback to be passed to addAndHandle
  addAndHandle(1, 2, num => {
    console.log("I'm in a callback. " + num);
    return "bing";
  });
}

doFunctions();
