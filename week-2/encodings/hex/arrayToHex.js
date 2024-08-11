function arrayToHex(byteArray) {
  let hexString = "";
  for (let i = 0; i < byteArray.length; i++) {
    hexString += byteArray[i].toString(16).padStart(2, "0");
  }
  return hexString;
}

// Example usage:
const byteArray = new Uint8Array([
  109, 101, 101, 114, 117, 122, 97, 105, 114, 119, 97, 115, 104, 101, 114, 101,
]); // Corresponds to "meeruzairwashere"
const hexString = arrayToHex(byteArray);
console.log(hexString); // Output: "6d656572757a61697277617368657265"
