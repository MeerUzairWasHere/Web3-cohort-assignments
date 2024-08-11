function hexToArray(hexString) {
  const byteArray = new Uint8Array(hexString.length / 2);
  for (let i = 0; i < byteArray.length; i++) {
    byteArray[i] = parseInt(hexString.substr(i * 2, 2), 16);
  }
  return byteArray;
}

// Example usage:
const hex = "6d656572757a61697277617368657265";
const byteArrayFromHex = hexToArray(hex);
console.log(byteArrayFromHex);
// Output:
//   [
//     109, 101, 101, 114, 117,
//     122,  97, 105, 114, 119,
//      97, 115, 104, 101, 114,
//     101
//   ]
