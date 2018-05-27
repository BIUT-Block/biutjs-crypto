var crypto = require("crypto");
var eccrypto = require("eccrypto");

// A new random 32-byte private key.
var privateKey = crypto.randomBytes(32);
// Corresponding uncompressed (65-byte) public key.
var publicKey = eccrypto.getPublic(privateKey);

var str = "message to sign";
// Always hash you message to sign!
var msg = crypto.createHash("sha256").update(str).digest();

eccrypto.sign(privateKey, msg).then(function (sig) {
    console.log("Signature in DER format:", sig);
    eccrypto.verify(publicKey, msg, sig).then(function () {
        console.log("Signature is OK");
    }).catch(function () {
        console.log("Signature is BAD");
    });
});





var privateKeyA = crypto.randomBytes(32)
var publicKeyA = eccrypto.getPublic(privateKeyA)
var privateKeyB = crypto.randomBytes(32)
var publicKeyB = eccrypto.getPublic(privateKeyB)
 
// Encrypting the message for B.
eccrypto.encrypt(publicKeyB, Buffer("msg to b")).then(function(encrypted) {
  // B decrypting the message.
  eccrypto.decrypt(privateKeyB, encrypted).then(function(plaintext) {
    console.log("Message to part B:", plaintext.toString());
  });
});
 
// Encrypting the message for A.
eccrypto.encrypt(publicKeyA, Buffer("msg to a")).then(function(encrypted) {
  // A decrypting the message.
  eccrypto.decrypt(privateKeyA, encrypted).then(function(plaintext) {
    console.log("Message to part A:", plaintext.toString());
  });
});