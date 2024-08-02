const crypto = require("crypto");

console.log(getMe4zero());

function getMe4zero() {
  for (let i = 500000; i < 600000; i++) {
    const hash = crypto.createHash("sha256").update(i.toString()).digest("hex");
    console.log(hash)
    if (hash.startsWith("0000")) {
        return { input: i, hash: hash };
    }
  }
}
