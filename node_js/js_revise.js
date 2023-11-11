//PRODUCT OF TWO:
let productOfTwo = (a, b) => {
    return a * b;
}


//STUDENT OBJECT:
let student = {
    name:"sree",
    age: 24,
    branch: "civil engineering",
    greet() {
        console.log("hello sir, I am "+this.name+" from "+this.branch+"department.")
    }
}

student.greet();