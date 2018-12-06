const ECIES = require('./bitcore-ecies/ecies')
const sha3S256 = require('js-sha3').sha3_256

const OccUtil = require('@sec-block/secjs-util')
const randombytes = require('randombytes')
const secp256k1 = require('secp256k1')
const bitcore = require('bitcore-lib')

const _decryptWithPrivateKeyEciesMap = new Map()
const _encryptWithPublicKeyEciesCache = new Map()
// this key is used as false sample, because bitcore would crash when alice has no privateKey
const _encryptWithPublicKeyDefaultKey = new bitcore.PrivateKey('52435b1ff21b894da15d87399011841d5edec2de4552fdc29c8299574436925d')

class SecKey {
  constructor () { }
  _ensureBuffer (bufferOrString) {
    // make sure its a buffers
    if (typeof bufferOrString === 'string')
      return Buffer.from(bufferOrString, 'hex')
    else
      return bufferOrString
  }
  _formatAddress (addr) {
    // if (addr.substr(0, 2) == '0x' && format == 'raw') {
    //   addr = addr.substr(2);
    // }
    const format = 'hex'
    if (addr.substr(0, 2) !== '0x' && format === 'hex')
      addr = '0x' + addr

    return addr
  }
  createPrivateKey () {
    let privateKey = Buffer.from(randombytes(32), 'hex').toString('hex')
    return privateKey
  }

  publicKeyFromPrivateKey (privateKey) {
    let publicKey = secp256k1.publicKeyCreate(this._ensureBuffer(privateKey)).toString('hex')
    return publicKey
  }

  publicKeyToAddress (publicKey) {
    publicKey = secp256k1.publicKeyConvert(this._ensureBuffer(publicKey), false).slice(1)
    return this._formatAddress(OccUtil.publicToAddress(publicKey).toString('hex'))
  }

  hash (message) {
    return sha3S256(message)
  }

  signHash (privateKey, hash) {
    let sigObj = secp256k1.sign(
      this._ensureBuffer(hash),
      this._ensureBuffer(privateKey)
    )
    return sigObj.signature.toString('hex')
  }

  verifyHashSignature (publicKey, hash, signature) {
    return secp256k1.verify(
      this._ensureBuffer(hash),
      this._ensureBuffer(signature),
      this._ensureBuffer(publicKey)
    )
  }
  encryptWithPublicKey (publicKey, message) {
    if (!_encryptWithPublicKeyEciesCache.has(publicKey)) {
      let alice = ECIES()
        .privateKey(_encryptWithPublicKeyDefaultKey)
        .publicKey(new bitcore.PublicKey(publicKey))
      _encryptWithPublicKeyEciesCache.set(
        publicKey,
        alice
      )
    }
    let alice = _encryptWithPublicKeyEciesCache.get(publicKey)
    let encrypted = alice.encrypt(message)
    let ret = encrypted.toString('hex')
    return ret
  }
  decryptWithPrivateKey (privateKey, encrypted) {
    // caching
    if (!_decryptWithPrivateKeyEciesMap.has(privateKey)) {
      let privKey = new bitcore.PrivateKey(privateKey)
      let alice = ECIES().privateKey(privKey)
      _decryptWithPrivateKeyEciesMap.set(privateKey, alice)
    }

    let alice = _decryptWithPrivateKeyEciesMap.get(privateKey)
    let decryptMe = Buffer.from(encrypted, 'hex')
    let decrypted = alice.decrypt(decryptMe)
    let ret = decrypted.toString()
    return ret
  }
}
let _secKey = new SecKey()
module.exports = _secKey
