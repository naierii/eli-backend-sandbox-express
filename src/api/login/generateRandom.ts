const myCrypto = require('crypto');

const randomString = myCrypto.randomBytes(64).toString('hex');

console.log(randomString);