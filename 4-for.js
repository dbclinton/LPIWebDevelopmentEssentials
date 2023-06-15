// Example of a for loop
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    break; // Exit the loop when i is 3
  }
  console.log("For loop: " + i);
}

// Example of a while loop
let j = 1;
while (j <= 5) {
  if (j === 2) {
    j++;
    continue; // Skip the rest of the loop body when j is 2
  }
  console.log("While loop: " + j);
  j++;
}
