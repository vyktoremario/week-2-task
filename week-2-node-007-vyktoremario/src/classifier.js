/**
 * This is the entry point to the program
 * Question 1 - Classifier
 *
 * @param {any} input Array of student objects
 */

function classifier(input) {
  //Get a deep copy of the array
  let newArr = JSON.parse(JSON.stringify(input));

  //Get the age of each student and create a new property to save it
  for (let i = 0; i < newArr.length; i++) {
    let date = new Date().getFullYear() - new Date(newArr[i].dob).getFullYear();
    newArr[i].age = date;
  }

  //return the no of groups to be zero if the input array is empty
  if (newArr.length === 0) {
    return { noOfGroups: 0 };
  }

  //Sort the copied array by age
  newArr.sort((a, b) => {
    return a.age - b.age;
  });

  //Create two arrays; one to hold the objects that meets certain criteria and the other to hold the group of arrays
  let output = [];
  let members = [];

  //Push the first element into the array
  members.push(newArr[0]);

  //Check for conditions and push into array if met, else reset the array and push
  for (let i = 1; i < newArr.length; i++) {
    if (newArr[i].age - members[0].age <= 5 && members.length <= 2) {
      members.push(newArr[i]);
    } else {
      output.push(members);
      members = [];
      members.push(newArr[i]);
    }
  }

  //If the members array is still holding a value, it should push to the output array
  if (members !== null) {
    output.push(members);
  }

  //Create an object that will hold the values to be returned
  let studentsOutput = {
    noOfGroups: output.length,
  };

  //Write a loop that while going through the array, it sets the values to be returned
  for (let i = 0; i < output.length; i++) {
    let total = 0;
    let reg = [];
    for (let j = 0; j < output[i].length; j++) {
      total += output[i][j].age;
      reg.push(Number(output[i][j].regNo));
    }

    reg.sort((a, b) => a - b);
    let group = `group${i + 1}`;

    //Create a template of what it should return
    studentsOutput[group] = {
      members: [],
      oldest: output[i][output[i].length - 1].age,
      sum: total,
      regNos: reg,
    };
    //Loop through and push the following values as groups
    for (let j = 0; j < output[i].length; j++) {
      studentsOutput[group].members.push({
        name: output[i][j].name,
        age: output[i][j].age,
        dob: output[i][j].dob,
        regNo: output[i][j].regNo,
      });
    }
  }
  return studentsOutput;
}
module.exports = classifier;
