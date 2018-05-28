'strict mode'
const crypto = require('crypto')
const eccrypto = require('eccrypto')



/**
 * using EC crypto generate privat key and public key
 * it also can be used for user authentication
 * class secCrypto could encrypt and decrypt message
 */



class secCrypto {
    constructor() {
        this.privateKey = ''
        this.publicKey = ''
        this.strPrivateKey = ''
        this.strPublicKey = ''
        this.msg = ''
        this.generateCryptoPrivKey()
    }


    /**
     * A new random 32-byte private key.
     */

    generateCryptoPrivKey() {

        this.privateKey = crypto.randomBytes(32)
        this.strPrivateKey = this.privateKey.toString('base64', 0, 32)
        this.generateCryptoPubKey()
    }

    /**
     * Corresponding uncompressed (65-byte) public key.
     */

    generateCryptoPubKey() {

        this.publicKey = eccrypto.getPublic(this.privateKey)
        this.strPublicKey = this.publicKey.toString('base64', 0, 65)
    }

    /**
     * using private key signature message
     * input private key and message by string
     * message will be translated and saved in buffer
     */

    secSign(privateKey, str, callback) {

        this.msg = crypto.createHash('sha256').update(str).digest()

        eccrypto.sign(privateKey, this.msg).then(function (sig) {


            let secSign = sig
            callback(secSign)


        })
    }

    /**
     * using public key decryption
     * @param {*} publicKey inputed as buffer else as string
     * @param {*} sig is from secSign() cipher
     * verify user privat key and identity
     */

    secVerify(publicKey, sig) {
        eccrypto.verify(publicKey, this.msg, sig).then(function () {

            console.log('Signature is OK')

        }).catch(function () {

            console.log('Signature is BAD')

        })
    }

    /**
     * user decrypting the message with privat key.
     */

    secEncrypt(publicKey, cryptoMsg, callback) {

        eccrypto.encrypt(publicKey, Buffer(cryptoMsg)).then(function (encrypted) {


            let secCipher = encrypted


            callback(secCipher)

        })
    }

    /**
     * using private key decrypt cipher
     * @param {Buffer} privateKey 
     * @param {Buffer} encrypted 
     * @param {string} callback 
     */
    
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