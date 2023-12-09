let nums = [2, 1];
let n = nums.length + 1;
for (let i = 1; i <= nums.length+1; i++){
    let found = false;
    for (let j = 0; j < nums.length; j++){
        if (nums[j] === i) {
            found = true;
            break;
        }
    }
    if (!found) {
        console.log(i);
    }
}
console.log(-1)