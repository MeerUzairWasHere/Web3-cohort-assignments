// function bytesToAscii(byteArray) {
//   return byteArray.map((byte) => String.fromCharCode(byte)).join("");
// }

// // Example usage:
// const bytes = [109, 101, 101, 114]; // Corresponds to "meer"
// const asciiString = bytesToAscii(bytes);
// console.log(asciiString); // Output: "meer"

function bytesToAscii(byteArray) {
  return new TextDecoder().decode(byteArray);
}

// Example usage:
const bytes = new Uint8Array([
  109, 101, 101, 114, 117, 122, 97, 105, 114, 119, 97, 115, 104, 101, 114, 101,
]); // Corresponds to "meeruzairwashere"
const asciiString = bytesToAscii(bytes);
console.log(asciiString); // Output: "meeruzairwashere"
