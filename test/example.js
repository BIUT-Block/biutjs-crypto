const SecCrypto = require('../src/index')

let TestSecCrypto = new SecCrypto()

console.log(`generate Private Key: ${TestSecCrypto.getCryptoPrivKey()}`)
console.log(`generate Public Key: ${TestSecCrypto.getCryptoPubKey()}`)
console.log('#####################################################################################################')

let privateKey = TestSecCrypto.getCryptoPrivKey()
let publicKey = TestSecCrypto.getCryptoPubKey()

let strPrivKey = privateKey.toString('base64', 0, 32)
let strPubKey = publicKey.toString('base64', 0, 32)

console.log('generate Private Key:', strPrivKey)
console.log('generate Public Key:', strPubKey)
console.log('#####################################################################################################')

let str = 'message to sign'
/**
 *Always hash you message to sign!
 */
TestSecCrypto.secSign(privateKey, str, (sig) => {
  console.log('Signature in DER format:', sig)

  TestSecCrypto.secVerify(publicKey, sig)

  console.log('#####################################################################################################')
})

let text = 'Hello World'

TestSecCrypto.secEncrypt(publicKey, text, (cipher) => {
  console.log('cipher:', cipher)

  TestSecCrypto.secDecrypt(privateKey, cipher, (plaintext) => {
    console.log('Plaintext:', plaintext)

    let strPlaintext = plaintext.toString()
    console.log('Plaintext to String:', strPlaintext)
  })
})
