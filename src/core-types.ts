export function doCoreTypes() {
  // const varName: {} = ...... is an ts idiom for inferring js object type
  // the types of the properties can be defined in the assignment
  // the inferrence is not translated to js. exists purely in ts files for development
  // const person: {
  //   name: string;
  //   age: number;
  //   hobbies: string[];
  //   role: [number, string]; // This infers a Tuple. A set of number and string value pairs.
  // } = {

  enum Role {
    ADMIN, // These can be assigned to specific values too i.e. ADMIN = 0 or ADMIN = "ADMIN"
    //   ADMIN = 5, // Assignemnt can start increment from specific part i.e. READ_ONLY = 6, AUTHOR = 7
    READ_ONLY,
    //   READ_ONLY = "noob",    // Very useful if enum values are used for calculations/data generation. All enum members must be assigned a value if one is.
    AUTHOR,
  }

  const person = {
    name: "Tom",
    age: 31,
    hobbies: ["doing", "stuff"],
    //   role: "ROLETYPE1", // This is dangerous because implementation could mis-represent the value and generate errors
    role: Role.ADMIN, // This is better because we can control value and reproduce in implementation (see below)
    //   role: [2, "author"],
  };

  console.log(person);

  // Arrays
  // let favouriteActivities: any[]; // This allows any type to be included in list. although this might not fit with ts XD
  // let favouriteActivities: string[]; // This allows any type to be included in list. although this might not fit with ts XD

  // favouriteActivities = ["stuff"];

  // for (const hobby of person.hobbies) {
  //   console.log(hobby.toUpperCase()); // Because ts knows that the hobbies property is a string[], it knows hobby is a string and therefore is happy to provide string method hints
  //   //   console.log(hobby.map());      // In counter, it knows hobby is not an array, so gets angry at trying to call map
  // }

  // Tuples

  // person.role = ["thing", "thung"];    // The Tuple definition prevents assignment of incorrect types to specified positions in tuple
  // person.role = [2, 4];
  // person.role = []                     // Tuple exists the number values specified
  // person.role.push("fart"); // However, ts does not currently support preventing addition of further values to tuples

  if (person.role === Role.ADMIN) {
    // Can check against enum definition to ensure we are comparing appropriate value
    console.log("I AM ADMIN!!!!!", person.role.toString());
  } else {
    console.log("I AM LOWLY NOOB!", person.role.toString());
  }
}
