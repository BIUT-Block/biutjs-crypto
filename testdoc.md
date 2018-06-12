<a name="secCrypto"></a>

## secCrypto
using EC crypto generate privat key and public key
it also can be used for user authentication
class secCrypto could encrypt and decrypt message

**Kind**: global class  

* [secCrypto](#secCrypto)
    * [.generateCryptoPrivKey()](#secCrypto+generateCryptoPrivKey)
    * [.generateCryptoPubKey()](#secCrypto+generateCryptoPubKey)
    * [.secSign(privateKey, str, callback)](#secCrypto+secSign)
    * [.secVerify(publicKey, sig)](#secCrypto+secVerify)
    * [.secEncrypt(publicKey, cryptoMsg, callback)](#secCrypto+secEncrypt)
    * [.secDecrypt(privateKey, encrypted, callback)](#secCrypto+secDecrypt)
    * [.getCryptoPrivKey()](#secCrypto+getCryptoPrivKey)
    * [.getCryptoPubKey()](#secCrypto+getCryptoPubKey)

**Example**
```js
const secCrypto = require('../secCrypto_lib')


let TestSecCrypto = new SecCrypto()
```
<a name="secCrypto+generateCryptoPrivKey"></a>

### secCrypto.generateCryptoPrivKey()
**Kind**: instance method of [<code>secCrypto</code>](#secCrypto)  
**Example**
```js
let privateKey = TestSecCrypto.getCryptoPrivKey()
```
<a name="secCrypto+generateCryptoPubKey"></a>


### secCrypto.generateCryptoPubKey()
Corresponding uncompressed (65-byte) public key.

**Kind**: instance method of [<code>secCrypto</code>](#secCrypto)  
```js
let publicKey = TestSecCrypt.getCryptoPubKey()
```
<a name="secCrypto+secSign"></a>

### secCrypto.secSign(privateKey, str, callback)
**Kind**: instance method of [<code>secCrypto</code>](#secCrypto)  

| Param | Type | Description |
| --- | --- | --- |
| privateKey | <code>Buffer</code> | using private key signature message |
| str | <code>string</code> | input private key and message by string |
| callback | <code>Buffer</code> | message will be translated and saved in buffer |

<a name="secCrypto+secVerify"></a>

### secCrypto.secVerify(publicKey, sig)
sig is from secSign() cipher
verify user privat key and identity

**Kind**: instance method of [<code>secCrypto</code>](#secCrypto)  

| Param | Type | Description |
| --- | --- | --- |
| publicKey | <code>Buffer</code> | input public key and using public key decryption signature |
| sig | <code>Buffer</code> | decrypt signature and verify identify |
**Example**
```js
TestSecCrypto.secSign(privateKey,str,(sig)=>{
    console.log('Signature in DER format:', sig)

    TestSecCrypto.secVerify(publicKey,sig)

})
```
<a name="secCrypto+secEncrypt"></a>

### secCrypto.secEncrypt(publicKey, cryptoMsg, callback)
user decrypting the message with privat key.

**Kind**: instance method of [<code>secCrypto</code>](#secCrypto)  

| Param | Type | Description |
| --- | --- | --- |
| publicKey | <code>Buffer</code> | input public key and use public key encrypt message |
| cryptoMsg | <code>string</code> | input message |
| callback | <code>Buffer</code> | callback cipher |

<a name="secCrypto+secDecrypt"></a>

### secCrypto.secDecrypt(privateKey, encrypted, callback)
using private key decrypt cipher

**Kind**: instance method of [<code>secCrypto</code>](#secCrypto)  

| Param | Type | Description |
| --- | --- | --- |
| privateKey | <code>Buffer</code> | input private key and use private key decrypt cipher |
| encrypted | <code>Buffer</code> | input cipher |
| callback | <code>string</code> | callback plaintext |
**Example**
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
<a name="secCrypto+getCryptoPrivKey"></a>

### secCrypto.getCryptoPrivKey()
return private key

**Kind**: instance method of [<code>secCrypto</code>](#secCrypto)  
<a name="secCrypto+getCryptoPubKey"></a>

### secCrypto.getCryptoPubKey()
return public key

**Kind**: instance method of [<code>secCrypto</code>](#secCrypto)  
