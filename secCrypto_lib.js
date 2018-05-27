'strict mode'
const crypto = require('crypto')
const eccrypto = require('eccrypto')



/**
 * using EC crypto generate privat key and public key
 * testing sign and verify
 */


/**
 * A new random 32-byte private key.
 */
class secCrypto {
    constructor() {
        this.privateKey = ''
        this.publicKey = ''
        this.testPrivateKey = ''
        this.testPublicKey = ''
        this.msg = ''
        this.generateCryptoPrivKey()
    }
    generateCryptoPrivKey() {
        this.privateKey = crypto.randomBytes(32)
        this.testPrivateKey = this.privateKey.toString('base64', 0, 32)
        this.generateCryptoPubKey()
    }

    generateCryptoPubKey() {
        /**
         * Corresponding uncompressed (65-byte) public key.
         */

        this.publicKey = eccrypto.getPublic(this.privateKey)
        this.testPublicKey = this.publicKey.toString('base64', 0, 32)
    }


    secSign(privateKey, str, callback) {

        this.msg = crypto.createHash('sha256').update(str).digest()

        eccrypto.sign(privateKey, this.msg).then(function (sig) {


            let secSign = sig
            callback(secSign)


        })

    }

    secVerify(publicKey, sig) {
        eccrypto.verify(publicKey, this.msg, sig).then(function () {

            console.log('Signature is OK')

        }).catch(function () {

            console.log('Signature is BAD')

        })
    }
    secEncrypt(publicKey, cryptoMsg, callback) {

        eccrypto.encrypt(publicKey, Buffer(cryptoMsg)).then(function (encrypted) {


            let secCipher = encrypted
            // console.log('cipher to part user (string)', testCryptoMsg)
            /**
             * user decrypting the message with privat key.
             */
            callback(secCipher)

        })
    }
    secDecrypt(privateKey, encrypted, callback) {
        eccrypto.decrypt(privateKey, encrypted).then(function (plaintext) {

            let secPlaintext = plaintext

            callback(secPlaintext)
        })
    }

    getCryptoPrivKey() {
        return this.privateKey
    }

    getCryptoPubKey() {
        return this.publicKey
    }

}

module.exports = secCrypto