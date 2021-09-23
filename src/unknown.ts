// UNKNOWN
let userInputUnknown: unknown; // Different from any
let userInputAny: any;
let userInputUnspecified;

let userName = "Tom";

// Any of these types can be assigned any value
userInputUnknown = 5;
userInputUnknown = "Tom";

userInputAny = 5;
userInputAny = "Tom";

userInputUnspecified = 5;
userInputUnspecified = "Tom";

// but unknown types can not be assigned to typed variables
userName = userInputAny;
// userName = userInputUnknown;
userName = userInputUnspecified;

// type checking however can allow it
if (typeof userInputUnknown === "string") {
  userName = userInputUnknown;
}

// NEVER
// This function never produces a value!
// Without specifying, type is inferred as void but this may make it clearer to callers the intention of this function
function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code };
}

// functions on infinite loops are also good candidates for never return
function doAThingForever(): never {
  while (true) {}
}

generateError("An error occurred!", 500);
