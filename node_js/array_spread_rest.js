// class Student {
//   constructor(name, age, marks) {
//     this.name = name;
//     this.age = age;
//     this.marks = marks;
//     }
//     setPlacementAge(minPlacementAge) {
//         console.log(this);
//         return (minMarks) => {//changing the funciton to an arrow function changes the scope of "this" to the lexical scope instead of looking at the local object in which th efunction is being called
//         //perfect alternate of the fat arrow function is to use "bind"
//             console.log("inside eligibleForCurrentCompany", this)
//       if (this.marks > minMarks && this.age > minPlacementAge) {
//         console.log(this.name + " is ready for placements.");
//       } else {
//         console.log(this.name + " is not eligible for placements.");
//       }
//     };
//   }
// }

// const Yash = new Student("yash", 25, 75);
// const Vaibhav = new Student("vaibhav", 23, 35);

// //Yash.setPlacementAge(18).eligibleforCurrentCompany(40);
// Yash.setPlacementAge(18)(40);

const asycFunction = async () => {
  console.log("a");
  console.log("b");
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log("c");
  await new Promise((resolve) => setTimeout(resolve, 0));
  console.log("d");
  console.log("e");
};
asycFunction();
