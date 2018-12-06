const occKey = require('../src/index')

// let privateKey2 = '2400238629a674a372694567f949c94847b76607de151433587c20547aa90460'

// console.log(privateKey2)

for (let i = 1; i < 10; i++) {
  let privateKey = occKey.createPrivateKey()
  let publicKey = occKey.publicKeyFromPrivateKey(privateKey)
  let address = occKey.publicKeyToAddress(publicKey)

  console.log('pirv key:', privateKey)
  console.log('pub key:', publicKey)
  console.log('address:', address)

  const hash = occKey.hash('foobar')
  console.log(hash)
  const signature = occKey.signHash(
    privateKey, // privateKey
    hash // hash
  )
  console.log('signature:', signature)
  // '40f50efc7aee9d414b5621a5818a6cc8f89bc000087d6a41ed9cc66b605365295279d3bbd7710f9fc4c4d73c39f74a0e5c116168e69d1341c3a5467142f3e63a'
  const valid = occKey.verifyHashSignature(
    publicKey, // publicKey
    hash, // hash
    signature // signature
  )
  console.log('valid:', valid)

  const encrypted = occKey.encryptWithPublicKey(
    publicKey, // publicKey
    'foobar' // data
  )
  console.log('encrypted:', encrypted)

  const message = occKey.decryptWithPrivateKey(
    privateKey, // privateKey
    encrypted // encrypted-data
  )
  // 'foobar'

  console.log('message:', message)
}
