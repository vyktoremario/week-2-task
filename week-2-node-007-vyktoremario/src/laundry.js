/**
 * Laundry Problem
 * Question 2
 *
 * @returns {any} Trip data analysis
 */
function getMaxPairs(noOfWashes, cleanPile, dirtyPile) {
  //set count to show number of pairs
  let count = 0;

  //set an array that holds the unpaired socks and sort the cleanpile
  let unPairedSock = [];
  cleanPile.sort((a, b) => a - b);

  //Loop through the cleanpile and check for pair socks, increase count if found and move unpaired to the created array above
  for (let i = 0; i < cleanPile.length; i++) {
    if (unPairedSock.length == 0) {
      unPairedSock.push(cleanPile[i]);
    } else if (unPairedSock.length > 0) {
      if (unPairedSock[unPairedSock.length - 1] === cleanPile[i]) {
        unPairedSock.pop();
        count++;
      } else {
        unPairedSock.push(cleanPile[i]);
      }
    }
  }

  //if unpairedsock is not nil, loop through it to check if a pair can be found in dirtypile, if noOfwashes is less than 0.
  if (unPairedSock.length !== 0) {
    for (let i = 0; i < unPairedSock.length; i++) {
      if (noOfWashes > 0) {
        if (dirtyPile.includes(unPairedSock[i])) {
          let index = dirtyPile.findIndex((value) => value === unPairedSock[i]);
          count++;
          noOfWashes--;
          dirtyPile.splice(index, 1);
        }
      }
    }
  }

  //if no of washes is up to 2, check dirtypile and wash pairs of socks if found, based on the number of washes.
  dirtyPile.sort((a, b) => a - b);
  let holder = [];
  for (let i = 0; i < dirtyPile.length; i++) {
    if (noOfWashes >= 2) {
      if (holder.length == 0) {
        holder.push(dirtyPile[i]);
      } else if (noOfWashes > 0) {
        if (holder[holder.length - 1] === dirtyPile[i]) {
          holder.pop();
          count++;
          noOfWashes -= 2;
        } else {
          holder.push(dirtyPile[i]);
        }
      }
    }
  }
  return count;
}

module.exports = getMaxPairs;
