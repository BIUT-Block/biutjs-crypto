<a name = "SecCrypto"></a>

* * *
## SecCrypto
**kind**: global calss

*[SecCrpto](#SecCrpto)
    *[new SecCrypto](#SecCrypto)
    *[.getCryptoPrivKey()] ⇒ <code>Array.&lt;Buffer&gt;</code> or <code>String</code>
    *[.getCryptoPubKey()] ⇒ <code>Array.&lt;Buffer&gt;</code> or <code>String</code>
    *[.secSign(privateKey, str, callback)] ⇒ <code>Array.&lt;Buffer&gt;</code>
    *[.secVerify(publicKey, sig)] ⇒ <code>Array.&lt;Buffer&gt;</code>
    *[.secEncrypt(publicKey,cryptoMsg, callback)]  ⇒ <code>Array.&lt;Buffer&gt;</code>
    *[.secDecrypt(privateKey, encrypted, callback)]  ⇒ <code>Array.&lt;String&gt;</code>

* * *
## Motivation

SecCrypto is used for SEC Blockchain. It could crypt, decrypt, signature and verify information and users identify. There is some support from npm 'eccrypto'.

#Implementation details

With the help of browserify `SecCrypto` provides different implementations for Browser and Node.js with the same API. Because WebCryptoAPI defines asynchronous promise-driven API, implementation for Node needs to use promises too.

* Use Node.js crypto module/library bindings where possible
* Use WebCryptoAPI where possible
* Promise-driven API
* Only secp256k1 curve, only SHA-512 (KDF), HMAC-SHA-256 (HMAC) and AES-256-CBC for ECIES

### Example
```js
const secCrypto = require('../secCrypto_lib')


let TestSecCrypto = new secCrypto()
```
### Generate Privat Key
```js

let privateKey = TestSecCrypto.getCryptoPrivKey()
```
### Generate Public Key
```js
let publicKey = TestSecCrypt.getCryptoPubKey()
```
### Verify Sign
```js
TestSecCrypto.secSign(privateKey,str,(sig)=>{
    console.log('Signature in DER format:', sig)

    TestSecCrypto.secVerify(publicKey,sig)

})
```
### Crypt Message
```js
let text = 'Hello World'
TestSecCrypto.secEncrypt(publicKey,text,(cipher)=>{

    console.log('cipher:',cipher)

    TestSecCrypto.secDecrypt(privateKey,cipher,(plaintext)=>{
        console.log('Plaintext:', plaintext)

        let strPlaintext = plaintext.toString()
        console.log('Plaintext to String:', strPlaintext)
    })
    
})
```
