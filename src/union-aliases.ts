type Combinal = number | string;
type CombinationResultType = "number" | "string";

export function doUnionTypes() {
  function combineWithRuntimeChecking(input1: number | string, input2: number | string) {
    // The | character allows us to specify a selection of types we can handle
    // This allows us to be more flexible with our input
    // But there might be runtime checks required.....

    let output;
    if (typeof input1 === "number" && typeof input2 === "number") {
      // In this scenario where both are known to be numbers, ts allows us to perform number-number operations
      output = input1 + input2;
    } else {
      output = input1.toString() + input2.toString();
    }
    return output;
  }

  const combinedAges = combineWithRuntimeChecking(31, 29);
  console.log(combinedAges);

  const combinedNames = combineWithRuntimeChecking("Bing", "Bong");
  console.log(combinedNames);
}

export function doLiteralTypes() {
  function combineWithOutputConversion(
    input1: number | string,
    input2: number | string,
    // resultType: string // perfectly valid type-wise but prone error with implementation depending on caller knowing expected values
    resultType: "number" | "string" // more appropriate to use literal typing that says input must one of these values
  ) {
    let output;
    if ((typeof input1 === "number" && typeof input2 === "number") || resultType === "number") {
      // literal value checking within scope as well as presented to function caller
      // we have add an extra condition where we do the number processing if requested
      // FYI, this is no NaN-safe
      output = +input1 + +input2;
    } else {
      output = input1.toString() + input2.toString();
    }

    return output;

    // the following is good to ensure the type of output is consistent with requested
    // but maybe be better to elevate to before processing to ensure value is in keeping i.e. doing number addition in place of string concatanation
    // if (resultType === "number") {
    //   return +output;
    // } else {
    //   return output.toString();
    // }
  }

  // The following calls require specification of a paticular string value, so we should use literal values in out function type definition (see above)
  const combinedAgesAsNumber = combineWithOutputConversion(31, 29, "number");
  const combinedAgesAsString = combineWithOutputConversion(31, 29, "string");
  const combinedNamesAsString = combineWithOutputConversion("Bing", "Bong", "string");
  const combinedNaNsasNumber = combineWithOutputConversion("Bing", "Bong", "number");
  console.log({
    combinedAgesAsNumber,
    combinedAgesAsString,
    combinedNamesAsString,
    combinedNaNsasNumber,
  });
}

export function doLiteralTypesWithAlias() {
  function combineWithOutputConversion(
    input1: Combinal,
    input2: Combinal,
    resultType: CombinationResultType
  ) {
    let output;
    if ((typeof input1 === "number" && typeof input2 === "number") || resultType === "number") {
      output = +input1 + +input2;
    } else {
      output = input1.toString() + input2.toString();
    }

    return output;
  }

  const combinedAgesAsNumber = combineWithOutputConversion(31, 29, "number");
  const combinedAgesAsString = combineWithOutputConversion(31, 29, "string");
  const combinedNamesAsString = combineWithOutputConversion("Bing", "Bong", "string");
  const combinedNaNsasNumber = combineWithOutputConversion("Bing", "Bong", "number");
  console.log({
    combinedAgesAsNumber,
    combinedAgesAsString,
    combinedNamesAsString,
    combinedNaNsasNumber,
  });
}

doUnionTypes();
doLiteralTypes();
doLiteralTypesWithAlias();
