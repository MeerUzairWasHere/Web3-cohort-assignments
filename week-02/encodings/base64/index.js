const uint8Array = new Uint8Array([
  109, 101, 101, 114, 117, 122, 97, 105, 114, 119, 97, 115, 104, 101, 114, 101,
]);
const base64Encoded = Buffer.from(uint8Array).toString("base64");
console.log(base64Encoded);
